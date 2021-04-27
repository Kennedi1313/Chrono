import { DialogAddComponent } from './dialog-add/dialog-add.component';
import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnChanges, SimpleChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){}
  title = 'Chrono';
}
