import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public menuPages = [
    { title: 'Minhas Avaliações', url: '/minhas-avaliacoes', icon: 'star-outline', requerLogin: true },
    { title: 'Adicionar Restaurante', url: '/adicionar-restaurante', icon: 'add-circle-outline', requerLogin: true },
    { title: 'Definições', url: '/definicoes', icon: 'settings-outline', requerLogin: false },
  ];

  constructor(
    private menuCtrl: MenuController,
    public authService: AuthService,
    private router: Router
  ) {
  // modo escuro se estava ativo
  const escuro = localStorage.getItem('eat_go_modo_escuro') === 'true';
document.documentElement.classList.toggle('ion-palette-dark', escuro);

  }

  fecharMenu() {
    this.menuCtrl.close();
  }

  async logout() {
    await this.authService.logout();
    this.menuCtrl.close();
    this.router.navigate(['/home']);
  }
}