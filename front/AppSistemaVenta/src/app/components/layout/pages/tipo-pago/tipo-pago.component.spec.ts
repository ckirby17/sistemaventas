import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPagoComponent } from './tipo-pago.component';

describe('TipoPagoComponent', () => {
  let component: TipoPagoComponent;
  let fixture: ComponentFixture<TipoPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoPagoComponent]
    });
    fixture = TestBed.createComponent(TipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
