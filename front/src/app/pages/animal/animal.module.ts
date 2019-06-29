import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '@app/shared/shared.module';
import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalComponent } from './components';
const COMPONENTS = [AnimalComponent];

@NgModule({
  imports: [
    CommonModule,
    AnimalRoutingModule,
    SharedModule
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class AnimalModule { }
