import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsClubTableComponent } from './sports-club-table.component';

describe('SportsClubTableComponent', () => {
  let component: SportsClubTableComponent;
  let fixture: ComponentFixture<SportsClubTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportsClubTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsClubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
