import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripleBoton } from './triple-boton';

describe('TripleBoton', () => {
  let component: TripleBoton;
  let fixture: ComponentFixture<TripleBoton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripleBoton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripleBoton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
