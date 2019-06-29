import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  resetForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email]
    ]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  resetPassword() {
    console.log();
  }
}
