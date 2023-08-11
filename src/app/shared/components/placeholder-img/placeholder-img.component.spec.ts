import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderImgComponent } from './placeholder-img.component';

describe('PlaceholderImgComponent', () => {
  let component: PlaceholderImgComponent;
  let fixture: ComponentFixture<PlaceholderImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceholderImgComponent]
    });
    fixture = TestBed.createComponent(PlaceholderImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
