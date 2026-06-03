import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diretivas comuns do Angular (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';   // Suporte a formulários e ngModel
import { IonicModule } from '@ionic/angular';   // Componentes Ionic (ion-button, ion-input, etc.)

import { MinhasAvaliacoesPageRoutingModule } from './minhas-avaliacoes-routing.module'; // Rotas do módulo
import { MinhasAvaliacoesPage } from './minhas-avaliacoes.page';                        // Componente principal da página

@NgModule({
  imports: [
    CommonModule,                          // Funcionalidades base do Angular
    FormsModule,                           // Necessário para [(ngModel)]
    IonicModule,                           // Componentes e estilos Ionic
    MinhasAvaliacoesPageRoutingModule      // Rotas desta página
  ],
  declarations: [MinhasAvaliacoesPage]     // Declara o componente neste módulo
})
export class MinhasAvaliacoesPageModule {}