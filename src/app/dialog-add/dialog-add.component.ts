import { TasksService } from './../tasks.service';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Task from '../models/task.model';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})
export class DialogAddComponent implements OnInit {

  name: string = '';
  tasks: Task[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { groupName: string, day: string } ,
    private tasksService: TasksService) {

    }

  ngOnInit(): void {
  }

  getTasks(): Task[] {
    return localStorage['tasks'] ? JSON.parse(localStorage['tasks']) : [];
  }

  save() {
    this.tasks = this.getTasks();
    this.tasks.push({groupName: this.data.groupName, day: this.data.day, name: this.name, done: false});
    localStorage['tasks'] = JSON.stringify(this.tasks);
    this.tasksService.setTasks(JSON.parse(localStorage['tasks']));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
