import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-general-task',
  templateUrl: './general-task.component.html',
  styleUrls: ['./general-task.component.css']
})
export class GeneralTaskComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  private updateTodoSub: Subscription;
  private deleteTodoSub: Subscription;
  private editTodoSub: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onCheckboxChange(isDone: boolean) {
    this.updateTodoSub = this.todoService.updateTodoDone(this.task.id, isDone).subscribe(() => {
      this.todoService.todoListChange.next();
    });
  }
  
  onEditClicked(title: string) {
    this.editTodoSub = this.todoService.editTodo(this.task.id, title).subscribe(() => {
      this.todoService.todoListChange.next();
    });
  }
  
  onDeleteClicked() {
    this.deleteTodoSub = this.todoService.deleteTodo(this.task.id).subscribe(() => {
      this.todoService.todoListChange.next();
    });
  }

  ngOnDestroy(): void {
    if (this.updateTodoSub) this.updateTodoSub.unsubscribe();
    if (this.deleteTodoSub) this.deleteTodoSub.unsubscribe();
    if (this.editTodoSub) this.editTodoSub.unsubscribe();
  }
}
