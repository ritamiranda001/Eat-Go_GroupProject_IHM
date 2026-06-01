/**
 * app-routing.module.ts
 * Define todas as rotas de navegação da aplicação Eat&Go.
 * Requisito 3: Evidenciar conhecimentos de routing aplicado na navegação da app
 * Requisito 4: Utilizar o Angular Router: Router e ActivatedRoute
 * Requisito 5: Navegar e passar informação (parâmetros) entre páginas
 */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'restaurante-detalhe/:id',
    loadChildren: () =>
      import('./restaurante-detalhe/restaurante-detalhe.module')
        .then(m => m.RestauranteDetalhePageModule)
  },
  {
    path: 'avaliar/:id',
    loadChildren: () =>
      import('./avaliar/avaliar.module').then(m => m.AvaliarPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'adicionar-restaurante',
    loadChildren: () =>
      import('./adicionar-restaurante/adicionar-restaurante.module')
        .then(m => m.AdicionarRestaurantePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'minhas-avaliacoes',
    loadChildren: () =>
      import('./minhas-avaliacoes/minhas-avaliacoes.module')
        .then(m => m.MinhasAvaliacoesPageModule),
    canActivate: [authGuard]
  },
  {
  path: 'perfil',
  loadChildren: () =>
    import('./perfil/perfil.module').then(m => m.PerfilPageModule),
  canActivate: [authGuard]
},
  {
    path: 'definicoes',
    loadChildren: () =>
      import('./definicoes/definicoes.module').then(m => m.DefinicoesPageModule)
  },
  {
    // Deve ser sempre o último!
    path: '**',
    redirectTo: 'home'
  },
  
/*  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  }
    */

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