import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NoContentComponent } from './no-content/no-content.component';
import { SharedModule } from './shared/shared-module';

import { LoginComponent } from './users/login/login.comp';
import { RegisterComponent } from './users/register/register.comp';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NoContentComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    HttpModule,
    FormsModule,
    CommonModule,
    SharedModule,
  ],

  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }
