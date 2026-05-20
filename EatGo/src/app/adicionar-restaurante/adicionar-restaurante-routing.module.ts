import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarRestaurantePage } from './adicionar-restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarRestaurantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarRestaurantePageRoutingModule {}
