import { Component,Output, EventEmitter, OnInit } from '@angular/core';
import { SuperPower } from '../../../Classes/superpower';
import { HeroService } from '../../../Services/hero.service';

@Component({
  selector: 'app-superpower',
  templateUrl: './superpower.component.html',
  styleUrls: ['./superpower.component.css']
  
})
export class SuperpowerComponent implements OnInit {

  superpowers: SuperPower[];

  selectedPower: SuperPower;
  
  @Output() selectedPowerOutput = new EventEmitter<SuperPower>();
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getPowers();
  }
  getPowers(): void {
    this.heroService.getSuperpowers()
        .subscribe(superpowers => this.superpowers = superpowers);
        
  }

  onSelect(superpower: SuperPower): void {
    this.selectedPower = superpower;
    this.selectedPowerOutput.emit(this.selectedPower);
    
    this.heroService.setSelectedSuperPower(this.selectedPower);
    
}

  

}
