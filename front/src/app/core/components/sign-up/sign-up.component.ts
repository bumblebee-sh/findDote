import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {MatDialog} from '@angular/material';

import {AuthService, ActionStatusService} from '@app/shared/services';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  err: string;
  signUpForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email]
    ],
    password: [
      '',
      [Validators.required]
    ],
    repassword: [
      '',
      [Validators.required, this.comparePassword()]
    ]
  });
  /*signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',
      [Validators.required]),
    repassword: new FormControl(
      '',
      [Validators.required, this.forbiddenNameValidator(/bob/i)]
    )
  });*/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private actionStatusService: ActionStatusService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  singUp() {
    this.err = null;
    const data: any = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };

    this.authService.registration(data).subscribe(res => {
      this.matDialog.closeAll();
      this.actionStatusService.succes('Please check your email.');
    }, ({error}) => {
      this.err = error.message;
    });
  }

  comparePassword(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return  control.root.value && (control.root.value.password !== control.value) ? {compare: true} : null;
    };
  }

  get confirmPassword() {
    return this.signUpForm.controls['repassword'];
  }
}
