import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarRestaurantePage } from './adicionar-restaurante.page';

describe('AdicionarRestaurantePage', () => {
  let component: AdicionarRestaurantePage;
  let fixture: ComponentFixture<AdicionarRestaurantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarRestaurantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
