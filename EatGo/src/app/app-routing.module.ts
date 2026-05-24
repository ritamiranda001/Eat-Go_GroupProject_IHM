import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'avaliar/:id',
    loadChildren: () => import('./avaliar/avaliar.module').then(m => m.AvaliarPageModule)
  },
  {
    path: 'adicionar-restaurante',
    loadChildren: () => import('./adicionar-restaurante/adicionar-restaurante.module').then(m => m.AdicionarRestaurantePageModule)
  },
  {
    path: 'restaurante-detalhe/:id',
    loadChildren: () => import('./restaurante-detalhe/restaurante-detalhe.module').then(m => m.RestauranteDetalhePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}