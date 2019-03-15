import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './core/components';
import {AuthGuardService} from './core/auth/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', loadChildren: './pages/user/user.module#UserModule', canActivate: [AuthGuardService]},
  {path: '404', loadChildren: './pages/not-found/not-found.module#NotFoundModule'},
  {path: '**', pathMatch: 'full', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
