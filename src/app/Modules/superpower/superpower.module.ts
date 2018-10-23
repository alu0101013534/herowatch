import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperpowerComponent } from './superpower/superpower.component';

@NgModule({
  imports: [
    CommonModule
  ],exports: [
    SuperpowerComponent
  ],
  
  declarations: [SuperpowerComponent]
})
export class SuperpowerModule { }
