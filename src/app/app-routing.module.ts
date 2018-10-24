import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './Components/heroes/heroes.component';
import { PetsComponent }      from './Components/pets/pets.component';
import { HeropetComponent }      from './Components/heropet/heropet.component';
import { AssignComponent }  from './Components/assign/assign.component';
const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'assign', component: AssignComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'partners', component: HeropetComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule {}

