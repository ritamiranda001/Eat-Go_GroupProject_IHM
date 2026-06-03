import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

// Definição de todas as rotas da aplicação Eat&Go
const routes: Routes = [
  {
    // Rota raiz — redireciona para a página principal
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    // Página principal com a lista de restaurantes
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    // Detalhe de um restaurante — recebe o ID como parâmetro na URL
    path: 'restaurante-detalhe/:id',
    loadChildren: () =>
      import('./restaurante-detalhe/restaurante-detalhe.module')
        .then(m => m.RestauranteDetalhePageModule)
  },
  {
    // Página de avaliação — protegida pelo authGuard (requer login)
    // Recebe o ID do restaurante como parâmetro na URL
    path: 'avaliar/:id',
    loadChildren: () =>
      import('./avaliar/avaliar.module').then(m => m.AvaliarPageModule),
    canActivate: [authGuard]
  },
  {
    // Página de adicionar restaurante — protegida pelo authGuard (requer login)
    path: 'adicionar-restaurante',
    loadChildren: () =>
      import('./adicionar-restaurante/adicionar-restaurante.module')
        .then(m => m.AdicionarRestaurantePageModule),
    canActivate: [authGuard]
  },
  {
    // Página de login e registo — acessível sem autenticação
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    // Página com as avaliações do utilizador — protegida pelo authGuard (requer login)
    path: 'minhas-avaliacoes',
    loadChildren: () =>
      import('./minhas-avaliacoes/minhas-avaliacoes.module')
        .then(m => m.MinhasAvaliacoesPageModule),
    canActivate: [authGuard]
  },
  {
    // Página de perfil do utilizador — protegida pelo authGuard (requer login)
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [authGuard]
  },
  {
    // Página de definições — acessível sem autenticação
    path: 'definicoes',
    loadChildren: () =>
      import('./definicoes/definicoes.module').then(m => m.DefinicoesPageModule)
  },
  {
    // Rota wildcard — deve ser sempre a última!
    // Redireciona qualquer URL desconhecida para a página principal
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules // Pré-carrega todos os módulos em segundo plano
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}