import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaTablaComponent } from './venta-tabla.component';

describe('VentaTablaComponent', () => {
  let component: VentaTablaComponent;
  let fixture: ComponentFixture<VentaTablaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaTablaComponent]
    });
    fixture = TestBed.createComponent(VentaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
