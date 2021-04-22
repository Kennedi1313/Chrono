import { DialogAddComponent } from './dialog-add/dialog-add.component';
import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


interface task {
  day: string,
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges{
  mobileQuery: MediaQueryList;
  media: MediaMatcher ;

  taskList: task[] = [];
  tabs: {name: string, cod: string}[] = [
    { name: 'Segunda', cod: 'seg' },
    { name: 'Terça', cod: 'ter'},
    { name: 'Quarta', cod: 'qua' },
    { name: 'Quinta', cod: 'qui' },
    { name: 'Sexta', cod: 'sex'}
  ];

  constructor(public dialog: MatDialog, media: MediaMatcher) {
    this.media = media;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.taskList = this.getTasks();
  }

  getTasks(): task[] {
    return localStorage['tasks'] ? JSON.parse(localStorage['tasks']) : [];
  }

  ngOnChanges() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  openDialog(cod: string): void {

    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '250px',
      data: { day: cod }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskList = this.getTasks();
    });
  }

  title = 'Chrono';
}
