import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestauranteDetalhePage } from './restaurante-detalhe.page';

describe('RestauranteDetalhePage', () => {
  let component: RestauranteDetalhePage;
  let fixture: ComponentFixture<RestauranteDetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
