import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './Components/heroes/heroes.component';
import { PetsComponent } from './Components/pets/pets.component';
import { AssignComponent } from './Components/assign/assign.component';

import { SuperpowerModule } from './Modules/superpower/superpower.module';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    PetsComponent,
    AssignComponent
  ],
  imports: [
    BrowserModule,
    SuperpowerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
