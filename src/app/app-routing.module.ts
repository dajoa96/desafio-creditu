import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import("./modules/register/register.module").then(m => m.RegisterModule)
  },
  {
    path: 'users',
    loadChildren: () => import("./modules/users/users.module").then(m => m.UsersModule)
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
