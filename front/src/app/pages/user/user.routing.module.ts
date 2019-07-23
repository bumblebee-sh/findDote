import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent, AnimalsComponent} from './components';

const routes: Routes = [
  {path: '', component: UserComponent, children: [
      { path: '', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
      { path: 'animal', component: AnimalsComponent},
      { path: 'animals', loadChildren: () => import('./pages/animals/animals.module').then(m => m.AnimalsModule)}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
