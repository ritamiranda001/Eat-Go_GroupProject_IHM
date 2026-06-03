import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard de autenticação — protege rotas que requerem login
// Impede utilizadores não autenticados de aceder a páginas privadas
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Serviço de autenticação
  const router = inject(Router);           // Router para redirecionar se necessário

  if (authService.isLoggedIn()) {
    // Utilizador autenticado — permite o acesso à rota
    return true;
  } else {
    // Utilizador não autenticado — redireciona para a página de login
    router.navigate(['/login']);
    return false;
  }
};