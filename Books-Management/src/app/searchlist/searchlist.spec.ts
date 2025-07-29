import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchlist } from './searchlist';

describe('Searchlist', () => {
  let component: Searchlist;
  let fixture: ComponentFixture<Searchlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
