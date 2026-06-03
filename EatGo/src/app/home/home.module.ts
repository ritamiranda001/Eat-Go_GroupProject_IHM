import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diretivas comuns do Angular (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';   // Suporte a formulários e ngModel
import { HttpClientModule } from '@angular/common/http'; // Permite fazer pedidos HTTP
import { IonicModule } from '@ionic/angular';   // Componentes Ionic (ion-button, ion-input, etc.)

import { HomePageRoutingModule } from './home-routing.module'; // Rotas do módulo
import { HomePage } from './home.page';                        // Componente principal da página

@NgModule({
  imports: [
    CommonModule,         // Funcionalidades base do Angular
    FormsModule,          // Necessário para [(ngModel)]
    IonicModule,          // Componentes e estilos Ionic
    HttpClientModule,     // Necessário para chamadas HTTP ao serviço de restaurantes
    HomePageRoutingModule // Rotas desta página
  ],
  declarations: [HomePage] // Declara o componente neste módulo
})
export class HomePageModule {}