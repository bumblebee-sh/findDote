import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AnimalComponent} from './components';

const routes: Routes = [
  {path: '', component: AnimalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AnimalRoutingModule { }
