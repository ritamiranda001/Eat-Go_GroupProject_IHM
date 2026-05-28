import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdicionarRestaurantePageRoutingModule } from './adicionar-restaurante-routing.module';
import { AdicionarRestaurantePage } from './adicionar-restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarRestaurantePageRoutingModule
  ],
  declarations: [AdicionarRestaurantePage]
})
export class AdicionarRestaurantePageModule {}