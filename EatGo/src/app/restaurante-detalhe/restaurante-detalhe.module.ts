/**
 * restaurante-detalhe.module.ts
 * Módulo de funcionalidade da página de detalhe de um restaurante.
 * Declara o RestauranteDetalhePage e importa as dependências necessárias.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';      // Diretivas Angular base: ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms';        // Suporte a formulários com [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // Para leitura do JSON dos restaurantes (Requisito 10)
import { IonicModule } from '@ionic/angular';        // Componentes Ionic: ion-header, ion-content, etc.

import { RestauranteDetalhePageRoutingModule } from './restaurante-detalhe-routing.module';
import { RestauranteDetalhePage } from './restaurante-detalhe.page';

@NgModule({
  imports: [
    CommonModule,                        // Diretivas Angular essenciais
    FormsModule,                         // Binding de formulários
    IonicModule,                         // Componentes visuais do Ionic
    HttpClientModule,                    // Pedidos HTTP para carregar dados dos restaurantes
    RestauranteDetalhePageRoutingModule  // Rotas da página de detalhe
  ],
  declarations: [RestauranteDetalhePage] // Declara o componente neste módulo (padrão NgModule)
})
export class RestauranteDetalhePageModule {}