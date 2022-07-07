import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInputDialogComponent } from './member-input-dialog.component';

describe('MemberInputDialogComponent', () => {
  let component: MemberInputDialogComponent;
  let fixture: ComponentFixture<MemberInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberInputDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
