/**
 * perfil.module.ts
 * Módulo de funcionalidade da página de Perfil.
 * Declara o PerfilPage e importa as dependências necessárias para o seu funcionamento.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Diretivas Angular base: ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms';    // Suporte a formulários com [(ngModel)]

import { IonicModule } from '@ionic/angular';    // Componentes Ionic: ion-header, ion-content, etc.

import { PerfilPageRoutingModule } from './perfil-routing.module'; // Routing desta feature

import { PerfilPage } from './perfil.page';

@NgModule({
  imports: [
    CommonModule,          // Diretivas Angular essenciais
    FormsModule,           // Binding de formulários
    IonicModule,           // Componentes visuais do Ionic
    PerfilPageRoutingModule // Rotas da página de Perfil
  ],
  declarations: [PerfilPage] // Declara o componente neste módulo (padrão NgModule)
})
export class PerfilPageModule {}