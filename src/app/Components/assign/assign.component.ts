import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../Services/hero.service';
import { Hero } from '../../Classes/hero';
import { Pet } from '../../Classes/pet';
import { SuperPower } from '../../Classes/superpower';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {

  constructor(private heroService: HeroService) { }
  buttonNames:string [];
  buttonTitles:string [];
  buttonBodies:string [];
  buttonTypes:number [];
  ngOnInit() {
    this.buttonNames=["New Assign All","test2"];
    this.buttonTitles=["Alert","Warning"];
    this.buttonTypes=[0,1,2,3,4,5,6];
    this.buttonBodies=["Are you sure ? Heroes will get new pets parners and everyone will get new non repeatable superpowers","test2"];
  }

  newAssign(): void {
    this.heroService.assignHeroesPets();
}
deleteAll(): void {
  this.heroService.deleteAll();
}
newAssignPower(): void {
  this.heroService.newAssignPower();
}
removePower(): void {
  this.heroService.removePower();
}
assign(): void {
         
  if(this.heroService.selectedPet!=null && this.heroService.selectedHero!=null){

   
  this.heroService.assignPartner();
}
}

removePartner(): void {
  this.heroService.removePartner();
}

}
