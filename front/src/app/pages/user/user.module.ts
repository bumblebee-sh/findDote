import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UserComponent, AnimalsComponent} from './components';
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
    AnimalsComponent
  ],
  providers: [
    UserService,
    AnimalService
  ]
})
export class UserModule { }
