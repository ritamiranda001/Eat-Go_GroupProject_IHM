import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasAvaliacoesPage } from './minhas-avaliacoes.page';

describe('MinhasAvaliacoesPage', () => {
  let component: MinhasAvaliacoesPage;
  let fixture: ComponentFixture<MinhasAvaliacoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasAvaliacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
