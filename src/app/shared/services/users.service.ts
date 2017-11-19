import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  //Add task to user.tasks 
  addUserTask(user: any, task: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    user.userTasks.push(task);
    return this.http.put('http://localhost:3000/users/updateTasks/' + user._id, user, { headers: headers })
      .map(res => res.json());
  }

  //Remove task from user.tasks 
  deleteUserTask(user: any, task: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let index = user.userTasks.indexOf(task, 0);
    user.userTasks.splice(index, 1);
    return this.http.put('http://localhost:3000/users/updateTasks/' + user._id, user, { headers: headers })
      .map(res => res.json());

  }

  getUsers(): Observable<Array<any>> {
    return this.http.get('http://localhost:3000/users/getUsers')
      .map(res => res.json());
  }




}
