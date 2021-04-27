import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Task from './models/task.model';

@Injectable()
export class TasksService {

  URL_API: string = 'https://task-api-backend.herokuapp.com/tasks'

  constructor(private http: HttpClient) { }

  public getTasks(name: string): Promise<Task[]> {
    return this.http.get<Task[]>(this.URL_API + '?name=' + name)
    .toPromise();
  }

  public setTasks(tasks: Task[]): void {

    let taskAux: Task[] = new Array<Task>();

    tasks.forEach((task) => {
      taskAux.push( {
        groupName: task.groupName,
        name: task.name,
        day: task.day,
        done: task.done
      })
    })

    console.log(taskAux)

    this.http.post<any>(this.URL_API ,
      taskAux
    ).subscribe(
      data => console.log(data),
      err => console.error(err, taskAux),
      () => console.log("terminou")
    );
  }
}
