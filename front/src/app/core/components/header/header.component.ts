import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import {MatDialog} from '@angular/material';
import {SignInComponent} from '../sign-in/sign-in.component';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {AuthService} from "@app/shared/services";
import {UserModel} from "@app/shared/models";

import {IAppState} from '@app/store/app.reducer';
import * as UserActions from "@app/pages/user/store/user.actions";

enum Modals {
  SingIn,
  SingUp
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // userState: Observable<UserModel>;
  userState: UserModel;
  modals = Modals;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private store: Store<IAppState>,

  ) { }

  ngOnInit() {
    // this.userState = this.store.select('UserStore');
    const token = this.authService.getToken();
    if (token) {
      this.store.dispatch( new UserActions.UserSetToken({token}));
    }

    this.authService.session().subscribe((res: UserModel) => {
      // this.store.dispatch( new UserActions.UserSetToken({token, status: true}));
      this.userState = res;
      this.store.dispatch( new UserActions.UserLogIn({ user: res, token, isAuth: true }));
    });

    this.store.select('UserStore').subscribe(res => {
      if (res) {
        this.userState = res.user;
      }
    });
  }

  logOut() {
    this.authService.logout().subscribe(res => {
      this.router.navigateByUrl('/');
      this.store.dispatch(new UserActions.UserLogOut());
    });
  }

  showPop(type: Modals) {
    let modal;
    switch (type) {
      case Modals.SingIn:
        modal = SignInComponent;
        break;
      case Modals.SingUp:
        modal = SignUpComponent;
        break;
      default:
        return;
    }

    this.dialog.open(modal);
  }
}
