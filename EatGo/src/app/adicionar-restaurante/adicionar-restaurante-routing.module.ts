import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarRestaurantePage } from './adicionar-restaurante.page';

// Definição das rotas para o módulo de adicionar restaurante
const routes: Routes = [
  {
    path: '',                          // Rota raiz do módulo
    component: AdicionarRestaurantePage // Componente a renderizar
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Regista as rotas como filho (lazy loading)
  exports: [RouterModule],                  // Exporta o RouterModule para uso no módulo pai
})
export class AdicionarRestaurantePageRoutingModule {}