import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasAvaliacoesPage } from './minhas-avaliacoes.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasAvaliacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhasAvaliacoesPageRoutingModule {}
