/**
 * app-routing.module.ts
 * Define todas as rotas de navegação da aplicação Eat&Go.
 * Requisito 3: Evidenciar conhecimentos de routing aplicado na navegação da app
 * Requisito 4: Utilizar o Angular Router: Router e ActivatedRoute
 * Requisito 5: Navegar e passar informação (parâmetros) entre páginas
 */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/** Definição de todas as rotas da aplicação */
const routes: Routes = [
  {
    // Redireciona a raiz para a página de explorar restaurantes
    path: '',
    redirectTo: 'explorar',
    pathMatch: 'full'
  },
  {
    // Página principal: Explorar Restaurantes (Tarefa 1 - base)
    path: 'explorar',
    loadChildren: () =>
      import('./explore/explore.module').then(m => m.ExplorePageModule)
  },
  {
    // Detalhe de um restaurante — recebe o ID como parâmetro na rota
    // Requisito 5: passar parâmetros entre páginas (:id)
    path: 'restaurante-detalhe/:id',
    loadChildren: () =>
      import('./restaurante-detalhe/restaurante-detalhe.module')
        .then(m => m.RestauranteDetalhePageModule)
  },
  {
    // Tarefa: Avaliar um restaurante — recebe o ID do restaurante
    // Requisito 5: passar parâmetros entre páginas (:id)
    path: 'avaliar/:id',
    loadChildren: () =>
      import('./avaliar/avaliar.module').then(m => m.AvaliarPageModule)
  },
  {
    // Tarefa: Adicionar novo restaurante
    path: 'adicionar-restaurante',
    loadChildren: () =>
      import('./adicionar-restaurante/adicionar-restaurante.module')
        .then(m => m.AdicionarRestaurantePageModule)
  },
  {
    // Login e Registo do utilizador
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    // Redireciona qualquer rota desconhecida para explorar
    path: '**',
    redirectTo: 'explorar'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Pré-carrega todos os módulos para navegação mais rápida
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}