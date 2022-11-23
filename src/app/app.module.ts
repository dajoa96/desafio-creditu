import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NotifierModule.withConfig({
      position: {
        vertical: {
          position: 'top'
        },
        horizontal: {
          position: 'right'
        }
      }
    })
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    HttpClient,
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
