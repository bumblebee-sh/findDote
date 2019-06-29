import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UserComponent, ProfileComponent, AnimalsComponent} from './components';
import {UserService, AnimalService} from './services';
import {UserRoutingModule} from './user.routing.module';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    AnimalsComponent
  ],
  providers: [
    UserService,
    AnimalService
  ]
})
export class UserModule { }
