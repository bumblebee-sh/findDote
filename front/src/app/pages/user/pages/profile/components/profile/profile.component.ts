import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../services';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {IAppState} from '@app/store/app.reducer';
import * as ProfileActions from '../../store/profile.actions';

enum UserType {
  Private,
  Organization,
  Nursery
}

interface UserTypes {
  type: UserType;
  title: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>() ;

  loader = false;
  userTypes: UserTypes[] = [
    { title: 'Private person', type: UserType.Private},
    { title: 'Organization', type: UserType.Organization},
    { title: 'Nursery', type: UserType.Nursery},
  ];

  profileForm = this.fb.group({
    image: [''],
    description: [''],
    email: [
      '',
      [Validators.required, Validators.email]
    ],
    name: [
      ''
    ],
    type: [
      this.userTypes[0].type
    ]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.store.select('ProfileStore').pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log(data);
      this.profileForm.patchValue(data);
    });
  }

  ngOnDestroy() {
    console.warn('DESTOY');
    this.destroy$.next();
    this.destroy$.complete();
  }

  send() {
    console.log(this.profileForm.value);
  }
}
