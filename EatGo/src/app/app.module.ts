/**
 * app.module.ts
 * Módulo principal da aplicação Eat&Go.
 * Aqui são declarados e importados todos os módulos globais necessários.
 * Requisito 7: Estruturar e organizar devidamente os vários módulos, services e assets
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// HttpClient: necessário para fazer pedidos HTTP e ler o ficheiro JSON dos restaurantes
// Requisito 10: Utilizar informação proveniente de ficheiros JSON
import { HttpClientModule } from '@angular/common/http';

// Ionic Storage: necessário para persistir a sessão do utilizador entre arranques da app
// Requisito 9: Guardar informação com recurso ao Ionic Storage
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent // Único componente global; os restantes são declarados nos seus próprios módulos
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),       // Inicializa o Ionic com configuração global
    AppRoutingModule,            // Define as rotas principais da aplicação
    HttpClientModule,            // Disponibiliza o HttpClient em toda a app (Requisito 10)
    IonicStorageModule.forRoot() // Inicializa o Ionic Storage (Requisito 9)
  ],
  providers: [
    // Substitui a estratégia de routing padrão do Angular pela do Ionic,
    // permitindo transições e navegação nativas
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  // Componente raiz que o Angular instancia para arrancar a aplicação
  bootstrap: [AppComponent]
})
export class AppModule {}