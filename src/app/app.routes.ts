import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { AuthGuard } from './auth/auth-guard.service';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  {path: 'medicamentos', component: FormComponent, canActivate: [AuthGuard] },
  {path: 'medicamentos/novo', component: FormComponent, canActivate: [AuthGuard] },
  {path: 'medicamentos/editar/:id', component: FormComponent, canActivate: [AuthGuard] },
  // {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
