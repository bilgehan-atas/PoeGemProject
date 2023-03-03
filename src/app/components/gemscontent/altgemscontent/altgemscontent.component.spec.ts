import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltGemscontentComponent } from './altgemscontent.component';

describe('AltGemscontentComponent', () => {
  let component: AltGemscontentComponent;
  let fixture: ComponentFixture<AltGemscontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltGemscontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltGemscontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
