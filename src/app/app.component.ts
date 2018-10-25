import { Component } from '@angular/core';
import { Hero } from './Classes/hero';
import { Pet } from './Classes/pet';
import { SuperPower } from './Classes/superpower';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'herowatch';
  hero = '';
  pet = '';
  superpower = '';


  heroEvent(hero: Hero){
    this.hero=hero.name;
  }

  petEvent(pet: Pet){
    this.pet=pet.name;
  }

  powerEvent(superpower: SuperPower){
    this.superpower=superpower.name;
  }


}
