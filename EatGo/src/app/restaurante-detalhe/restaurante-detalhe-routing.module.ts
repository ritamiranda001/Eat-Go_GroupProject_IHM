/**
 * restaurante-detalhe-routing.module.ts
 * Módulo de routing da página de detalhe de um restaurante.
 * Define que o caminho raiz ('') desta feature carrega o RestauranteDetalhePage.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestauranteDetalhePage } from './restaurante-detalhe.page';

// Rota local: path vazio é relativo ao path pai definido no AppRoutingModule
const routes: Routes = [
  {
    path: '',
    component: RestauranteDetalhePage // Componente carregado ao aceder a esta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild: usado em módulos de funcionalidade (não no root)
  exports: [RouterModule],                  // Exporta o RouterModule para uso no RestauranteDetalhePageModule
})
export class RestauranteDetalhePageRoutingModule {}