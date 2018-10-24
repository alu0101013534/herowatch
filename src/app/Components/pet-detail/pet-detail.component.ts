import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../../Classes/pet';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../../Services/hero.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {

  @Input() pet: Pet;
  constructor(  private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

    ngOnInit(): void {
      this.getHero();
    }
    getHero(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.heroService.getThisPet(id)
        .subscribe(pet => this.pet = pet);
    }
    goBack(): void {
      this.location.back();
    }

}
