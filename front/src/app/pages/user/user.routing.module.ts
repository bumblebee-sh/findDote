import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent, ProfileComponent, AnimalsComponent} from './components';

const routes: Routes = [
  {path: '', component: UserComponent, children: [
      { path: '', component: ProfileComponent},
      { path: 'animals', component: AnimalsComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
