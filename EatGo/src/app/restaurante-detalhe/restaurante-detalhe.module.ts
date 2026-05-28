import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RestauranteDetalhePageRoutingModule } from './restaurante-detalhe-routing.module';
import { RestauranteDetalhePage } from './restaurante-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestauranteDetalhePageRoutingModule
  ],
  declarations: [RestauranteDetalhePage]
})
export class RestauranteDetalhePageModule {}
