import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './core/components';
import {AuthGuardService} from './core/auth/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', loadChildren: './pages/user/user.module#UserModule', canActivate: [AuthGuardService]},
  {path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: ':id', loadChildren: () => import('./pages/animal/animal.module').then(m => m.AnimalModule)},
  {path: '**', pathMatch: 'full', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
