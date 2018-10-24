import { Component,Output, EventEmitter, OnInit } from '@angular/core';
import { HeroService } from '../../Services/hero.service';
import { Hero } from '../../Classes/hero';
import { Pet } from '../../Classes/pet';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets: Pet[];

  selectedPet: Pet;
  constructor(private heroService: HeroService) { }
  @Output() selectedPetOutput = new EventEmitter<Pet>();
  ngOnInit() {
    this.getPets();
  }
  getPets(): void {
    this.heroService.getPets()
        .subscribe(pets => this.pets = pets);
        
  }


  
  onSelect(pet: Pet): void {
    this.selectedPet = pet;
    this.selectedPetOutput.emit(this.selectedPet);
    
    this.heroService.setSelectedPet(this.selectedPet);
  }
}
