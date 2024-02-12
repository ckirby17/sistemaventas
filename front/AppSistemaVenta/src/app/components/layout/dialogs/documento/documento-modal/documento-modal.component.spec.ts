import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoModalComponent } from './documento-modal.component';

describe('DocumentoModalComponent', () => {
  let component: DocumentoModalComponent;
  let fixture: ComponentFixture<DocumentoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentoModalComponent]
    });
    fixture = TestBed.createComponent(DocumentoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
