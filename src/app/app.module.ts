import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule, routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from './templates/app-header/app-header.module';
import { AppFooterModule } from './templates/app-footer/app-footer.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from './templates/app-header/app-header.component';
import { AppFooterComponent } from './templates/app-footer/app-footer.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppHeaderComponent, AppFooterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AppHeaderModule,
    AppFooterModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class AppModule { }
