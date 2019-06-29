import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import {MatDialog, MatDialogRef} from '@angular/material';

import { Store } from '@ngrx/store';
import * as AuthActions from '@app/core/auth/store/auth.actions';
import {IAppState} from '@app/store/app.reducer';
import {AuthService} from '@app/shared/services';

type Modals = 'SignUp' | 'ForgotPass';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  err: string;
  signInForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email]
    ],
    password: [
      '',
      [Validators.required]
    ]
  });

  ngOnInit() {
    this.store.select('UserStore').subscribe(res => {
      this.err = null;
      if (res.error) {
        this.err = res.error;
      }
      if (res.isAuth) {
        this.dialogRef.close();
      }
    });
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private store: Store<IAppState>,
    private dialogRef: MatDialogRef<SignInComponent>,
  ) { }

  singIn() {
    this.err = null;
    this.store.dispatch(new AuthActions.LoginStart(this.signInForm.value));
    // this.authService.login(this.signInForm.value).subscribe((res: any) => {
    //   this.store.dispatch(new AuthActions.LogIn( ));
    //   this.dialogRef.close();
    //   this.router.navigateByUrl('/user');
    // }, ({error}) => {
    //   this.err = error.message;
    // });
  }

  showPop(type: Modals) {
    let modal;
    switch (type) {
      case 'SignUp':
        modal = SignUpComponent;
        break;
      case 'ForgotPass':
        modal = ForgotPasswordComponent;
        break;
      default:
        return;
    }
    this.dialog.open(modal);
    this.dialogRef.close();
  }
}
