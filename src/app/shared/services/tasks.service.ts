import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TasksService {

  constructor(private http: Http) { }

  addTask(task: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/tasks/addTask', task, { headers: headers })
      .map(res => res.json());
  }

  deleteTask(task: any) {
    let headers = new Headers();
    return this.http.delete('http://localhost:3000/tasks/deleteTask/' + task._id)
      .map(res => res.json());
  }

  getTasks(): Observable<Array<any>> {
    return this.http.get('http://localhost:3000/tasks/getTasks')
      .map(res => res.json());
  }
}
