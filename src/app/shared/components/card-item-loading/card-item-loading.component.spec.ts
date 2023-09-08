import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemLoadingComponent } from './card-item-loading.component';

describe('CardItemLoadingComponent', () => {
  let component: CardItemLoadingComponent;
  let fixture: ComponentFixture<CardItemLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardItemLoadingComponent]
    });
    fixture = TestBed.createComponent(CardItemLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
