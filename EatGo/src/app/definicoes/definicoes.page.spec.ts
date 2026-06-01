import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefinicoesPage } from './definicoes.page';

describe('DefinicoesPage', () => {
  let component: DefinicoesPage;
  let fixture: ComponentFixture<DefinicoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
