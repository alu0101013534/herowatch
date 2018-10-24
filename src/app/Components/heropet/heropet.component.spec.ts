import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeropetComponent } from './heropet.component';

describe('HeropetComponent', () => {
  let component: HeropetComponent;
  let fixture: ComponentFixture<HeropetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeropetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeropetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
