import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsclubtableComponent } from './sportsclubtable.component';

describe('SportsclubtableComponent', () => {
  let component: SportsclubtableComponent;
  let fixture: ComponentFixture<SportsclubtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsclubtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsclubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
