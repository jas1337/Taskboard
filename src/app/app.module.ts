import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';


import { UsersService } from './shared/services/users.service';
import { TasksService } from './shared/services/tasks.service';
import { TaskboardComponent } from './components/taskboard/taskboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [UsersService, TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
