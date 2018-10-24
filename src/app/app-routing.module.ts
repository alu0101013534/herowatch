import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './Components/heroes/heroes.component';
import { PetsComponent }      from './Components/pets/pets.component';
import { HeropetComponent }      from './Components/heropet/heropet.component';
import { AssignComponent }  from './Components/assign/assign.component';
import { HeroDetailComponent }  from './Components/hero-detail/hero-detail.component';
import { PetDetailComponent }  from './Components/pet-detail/pet-detail.component';
const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'assign', component: AssignComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'petdetail/:id', component: PetDetailComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'partners', component: HeropetComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule {}

