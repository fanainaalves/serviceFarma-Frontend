import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { ListComponent } from './product/list/list.component';
import { FormComponent } from './product/form/form.component';
import { AuthGuard } from './login/login-service/auth-guard.service';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'list', component: ListComponent},
  {path: 'form', component: FormComponent},
  {path: 'form/new', component: FormComponent},
  {path: 'form/edit/:id', component: FormComponent},
  // {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
