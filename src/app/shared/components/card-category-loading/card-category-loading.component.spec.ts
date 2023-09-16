import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCategoryLoadingComponent } from './card-category-loading.component';

describe('CardCategoryLoadingComponent', () => {
  let component: CardCategoryLoadingComponent;
  let fixture: ComponentFixture<CardCategoryLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCategoryLoadingComponent]
    });
    fixture = TestBed.createComponent(CardCategoryLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
