import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DebugElement } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


import { TaskboardComponent } from './taskboard.component';

import { TasksService } from '../../shared/services/tasks.service';
import { UsersService } from '../../shared/services/users.service';

describe('TaskboardComponent', () => {
  let component: TaskboardComponent;
  let fixture: ComponentFixture<TaskboardComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let tasksService: TasksService;
  let userssService: UsersService;
  let spy: any;

  const MOCK_TASKS: any[] = [
    { _id: 11, details: 'Test-task1' },
    { _id: 12, details: 'Test-task2' },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [TaskboardComponent],
      providers: [TasksService, UsersService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskboardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;

    tasksService = TestBed.get(TasksService);
    fixture.detectChanges();
  });


  it('should call tasksService.getTasks() on ngOnInit() and set tasks', () => {
    spyOn(tasksService, 'getTasks').and.returnValue(Observable.of(MOCK_TASKS))
    component.ngOnInit();
    expect(tasksService.getTasks).toHaveBeenCalled();
    expect(component.taskPool).toBe(MOCK_TASKS);
  });

});
