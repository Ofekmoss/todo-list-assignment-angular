import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as TodoConstants from "../shared/todo.constants"
import { catchError, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Task } from '../shared/task.model';

interface getTodosResponse {
  id: string,
  title: string,
  status: string,
  done: boolean
}

interface NewTodoResponse {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoListChange = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  public getTodoList() {
    return this.http.get<getTodosResponse[]>(`${TodoConstants.DOMAIN}/todos`)
    .pipe(map(responseData => {
      let tasks = [...responseData].map(task => {
        return new Task(
          task.id,
          task.title,
          task.status,
          task.done
        );
      })
      return tasks;
    }), catchError(error => {
      throw error;
    }));
  }

  public addNewTodo(title: string) {
    return this.http
      .post<NewTodoResponse>(
        `${TodoConstants.DOMAIN}/todos`,
        {title}
        ).pipe(map(
          (responseData) => {
            return responseData.id;
          },
          catchError((error) => {
            console.log(error)
            throw error;
          })
        )
      );
  }

  public updateTodoDone(taskId: string, isDone: boolean) {
    return this.http
      .put<NewTodoResponse>(
        `${TodoConstants.DOMAIN}/todos/${taskId}`,
        {
          done: isDone
        }
      );
  };

  public editTodo(taskId: string, title: string) {
    return this.http
      .put<NewTodoResponse>(
        `${TodoConstants.DOMAIN}/todos/${taskId}`,
        {
          title
        }
      );
  };

  public deleteTodo(taskId: string) {
    return this.http
      .delete<NewTodoResponse>(
        `${TodoConstants.DOMAIN}/todos/${taskId}`
      );
  }
}
