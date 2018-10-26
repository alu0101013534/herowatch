import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Hero } from '../Classes/hero';
import { Pet } from '../Classes/pet';
import { SuperPower } from '../Classes/superpower';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { TryCatchStmt } from '@angular/compiler';
//import { data_json } from '../../assets/json/hero.json';

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

  
  HEROES: Hero[];
  PETS: Pet[];
  SUPERPOWERS: SuperPower[];


// getters and setters
  getHeroes(): Observable<Hero[]> {
    return of(this.HEROES);
  }
  getPets(): Observable<Pet[]> {
    return of(this.PETS);
  }
  getSuperpowers(): Observable<SuperPower[]> {
    return  of(this.SUPERPOWERS);
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
      for(i=0;i<this.HEROES.length;i++){
        if( this.HEROES[i].superpower!=null && this.HEROES[i].superpower.id==powId){
            
          this.HEROES[i].superpower=null;
        }
      }
    for(i=0;i<this.PETS.length;i++){
      if(this.PETS[i].superpower!=null && this.PETS[i].superpower.id==powId){
          
        this.PETS[i].superpower=null;
      }
    }

  
}
//directly removes superpowers from selected hero/pet
removePower(){
  if((this.selectedHero!=null || this.selectedPet!=null)&& this.selectedSuperPower!=null ){
    
    this.searchAndRemovePower(this.selectedSuperPower.id);
  
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
    for(i=0;i<this.HEROES.length;i++){
      posH[i]=i;
      posP[i]=i;
    }
    console.log(posH);
    var aux;
    j=0;
    do{
      for(i=0;i<this.HEROES.length;i++){
        randomN=Math.floor(Math.random() * this.HEROES.length);     // returns a random integer from 0 to 9
        aux= posH[randomN];
        posH[randomN]= posH[i];
        posH[i]=aux;

        randomN=Math.floor(Math.random() * this.PETS.length);     // returns a random integer from 0 to 9
        aux= posP[randomN];
        posP[randomN]= posP[i];
        posP[i]=aux;
      }
    j++;
  }
  while(j<times);
    console.log("Random Positions Heroes:",posH);
    
    
    console.log("Random Positions Pets:",posH);
  
    for(i=0;i<this.HEROES.length;i++){
      this.HEROES[posH[i]].pet=this.PETS[posP[i]];
      this.PETS[posP[i]].hero=this.HEROES[posH[i]];
    
    }
    
    j=0;
    for(i=0;i<this.SUPERPOWERS.length;i++){
      if(i>=this.HEROES.length)
      { 
      this.PETS[j].superpower=this.SUPERPOWERS[i];
      this.SUPERPOWERS[i].assigned=true;
      j++;
      }
      else {
      this.HEROES[i].superpower=this.SUPERPOWERS[i];
      
      this.SUPERPOWERS[i].assigned=true;
      }
    }

  }
  constructor( private http : HttpClient) { 
    this.load();
  
  }


load(){
  this.powersJSON();
  this.heroesJSON();
  this.petsJSON();
}
  deleteAll(){
    var i;
    for(i=0;i<this.HEROES.length;i++){
      this.HEROES[i].pet=null;
      this.PETS[i].hero=null;
      
      this.HEROES[i].superpower.assigned=false;
      this.PETS[i].superpower.assigned=false;
      this.HEROES[i].superpower=null;
      this.PETS[i].superpower=null;
    
    }
    

  }


  deletePetPartner(){
    var i;
    
    if(this.selectedPet.hero!=null){
    for(i=0;i<this.HEROES.length;i++){
      if( this.HEROES[i].id==this.selectedPet.hero.id){
          
        this.HEROES[i].pet=null;
      }
    }
  }
    if(this.selectedHero.pet!=null){
    for(i=0;i<this.PETS.length;i++){
      if( this.PETS[i].id==this.selectedHero.pet.id){
          
        this.PETS[i].hero=null;
      }
    }
  }

  }

  getPet(id){
    var i;
    for(i=0;i<this.PETS.length;i++){
      if(this.PETS[i].id==parseInt(id)){
        return this.PETS[i];
      }
    
    }

  }
  getHero(id){
    var i;
    for(i=0;i<this.HEROES.length;i++){
      if(this.HEROES[i].id==parseInt(id)){
        return this.HEROES[i];
      }
    
    }

  }

  
  getThisHero(id): Observable<Hero> {
    return of(this.HEROES.find(hero => hero.id === id))
  }

  
  getThisPet(id): Observable<Pet> {
    return of(this.PETS.find(pet => pet.id === id))
  }

  getHeroFromPet(pet){
    var i;
    if(pet.hero!=null){
    for(i=0;i<this.HEROES.length;i++){
      if((this.HEROES[i].pet!=null) && (this.HEROES[i].pet.id==pet.id)){
        return this.HEROES[i];
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





 
 public heroesJSON(): string{

  let that = this;
  var str="";
      console.log(str);
  that.http.get("../../assets/json/heroes.json").subscribe(data => {
      //that.parametros =  data;
      
      str=JSON.stringify(data);

      str=str.slice(10, str.length-1);
      that.HEROES=JSON.parse(str);

    return str;
  }),
  error => console.log("Error: ", error)
  return str;
  }  



public petsJSON(): string{

    let that = this;
    var str="";
        console.log(str);
    that.http.get("../../assets/json/pets.json").subscribe(data => {
        //that.parametros =  data;
        
        str=JSON.stringify(data);
  
        str=str.slice(8, str.length-1);
  
        that.PETS=JSON.parse(str);
      return str;
    }),
    error => console.log("Error: ", error)
    return str;
    }  

 public powersJSON(): string{

      let that = this;
      var str="";
          console.log(str);
      that.http.get("../../assets/json/superpowers.json").subscribe(data => {
          //that.parametros =  data;
          
          str=JSON.stringify(data);
    
          str=str.slice(15, str.length-1);
          that.SUPERPOWERS=JSON.parse(str);
          
        return str;
      }),
      error => console.log("Error: ", error)
      return str;
      }  
}
