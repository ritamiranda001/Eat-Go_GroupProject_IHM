import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diretivas comuns do Angular (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';   // Suporte a formulários e ngModel
import { HttpClientModule } from '@angular/common/http'; // Permite fazer pedidos HTTP
import { IonicModule } from '@ionic/angular';   // Componentes Ionic (ion-button, ion-input, etc.)

import { AdicionarRestaurantePageRoutingModule } from './adicionar-restaurante-routing.module'; // Rotas do módulo
import { AdicionarRestaurantePage } from './adicionar-restaurante.page'; // Componente principal da página

@NgModule({
  imports: [
    CommonModule,                          // Funcionalidades base do Angular
    FormsModule,                           // Necessário para [(ngModel)]
    IonicModule,                           // Componentes e estilos Ionic
    HttpClientModule,                      // Necessário para chamadas HTTP
    AdicionarRestaurantePageRoutingModule  // Rotas desta página
  ],
  declarations: [AdicionarRestaurantePage] // Declara o componente neste módulo
})
export class AdicionarRestaurantePageModule {}