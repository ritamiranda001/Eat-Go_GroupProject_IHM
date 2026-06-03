import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diretivas comuns do Angular (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';   // Suporte a formulários e ngModel
import { IonicModule } from '@ionic/angular';   // Componentes Ionic (ion-button, ion-input, etc.)

import { AvaliarPageRoutingModule } from './avaliar-routing.module'; // Rotas do módulo
import { AvaliarPage } from './avaliar.page';                        // Componente principal da página

@NgModule({
  imports: [
    CommonModule,           // Funcionalidades base do Angular
    FormsModule,            // Necessário para [(ngModel)]
    IonicModule,            // Componentes e estilos Ionic
    AvaliarPageRoutingModule // Rotas desta página
  ],
  declarations: [AvaliarPage] // Declara o componente neste módulo
})
export class AvaliarPageModule {}