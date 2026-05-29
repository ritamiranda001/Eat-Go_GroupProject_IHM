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
    { title: 'Minhas Avaliações', url: '/minhas-avaliacoes', icon: 'star-outline' },
    { title: 'Adicionar Restaurante', url: '/adicionar-restaurante', icon: 'add-circle-outline' },
    { title: 'Explorar Mapa', url: '/home', icon: 'search-outline' },
  ];

  constructor(
    private menuCtrl: MenuController,
    public authService: AuthService,
    private router: Router
  ) {}

  fecharMenu() {
    this.menuCtrl.close();
  }

  async logout() {
    await this.authService.logout();
    this.menuCtrl.close();
    this.router.navigate(['/home']);
  }
}