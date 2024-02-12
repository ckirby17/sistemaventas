import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuModalComponent } from './sub-menu-modal.component';

describe('SubMenuModalComponent', () => {
  let component: SubMenuModalComponent;
  let fixture: ComponentFixture<SubMenuModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubMenuModalComponent]
    });
    fixture = TestBed.createComponent(SubMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
