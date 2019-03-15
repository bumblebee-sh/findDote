import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthInterceptor} from '@app/core/auth/auth.interceptot';
import {SharedModule} from '@app/shared/shared.module';

import {
  HeaderComponent,
  FooterComponent,
  HomeComponent,
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  PetListComponent,
  FilterComponent
} from './components';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  HomeComponent,
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  PetListComponent,
  FilterComponent
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    HttpClientModule,
    ...COMPONENTS
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  entryComponents: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ]
})
export class CoreModule { }
