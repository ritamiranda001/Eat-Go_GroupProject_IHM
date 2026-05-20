import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestauranteDetalhePage } from './restaurante-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: RestauranteDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestauranteDetalhePageRoutingModule {}
