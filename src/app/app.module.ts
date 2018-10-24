import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './Components/heroes/heroes.component';
import { PetsComponent } from './Components/pets/pets.component';
import { AssignComponent } from './Components/assign/assign.component';

import { SuperpowerModule } from './Modules/superpower/superpower.module';

import { AppRoutingModule } from './app-routing.module';

import { AlertModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    PetsComponent,
    AssignComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    SuperpowerModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
