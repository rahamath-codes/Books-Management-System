import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Borrowedbooks } from './borrowedbooks';

describe('Borrowedbooks', () => {
  let component: Borrowedbooks;
  let fixture: ComponentFixture<Borrowedbooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Borrowedbooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Borrowedbooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
