import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PMultipleComponent } from './p-multiple.component';

describe('PMultipleComponent', () => {
  let component: PMultipleComponent;
  let fixture: ComponentFixture<PMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PMultipleComponent]
    });
    fixture = TestBed.createComponent(PMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
