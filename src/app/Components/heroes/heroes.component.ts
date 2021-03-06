import { Component,Output, EventEmitter, OnInit } from '@angular/core';
import { Hero } from '../../Classes/hero';
import { HeroService } from '../../Services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  selectedHero: Hero;

  @Output() selectedHeroOutput = new EventEmitter<Hero>();
  show:boolean=true;

  onSelect(hero: Hero): void {
      this.selectedHero = hero;
      
    this.selectedHeroOutput.emit(this.selectedHero);
    this.heroService.setSelectedHero(this.selectedHero);
  }


  constructor(private heroService: HeroService) { }

  ngOnInit() {
    
  }
  getHeroes(){
    
    this.heroService.heroesJSON();
  }



        

}

