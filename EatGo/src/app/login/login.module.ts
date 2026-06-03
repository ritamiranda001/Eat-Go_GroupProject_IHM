import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diretivas comuns do Angular (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';   // Suporte a formulários e ngModel
import { IonicModule } from '@ionic/angular';   // Componentes Ionic (ion-button, ion-input, etc.)

import { LoginPage } from './login.page';                     // Componente principal da página
import { LoginPageRoutingModule } from './login-routing.module'; // Rotas do módulo

@NgModule({
  imports: [
    CommonModule,          // Funcionalidades base do Angular
    FormsModule,           // Necessário para [(ngModel)] nos inputs do formulário
    IonicModule,           // Componentes e estilos Ionic
    LoginPageRoutingModule // Rotas desta página
  ],
  declarations: [LoginPage] // Declara o componente neste módulo
})
export class LoginPageModule {}