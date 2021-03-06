import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Todo } from '../classes/todo';
import { Book } from '../classes/book';
import { environment } from '../../../environments/environment';

@Injectable()
export class TodoService {
  private options = new RequestOptions({ withCredentials: true });
  private url: string = `${environment.apiBaseUrl}/todo`;
  private testUrl: string = 'http://localhost:8081/listBooks';

  constructor(private http: Http) { }

  save(item: string): Observable<Todo> {
    return this.http.post(this.url, new Todo(item), this.options)
    .map((res: Response) => {
        return <Todo>res.json();
    })
    .catch(error => {
        console.log('save error', error)
        var todoArray : Todo[] = Todo[0];
        return todoArray;
    });
  }

  getAll(): Observable<Array<Todo>>{
    let url =  this.url;
    return this.http.get(url, this.options)
    .map((res: Response) => {
        return <Array<Todo>>res.json();
    })
    .catch(error => {
        console.log('get error', error);
        return error;
    });
  }

  getStuff(): Observable<Array<Book>>{
    let url = this.testUrl;

    return this.http.get(url, this.options)
    .map((res: Response) => {
        return <Array<Book>>res.json();
    })
    .catch(error => {
        console.log("error", error);
        return error;
    });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    let url = `${this.url}/${todo.id}`;
    return this.http.put(url, todo, this.options)
    .map((res: Response) => <Todo>res.json())
    .catch(error => {
        console.log('update error', error);
        var todoArray : Todo[] = Todo[0];
        return todoArray;
    });
  }

  deleteTodo(todo: Todo): Observable<Response> {
    let url = `${this.url}/${todo.id}`;
    return this.http.delete(url, this.options)
    .catch(error => {
        console.log('delete error', error);
        return error;
    });
  }
}
