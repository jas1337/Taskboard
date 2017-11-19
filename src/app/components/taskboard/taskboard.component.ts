import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../shared/services/users.service';
import { TasksService } from '../../shared/services/tasks.service';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.css']
})
export class TaskboardComponent implements OnInit {

  users: any;
  taskPool: any;
  userOrder = [2, 1, 3];

  currentTask: any;
  currentUser: any;

  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,

  ) { }

  ngOnInit() {
    this.tasksService.getTasks().subscribe(tasks => this.taskPool = tasks,
      err => {
        console.log(err);
        return false;
      });
    this.usersService.getUsers().subscribe(users => this.users = users,
      err => {
        console.log(err);
        return false;
      });
  }

  onDragFromPool(task) {
    this.currentTask = task;
    this.currentUser = undefined;
  }
  onDragFromUser(user, task) {
    this.currentUser = user;
    this.currentTask = task;
  }

  onDropToPool() {
    let alredyExist = this.taskPool.some(x =>
      x._id === this.currentTask._id
    );
    //drag task from user to taskboard
    if (!alredyExist) {
      //delete task from user
      this.usersService.deleteUserTask(this.currentUser, this.currentTask).subscribe(data => data,
        err => {
          console.log(err);
          return false;
        });
      //add task to taskPool
      this.taskPool.push(this.currentTask)
      this.tasksService.addTask(this.currentTask).subscribe(data => data,
        err => {
          console.log(err);
          return false;
        });
    }
  }

  onDropToUser(user) {
    let index = this.taskPool.indexOf(this.currentTask, 0);
    let alredyExist = user.userTasks.some(x =>
      x._id === this.currentTask._id
    );
    //drag from taskpool to user
    if (!alredyExist && this.currentUser == undefined) {
      //add user task
      this.usersService.addUserTask(user, this.currentTask).subscribe(data => data,
        err => {
          console.log(err);
          return false;
        });
      //delete task from taskboard
      this.taskPool.splice(index, 1)
      this.tasksService.deleteTask(this.currentTask).subscribe(data => data,
        err => {
          console.log(err);
          return false;
        });
    }

    //drag from one user to another user
    else if (!alredyExist && this.currentUser !== undefined && user !== this.currentUser) {
    
      //remove this.currentTask from all users
      for (let i = 0; i < this.users.length; i++) {
        //check if user owns this.currentTask
        if (
          this.users[i].userTasks.some(x =>
            x._id === this.currentTask._id &&
            x.details === this.currentTask.details
          )
        ) {
          this.usersService.deleteUserTask(this.users[i], this.currentTask).subscribe(data => data,
            err => {
              console.log(err);
              return false;
            });
        }
      }
      //add this.currentTask to pointed user
      this.usersService.addUserTask(user, this.currentTask).subscribe(data => data,
        err => {
          console.log(err);
          return false;
        });
    }
  }

  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

}
