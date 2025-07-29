import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favoritebooks } from './favoritebooks';

describe('Favoritebooks', () => {
  let component: Favoritebooks;
  let fixture: ComponentFixture<Favoritebooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favoritebooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Favoritebooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
