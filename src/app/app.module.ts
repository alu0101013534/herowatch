import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './Components/heroes/heroes.component';
import { PetsComponent } from './Components/pets/pets.component';
import { AssignComponent } from './Components/assign/assign.component';

import { SuperpowerModule } from './Modules/superpower/superpower.module';

import { AppRoutingModule } from './app-routing.module';

import { AlertModule } from 'ngx-bootstrap';
import { HeropetComponent } from './Components/heropet/heropet.component';
import { HeroDetailComponent } from './Components/hero-detail/hero-detail.component';
import { PetDetailComponent } from './Components/pet-detail/pet-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    PetsComponent,
    AssignComponent,
    HeropetComponent,
    HeroDetailComponent,
    PetDetailComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    SuperpowerModule,
    NgbModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
