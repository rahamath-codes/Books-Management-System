import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managebooks } from './managebooks';

describe('Managebooks', () => {
  let component: Managebooks;
  let fixture: ComponentFixture<Managebooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managebooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managebooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
