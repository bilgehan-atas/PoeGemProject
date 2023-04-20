import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLeagueComponent } from './select-league.component';

describe('SelectLeagueComponent', () => {
  let component: SelectLeagueComponent;
  let fixture: ComponentFixture<SelectLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLeagueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
