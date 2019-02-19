import { Component, OnInit } from '@angular/core';
import { IonItemSliding, Platform } from '@ionic/angular';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dialogs } from '@ionic-native/dialogs/ngx';

import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  // 1) First-cut: Simple array.  Later, we'll substitute Observable<Task[]>
  // tasks: Array<any> = [];
  // 2) Firebase:
  tasks: Observable<Task[]>;
  itemsCollectionRef: AngularFirestoreCollection<Task>;

  constructor(
    // Firebase:
    public firestore: AngularFirestore,
    public dialog: Dialogs,
    private platform: Platform
  ) { }

  ngOnInit() {
    console.log('TaskListPage::ngOnInit()');
    // 1) First-cut: hard-code initial data.  Later, we'll substitute a Firebase query
    // this.tasks = [
    //   {title: 'Milk', status: 'open'},
    //   {title: 'Eggs', status: 'open'},
    //   {title: 'Syrup', status: 'open'},
    //   {title: 'Pancake Mix', status: 'open'}
    // ];
    this.itemsCollectionRef = this.firestore.collection('tasks');
    this.tasks = this.itemsCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addTask() {
    console.log('TaskListPage::addTask()');
    // 1) First-cut/HTML5 dialog:
    // const theNewTask: string = prompt('New Task');
    // if (theNewTask !== '') {
    //   this.tasks.push({ title: theNewTask, status: 'open' });
    // }
    // 2) Firebase/HTML5 dialog:
    // const theNewTask: string = prompt('New Task');
    // if (theNewTask !== '') {
    //    this.itemsCollectionRef.add({ title: theNewTask, status: 'open' });
    // }
    // 3) Firebase/Ionic Native (Cordova) dialog
    //    PROBLEM: This only works on device, else "Error: Uncaught (in promise): cordova_not_available"...
    // this.dialog.prompt('Add a task', 'Ionic2Do', ['Ok', 'Cancel'], '').then(
    //   theResult => {
    //     if ((theResult.buttonIndex === 1) && (theResult.input1 !== '')) {
    //       this.itemsCollectionRef
    //         .add({
    //            title: theResult.input1, status: 'open'
    //        });
    //     }
    //   }
    // );
    // 4) Runtime check: support either HTML5 (if browser) or Cordova (otherwise)
    if (this.platform.is('cordova')) {
      this.dialog.prompt('Add a task', 'Ionic2Do', ['Ok', 'Cancel'], '').then(
        theResult => {
          if ((theResult.buttonIndex === 1) && (theResult.input1 !== '')) {
            this.itemsCollectionRef
              .add({
                 title: theResult.input1, status: 'open'
             });
          }
        }
      );
      } else {
        const theNewTask: string = prompt('New Task');
        if (theNewTask !== '') {
           this.itemsCollectionRef.add({ title: theNewTask, status: 'open' });
        }
      }
  }

  markAsDone(task: Task, slidingItem: IonItemSliding) {
    console.log('TaskListPage::markAsDone()');
    // 1) First-cut:
    // task.status = 'done';
    // 2) Firebase:
    this.itemsCollectionRef
      .doc(task.id)
      .update({
         status: task.status
       });
    slidingItem.close();
  }

  removeTask(task: Task, slidingItem: IonItemSliding) {
    console.log('TaskListPage::removeTask()');
    // 1) First-cut:
    // task.status = 'removed';
    // const index = this.tasks.indexOf(task);
    // if (index > -1) {
    //   this.tasks.splice(index, 1);
    // }
    // 2) Firebase:
    this.itemsCollectionRef.doc(task.id).delete();
    slidingItem.close();
  }

}
