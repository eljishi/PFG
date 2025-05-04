import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleEntrenamientoPage } from './detalle-entrenamiento.page';

describe('DetalleEntrenamientoPage', () => {
  let component: DetalleEntrenamientoPage;
  let fixture: ComponentFixture<DetalleEntrenamientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEntrenamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
