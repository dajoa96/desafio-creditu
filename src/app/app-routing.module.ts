import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
  },
  {
    path: 'search',
    loadChildren: () => import("./modules/search/search.module").then(m => m.SearchModule)
  },
  {
    path: 'about',
    loadChildren: () => import("./modules/about/about.module").then(m => m.AboutModule)
  },
  {
    path: 'login',
    loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'register',
    loadChildren: () => import("./modules/register/register.module").then(m => m.RegisterModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'users',
    loadChildren: () => import("./modules/users/users.module").then(m => m.UsersModule),
    canActivate: [LoginGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
