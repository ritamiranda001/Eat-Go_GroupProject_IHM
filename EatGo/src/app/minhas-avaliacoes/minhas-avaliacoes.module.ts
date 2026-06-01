import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MinhasAvaliacoesPageRoutingModule } from './minhas-avaliacoes-routing.module';
import { MinhasAvaliacoesPage } from './minhas-avaliacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasAvaliacoesPageRoutingModule
  ],
  declarations: [MinhasAvaliacoesPage]
})
export class MinhasAvaliacoesPageModule {}