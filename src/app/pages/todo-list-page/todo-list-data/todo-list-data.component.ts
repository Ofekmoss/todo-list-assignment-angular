import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';
import { Socket } from 'socket.io-client';
import * as TodoConstants from "src/app/shared/todo.constants"

@Component({
  selector: 'app-todo-list-data',
  templateUrl: './todo-list-data.component.html',
  styleUrls: ['./todo-list-data.component.css']
})
export class TodoListDataComponent implements OnInit, OnDestroy {
  private todoSub: Subscription;
  private socket: Socket;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.socket = this.todoService.socket;
    this.socket.on(TodoConstants.TODO_CHANGE_EVENT, () => {
      this.todoService.todoListChange.next();
    })
  }

  onTodoAdded(inputValue: string) {
    this.todoSub = this.todoService.addNewTodo(inputValue).subscribe((id) => {
      this.todoService.todoListChange.next();
      this.todoService.sendTodoChangeInSocket();
    });
  }

  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
  }
}
