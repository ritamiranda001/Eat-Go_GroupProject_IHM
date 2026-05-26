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

// HttpClient: necessário para ler o ficheiro JSON dos restaurantes
// Requisito 10: Utilizar informação proveniente de ficheiros JSON
import { HttpClientModule } from '@angular/common/http';

// Ionic Storage: necessário para guardar sessão do utilizador
// Requisito 9: Guardar informação com recurso ao Ionic Storage
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent // Componente raiz da aplicação
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),       // Módulo principal do Ionic
    AppRoutingModule,            // Módulo de rotas da app
    HttpClientModule,            // Para leitura do JSON com HttpClient
    IonicStorageModule.forRoot() // Storage para persistência de dados
  ],
  providers: [
    // Usa a estratégia de routing do Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent] // Componente que arranca a aplicação
})
export class AppModule {}