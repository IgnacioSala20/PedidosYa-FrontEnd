import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioContrasenia } from './cambio-contrasenia';

describe('CambioContrasenia', () => {
  let component: CambioContrasenia;
  let fixture: ComponentFixture<CambioContrasenia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioContrasenia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioContrasenia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
