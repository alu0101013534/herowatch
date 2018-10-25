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
import { NgbdModalComponent, NgbdModalContent } from './Components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    PetsComponent,
    AssignComponent,
    HeropetComponent,
    HeroDetailComponent,
    PetDetailComponent,
    NgbdModalComponent,
    NgbdModalComponent, 
    NgbdModalContent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    SuperpowerModule,
    NgbModule,
    AppRoutingModule

  ],
  entryComponents: [NgbdModalContent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
