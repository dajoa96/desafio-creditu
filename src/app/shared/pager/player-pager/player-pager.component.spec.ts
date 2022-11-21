import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPagerComponent } from './player-pager.component';

describe('PlayerPagerComponent', () => {
  let component: PlayerPagerComponent;
  let fixture: ComponentFixture<PlayerPagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
