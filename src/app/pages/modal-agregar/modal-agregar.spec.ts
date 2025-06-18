import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregar } from './modal-agregar';

describe('ModalAgregar', () => {
  let component: ModalAgregar;
  let fixture: ComponentFixture<ModalAgregar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgregar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
