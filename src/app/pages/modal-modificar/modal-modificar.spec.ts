import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificar } from './modal-modificar';

describe('ModalModificar', () => {
  let component: ModalModificar;
  let fixture: ComponentFixture<ModalModificar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalModificar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalModificar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
