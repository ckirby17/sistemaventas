import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDetalleModalComponent } from './venta-detalle-modal.component';

describe('VentaDetalleModalComponent', () => {
  let component: VentaDetalleModalComponent;
  let fixture: ComponentFixture<VentaDetalleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaDetalleModalComponent]
    });
    fixture = TestBed.createComponent(VentaDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
