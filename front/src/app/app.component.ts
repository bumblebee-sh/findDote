import {Component, OnInit} from '@angular/core';

import { Store } from '@ngrx/store';
import * as AuthActions from '@app/core/auth/store/auth.actions';
import {IAppState} from '@app/store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(
    private store: Store<IAppState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
