import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { ListComponent } from './product/list/list.component';
import { FormComponent } from './product/form/form.component';
import { AuthGuard } from './login/login-service/auth-guard.service';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'medicamentos', component: ListComponent},
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
