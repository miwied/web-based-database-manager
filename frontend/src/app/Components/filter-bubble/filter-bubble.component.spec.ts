import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBubbleComponent } from './filter-bubble.component';

describe('FilterBubbleComponent', () => {
  let component: FilterBubbleComponent;
  let fixture: ComponentFixture<FilterBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterBubbleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
