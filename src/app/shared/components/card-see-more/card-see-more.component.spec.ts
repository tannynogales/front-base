import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSeeMoreComponent } from './card-see-more.component';

describe('CardSeeMoreComponent', () => {
  let component: CardSeeMoreComponent;
  let fixture: ComponentFixture<CardSeeMoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSeeMoreComponent]
    });
    fixture = TestBed.createComponent(CardSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
