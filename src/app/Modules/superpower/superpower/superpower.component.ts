import { Component, OnInit } from '@angular/core';
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
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getSuperpowers()
        .subscribe(superpowers => this.superpowers = superpowers);
  }

}
