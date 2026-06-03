import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

// Definição das rotas para o módulo de login
const routes: Routes = [
  {
    path: '',           // Rota raiz do módulo
    component: LoginPage // Componente a renderizar quando a rota é acedida
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Regista as rotas como filho (lazy loading)
  exports: [RouterModule],                  // Exporta o RouterModule para uso no módulo pai
})
export class LoginPageRoutingModule {}