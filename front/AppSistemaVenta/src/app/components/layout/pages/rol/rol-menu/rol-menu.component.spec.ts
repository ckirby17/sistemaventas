import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolMenuComponent } from './rol-menu.component';

describe('RolMenuComponent', () => {
  let component: RolMenuComponent;
  let fixture: ComponentFixture<RolMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolMenuComponent]
    });
    fixture = TestBed.createComponent(RolMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
