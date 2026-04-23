import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
        
  ],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: []
})
export class AppModule { }
