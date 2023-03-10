import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { MoyenneComponent } from './moyenne/moyenne.component';
import { SommeComponent } from './somme/somme.component';
import { SommeTabComponent } from './somme-tab/somme-tab.component';
import { MoyenneTabComponent } from './moyenne-tab/moyenne-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MoyenneComponent,
    SommeComponent,
    SommeTabComponent,
    MoyenneTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
