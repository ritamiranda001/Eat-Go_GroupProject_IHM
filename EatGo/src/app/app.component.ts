/**
 * app.component.ts
 * Componente raiz da aplicação Eat&Go.
 * Requisito 12: Utilizar o Capacitor para controlo do dispositivo
 */
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  /** Páginas disponíveis no menu lateral */
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
  // Restaura modo escuro se estava ativo
  const escuro = localStorage.getItem('eat_go_modo_escuro') === 'true';
  document.documentElement.classList.toggle('ion-palette-dark', escuro);

  // Bloqueia a orientação da app em portrait (vertical)
  // Requisito 12: Capacitor para controlo do dispositivo
  this.bloquearOrientacao();
}
    

  /**
   * Bloqueia a orientação da app em portrait (vertical).
   * Requisito 12: Capacitor para controlo do dispositivo
   */
  async bloquearOrientacao() {
    try {
      await ScreenOrientation.lock({ orientation: 'portrait' });
    } catch (e) {
      // No browser o lock não funciona, apenas em dispositivo físico
      console.log('Orientação apenas bloqueada em dispositivo físico.');
    }
  }

  /** Fecha o menu lateral */
  fecharMenu() {
    this.menuCtrl.close();
  }

  /** Termina a sessão do utilizador e redireciona para home */
  async logout() {
    await this.authService.logout();
    this.menuCtrl.close();
    this.router.navigate(['/home']);
  }
}