import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  // First-cut: Simple array.  Later, we'll substitute Observable<Task[]>
  tasks: Array<any> = [];

  constructor() { }

  ngOnInit() {
    console.log('TaskListPage::ngOnInit()');
    // First-cut: hard-code initial data.  Later, we'll substitute a Firebase query
    this.tasks = [
      {title: 'Milk', status: 'open'},
      {title: 'Eggs', status: 'open'},
      {title: 'Syrup', status: 'open'},
      {title: 'Pancake Mix', status: 'open'}
    ];
  }

  addTask() {
    console.log('TaskListPage::addTask()');
    const theNewTask: string = prompt('New Task');
    if (theNewTask !== '') {
      this.tasks.push({ title: theNewTask, status: 'open' });
    }
  }

  markAsDone(task: Task, slidingItem: IonItemSliding) {
    console.log('TaskListPage::markAsDone()');
    task.status = 'done';
  }

  removeTask(task: Task, slidingItem: IonItemSliding) {
    console.log('TaskListPage::removeTask()');
    task.status = 'removed';
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

}
