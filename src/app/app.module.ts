import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import { TodoListHeadersComponent } from './pages/todo-list-page/todo-list-headers/todo-list-headers.component';
import { TodoListDataComponent } from './pages/todo-list-page/todo-list-data/todo-list-data.component';
import { TasksListComponent } from './pages/todo-list-page/todo-list-data/tasks-list/tasks-list.component';
import { GeneralInputComponent } from './generalComponents/general-input/general-input.component';
import { GeneralTaskComponent } from './generalComponents/general-task/general-task.component';
import { GeneralCheckboxComponent } from './generalComponents/general-checkbox/general-checkbox.component';
import { GeneralButtonComponent } from './generalComponents/general-button/general-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListPageComponent,
    TodoListHeadersComponent,
    TodoListDataComponent,
    TasksListComponent,
    GeneralInputComponent,
    GeneralTaskComponent,
    GeneralCheckboxComponent,
    GeneralButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
