import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasAvaliacoesPage } from './minhas-avaliacoes.page';

// Definição das rotas para o módulo de minhas avaliações
const routes: Routes = [
  {
    path: '',                       // Rota raiz do módulo
    component: MinhasAvaliacoesPage // Componente a renderizar quando a rota é acedida
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Regista as rotas como filho (lazy loading)
  exports: [RouterModule],                  // Exporta o RouterModule para uso no módulo pai
})
export class MinhasAvaliacoesPageRoutingModule {}