import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../Services/hero.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }

  newAssign(): void {
    this.heroService.assignHeroesPets();
 }
 deleteAll(): void {
   this.heroService.deleteAll();
}
}
