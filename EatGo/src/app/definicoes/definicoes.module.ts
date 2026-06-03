import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diretivas comuns do Angular (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';   // Suporte a formulários e ngModel
import { IonicModule } from '@ionic/angular';   // Componentes Ionic (ion-button, ion-input, etc.)

import { DefinicoesPageRoutingModule } from './definicoes-routing.module'; // Rotas do módulo
import { DefinicoesPage } from './definicoes.page';                        // Componente principal da página

@NgModule({
  imports: [
    CommonModule,                // Funcionalidades base do Angular
    FormsModule,                 // Necessário para [(ngModel)]
    IonicModule,                 // Componentes e estilos Ionic
    DefinicoesPageRoutingModule  // Rotas desta página
  ],
  declarations: [DefinicoesPage] // Declara o componente neste módulo
})
export class DefinicoesPageModule {}