import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list-data',
  templateUrl: './todo-list-data.component.html',
  styleUrls: ['./todo-list-data.component.css']
})
export class TodoListDataComponent implements OnInit, OnDestroy {
  private todoSub: Subscription;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onTodoAdded(inputValue: string) {
    this.todoSub = this.todoService.addNewTodo(inputValue).subscribe((id) => {
      this.todoService.todoListChange.next();
    });
  }

  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
  }
}
