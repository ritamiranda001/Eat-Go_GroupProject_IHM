/**
 * explore.module.ts
 * Módulo Angular da página Explorar Restaurantes.
 * Requisito 7: Estruturar e organizar devidamente os vários módulos
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para [(ngModel)] na searchbar
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ExplorePage } from './explore.page';
import { ExplorePageRoutingModule } from './explore-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,       // Permite uso de [(ngModel)] no template
    IonicModule,
    RouterModule,
    ExplorePageRoutingModule
  ],
  declarations: [ExplorePage]
})
export class ExplorePageModule {}