import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';
import { getMaskerUserName } from './state/user.reducer';
import * as userActions from './state/user.action';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.select(getMaskerUserName).subscribe((maskUserName) => {
      this.maskUserName = maskUserName;
    });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    //this.maskUserName = !this.maskUserName;
    //Dispatch action
    this.store.dispatch(userActions.toggleMaskUserName());
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
