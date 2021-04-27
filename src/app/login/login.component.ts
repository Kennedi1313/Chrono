import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  route: Router

  nameControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(router: Router) {
    this.route = router;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.route.navigate(['/dash', this.nameControl.value]);
  }

}
