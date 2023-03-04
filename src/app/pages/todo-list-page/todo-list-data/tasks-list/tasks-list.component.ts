import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnDestroy {
  private todoSub: Subscription;
  private todoAddedSub: Subscription;
  tasks: Task[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTasks();
    this.todoService.todoListChange.subscribe(() => {
      this.getTasks();
    })
  }

  private getTasks() {
    this.todoSub = this.todoService.getTodoList().subscribe(tasks => {
      this.tasks = [...tasks];
    })
  }
  
  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
    this.todoAddedSub.unsubscribe();
  }

}
