import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefinicoesPageRoutingModule } from './definicoes-routing.module';

import { DefinicoesPage } from './definicoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefinicoesPageRoutingModule
  ],
  declarations: [DefinicoesPage]
})
export class DefinicoesPageModule {}
