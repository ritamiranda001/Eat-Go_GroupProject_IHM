/**
 * app-routing.module.ts
 * Define todas as rotas de navegação da aplicação Eat&Go.
 * Requisito 3: Evidenciar conhecimentos de routing aplicado na navegação da app
 * Requisito 4: Utilizar o Angular Router: Router e ActivatedRoute
 * Requisito 5: Navegar e passar informação (parâmetros) entre páginas
 */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // Redireciona a raiz para a página home das colegas
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    // Página home (Rita)
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  }
  ,
  {
    // Detalhe de um restaurante — parâmetro :id na rota
    // Requisito 5: passar parâmetros entre páginas
    path: 'restaurante-detalhe/:id',
    loadChildren: () =>
      import('./restaurante-detalhe/restaurante-detalhe.module')
        .then(m => m.RestauranteDetalhePageModule)
  },
  {
    // Tarefa: Avaliar restaurante — recebe :id do restaurante
    // Requisito 5: passar parâmetros entre páginas
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
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}