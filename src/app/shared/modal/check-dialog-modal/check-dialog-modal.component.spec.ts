import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDialogModalComponent } from './check-dialog-modal.component';

describe('CheckDialogModalComponent', () => {
  let component: CheckDialogModalComponent;
  let fixture: ComponentFixture<CheckDialogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckDialogModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
