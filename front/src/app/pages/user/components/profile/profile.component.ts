import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services';
import { Store } from '@ngrx/store';

import {IAppState} from '@app/store/app.reducer';
import {UserActions} from '../../store/user.actions';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  profileForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email]
    ],
    name: [
      ''
    ]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private userService: UserService,
  ) { }

  ngOnInit() {
    const _s = this.store.select('UserStore').subscribe( data => {
      if(!data.user) {
        return false;
      }
      this.userService.getUser(data.user.id).subscribe(res => {
        this.profileForm.patchValue(res);
      });
    });
    this.subscriptions.push(_s);
  }

  ngOnDestroy() {
    console.warn('DESTOY');
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  send() {
    console.log(this.profileForm.value);
  }
}
