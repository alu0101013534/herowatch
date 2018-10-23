import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperpowerComponent } from './superpower.component';

describe('SuperpowerComponent', () => {
  let component: SuperpowerComponent;
  let fixture: ComponentFixture<SuperpowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperpowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperpowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
