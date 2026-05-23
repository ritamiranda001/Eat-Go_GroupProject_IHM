import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'explore',
    loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'avaliar',
    loadChildren: () => import('./avaliar/avaliar.module').then( m => m.AvaliarPageModule)
  },
  {
    path: 'adicionar-restaurante',
    loadChildren: () => import('./adicionar-restaurante/adicionar-restaurante.module').then( m => m.AdicionarRestaurantePageModule)
  },
  {
    path: 'restaurante-detalhe',
    loadChildren: () => import('./restaurante-detalhe/restaurante-detalhe.module').then( m => m.RestauranteDetalhePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
