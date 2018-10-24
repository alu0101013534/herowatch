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

  selectedHero: Hero;
  selectedPet: Pet;
  selectedSuperPower: SuperPower;
  private heroLast:boolean;


// getters and setters
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
  getPets(): Observable<Pet[]> {
    return of(PETS);
  }
  getSuperpowers(): Observable<SuperPower[]> {
    return  of(SUPERPOWERS);
  }

  getSelectedHero(): Observable<Hero> {
    return of(this.selectedHero);
  }
  getSelectedPet(): Observable<Pet> {
    return of(this.selectedPet);
  }
  getSelectedSuperpower(): Observable<SuperPower> {
    return  of(this.selectedSuperPower);
  }

  setSelectedHero(h: Hero){

    this.selectedHero=h;
    this.heroLast =true;
    
    if(this.selectedHero.superpower!=null)
      this.selectedSuperPower=this.selectedHero.superpower;
  }
  setSelectedPet(p: Pet){

    this.selectedPet=p;
    this.heroLast =false;
    if(this.selectedPet.superpower!=null)
      this.selectedSuperPower=this.selectedPet.superpower;
  }
  setSelectedSuperPower(s: SuperPower){
    this.selectedSuperPower=s;
  }
  
//assign a power to a hero or pet  
newAssignPower(){
  if((this.selectedHero!=null || this.selectedPet!=null)&& this.selectedSuperPower!=null ){
    this.searchAndRemovePower(this.selectedSuperPower.id);
    if(this.heroLast){
        //remove previous power if they had one
        if(this.selectedHero.superpower==null){
          this.selectedHero.superpower=this.selectedSuperPower;
          }
          else 
          {
            
            this.selectedHero.superpower.assigned=false;
            this.selectedHero.superpower=this.selectedSuperPower;
          }
      }
      else {
        //remove previous power if they had one
        if(this.selectedPet.superpower==null){
          this.selectedPet.superpower=this.selectedSuperPower;
          }
          else 
          {
            
            this.selectedPet.superpower.assigned=false;
            this.selectedPet.superpower=this.selectedSuperPower;
          }
      }
    this.selectedSuperPower.assigned=true;
  }
}

// superpowers cant be repeated so every time a new assignment is comming we need to remove that power if someone has it 
searchAndRemovePower(powId: number){
var i;
      for(i=0;i<HEROES.length;i++){
        if( HEROES[i].superpower!=null && HEROES[i].superpower.id==powId){
            
          HEROES[i].superpower=null;
        }
      }
    for(i=0;i<PETS.length;i++){
      if(PETS[i].superpower!=null && PETS[i].superpower.id==powId){
          
        PETS[i].superpower=null;
      }
    }

  
}
//directly removes superpowers from selected hero/pet
removePower(){
  if((this.selectedHero!=null || this.selectedPet!=null)&& this.selectedSuperPower!=null ){
    if(this.heroLast){
        this.selectedHero.superpower=null;
      }
      else {
        this.selectedPet.superpower=null;
      }
    this.selectedSuperPower.assigned=false;
  }
}


//directly removes partner from selected hero/pet
removePartner(){
  if((this.selectedHero!=null && this.selectedPet!=null)){
  
        this.selectedHero.pet=null;
    
        this.selectedPet.hero=null;
  }
}

//random assignation partners and powers
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


  deletePetPartner(){
    var i;
    
    if(this.selectedPet.hero!=null){
    for(i=0;i<HEROES.length;i++){
      if( HEROES[i].id==this.selectedPet.hero.id){
          
        HEROES[i].pet=null;
      }
    }
  }
    if(this.selectedHero.pet!=null){
    for(i=0;i<PETS.length;i++){
      if( PETS[i].id==this.selectedHero.pet.id){
          
        PETS[i].hero=null;
      }
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

  assignPartner(){
    this.deletePetPartner();
    this.selectedHero.pet=this.selectedPet;

    
    this.selectedPet.hero=this.selectedHero;
  }

  changeMessage(message: string) {
    
    this.messageSource.next(message);
  }
}
