/**
 * perfil-routing.module.ts
 * Módulo de routing da página de Perfil.
 * Define que o caminho raiz ('') desta feature carrega o PerfilPage.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page';

// Rota local: path vazio significa que esta rota é relativa ao path pai definido no AppRoutingModule
const routes: Routes = [
  {
    path: '',
    component: PerfilPage // Componente carregado ao aceder a esta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild: usado em módulos de funcionalidade (não no root)
  exports: [RouterModule],                  // Exporta o RouterModule para uso no PerfilPageModule
})
export class PerfilPageRoutingModule {}