import { Injectable } from '@angular/core';
import { Hero } from '../Classes/hero';
import { Pet } from '../Classes/pet';
import { SuperPower } from '../Classes/superpower';
import { HEROES } from '../Mocks/mock-heroes';
import { PETS } from '../Mocks/mock-pets';
import { SUPERPOWERS } from '../Mocks/mock-superpowers';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private messageSource = new BehaviorSubject('1');
  currentMessage = this.messageSource.asObservable();

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
  getPets(): Observable<Pet[]> {
    return of(PETS);
  }
  getSuperpowers(): Observable<SuperPower[]> {
    return  of(SUPERPOWERS);
  }
  assignHeroesPets(){
    var i,j; //i: iterator, j Counter and second iterator
    var times=20; // number of times it shuffles array positions
    var posH=[];  // array with the heroes positions
    var posP=[];  // array with the pets positions
    var randomN; // a random generated number

    //fill 
    for(i=0;i<HEROES.length;i++){
      posH[i]=i;
      posP[i]=i;
    }
    console.log(posH);
    var aux;
    j=0;
    do{
      for(i=0;i<HEROES.length;i++){
        randomN=Math.floor(Math.random() * HEROES.length);     // returns a random integer from 0 to 9
        aux= posH[randomN];
        posH[randomN]= posH[i];
        posH[i]=aux;

        randomN=Math.floor(Math.random() * PETS.length);     // returns a random integer from 0 to 9
        aux= posP[randomN];
        posP[randomN]= posP[i];
        posP[i]=aux;
      }
    j++;
  }
  while(j<times);
    console.log("Random Positions Heroes:",posH);
    
    
    console.log("Random Positions Pets:",posH);
  
    for(i=0;i<HEROES.length;i++){
      HEROES[posH[i]].pet=PETS[posP[i]];
      PETS[posP[i]].hero=HEROES[posH[i]];
    
    }
    
    j=0;
    for(i=0;i<SUPERPOWERS.length;i++){
      if(i>=HEROES.length)
      { 
      PETS[j].superpower=SUPERPOWERS[i];
      SUPERPOWERS[i].assigned=true;
      j++;
      }
      else {
      HEROES[i].superpower=SUPERPOWERS[i];
      
      SUPERPOWERS[i].assigned=true;
      }
    }

  }
  constructor() { 
    this.assignHeroesPets();
  }

  deleteAll(){
    var i;
    for(i=0;i<HEROES.length;i++){
      HEROES[i].pet=null;
      PETS[i].hero=null;
      
      HEROES[i].superpower.assigned=false;
      PETS[i].superpower.assigned=false;
      HEROES[i].superpower=null;
      PETS[i].superpower=null;
    
    }
    

  }


  deletePetPartner(hero){
    var i;
    for(i=0;i<HEROES.length;i++){
      if( HEROES[i].id==hero.id){
          
        HEROES[i].pet=null;
      }
    }
    

  }

  getPet(id){
    var i;
    for(i=0;i<PETS.length;i++){
      if(PETS[i].id==parseInt(id)){
        return PETS[i];
      }
    
    }

  }
  getHero(id){
    var i;
    for(i=0;i<HEROES.length;i++){
      if(HEROES[i].id==parseInt(id)){
        return HEROES[i];
      }
    
    }

  }

  
  getThisHero(id): Observable<Hero> {
    return of(HEROES.find(hero => hero.id === id))
  }

  
  getThisPet(id): Observable<Pet> {
    return of(PETS.find(pet => pet.id === id))
  }

  getHeroFromPet(pet){
    var i;
    if(pet.hero!=null){
    for(i=0;i<HEROES.length;i++){
      if((HEROES[i].pet!=null) && (HEROES[i].pet.id==pet.id)){
        return HEROES[i];
      }
    
    }
  }
    return null;

  }

  assignPartner(hero,pet){
    var h,p;
    h=this.getHero(hero.id);
    p=this.getPet(pet.id);
    h.pet=p;
    p.hero=h;
  }

  changeMessage(message: string) {
    
    this.messageSource.next(message);
  }
}
