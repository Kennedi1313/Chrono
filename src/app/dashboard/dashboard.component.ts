import { TasksService } from './../tasks.service';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Task from '../models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ TasksService ]
})
export class DashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  media: MediaMatcher ;
  name: string = '';

  taskList: Task[] = [];
  tabs: {name: string, cod: string}[] = [
    { name: 'Domingo', cod: 'dom' },
    { name: 'Segunda', cod: 'seg' },
    { name: 'Terça', cod: 'ter' },
    { name: 'Quarta', cod: 'qua' },
    { name: 'Quinta', cod: 'qui' },
    { name: 'Sexta', cod: 'sex' },
    { name: 'Sábado', cod: 'sab' }
  ];

  constructor(
    public dialog: MatDialog,
    media: MediaMatcher,
    router: ActivatedRoute,
    private tasksService: TasksService) {
    this.media = media;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.name = router.snapshot.params.name;
  }

  getTasks(): Task[] {
    return localStorage['tasks'] ? JSON.parse(localStorage['tasks']) : [];
  }

  ngOnInit(){
    this.tasksService.getTasks(this.name).then((res: Task[]) => {
      localStorage['tasks'] = JSON.stringify(res);
      this.taskList = this.getTasks();
    });
  }

  ngOnChanges() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  check(task: Task) {
    this.taskList.map(t => {
      if(t.day === task.day || t.name === task.name){
        t.done = !t.done

      }
      return t
    });
    localStorage['tasks'] = JSON.stringify(this.taskList);
    this.tasksService.setTasks(JSON.parse(localStorage['tasks']));
  }

  openDialog(cod: string): void {

    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '250px',
      data: { groupName: this.name, day: cod }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskList = this.getTasks();
    });
  }

  delete(task: Task) {
    this.taskList = this.taskList.filter(t => (t.day !== task.day || t.name !== task.name))
    localStorage['tasks'] = JSON.stringify(this.taskList);
    this.tasksService.setTasks(localStorage['tasks']);
  }

}
