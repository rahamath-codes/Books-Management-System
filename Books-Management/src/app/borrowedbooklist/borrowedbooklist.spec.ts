import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Borrowedbooklist } from './borrowedbooklist';

describe('Borrowedbooklist', () => {
  let component: Borrowedbooklist;
  let fixture: ComponentFixture<Borrowedbooklist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Borrowedbooklist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Borrowedbooklist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
