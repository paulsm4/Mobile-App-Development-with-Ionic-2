import { Component, OnInit } from '@angular/core';
import { Task } from './../task';

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
    // First-cut: hard-code initial data.  Later, we'll substitute a Firebase query
    this.tasks = [
      {title: 'Milk', status: 'open'},
      {title: 'Eggs', status: 'open'},
      {title: 'Syrup', status: 'open'},
      {title: 'Pancake Mix', status: 'open'}
    ];
  }

  addTask() {
    const theNewTask: string = prompt('New Task');
    if (theNewTask !== '') {
      this.tasks.push({ title: theNewTask, status: 'open' });
    }
  }

}
