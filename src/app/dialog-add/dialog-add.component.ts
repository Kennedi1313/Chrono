import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface task {
  day: string,
  name: string
}

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})
export class DialogAddComponent implements OnInit {

  name: string = '';
  tasks: task[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { day: string } ) {

    }

  ngOnInit(): void {
  }

  getTasks(): task[] {
    return localStorage['tasks'] ? JSON.parse(localStorage['tasks']) : [];
  }

  save() {
    this.tasks = this.getTasks();
    this.tasks.push({day: this.data.day, name: this.name});
    localStorage['tasks'] = JSON.stringify(this.tasks);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
