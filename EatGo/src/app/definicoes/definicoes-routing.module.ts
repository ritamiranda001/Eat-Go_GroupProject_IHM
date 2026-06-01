import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefinicoesPage } from './definicoes.page';

const routes: Routes = [
  {
    path: '',
    component: DefinicoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinicoesPageRoutingModule {}
