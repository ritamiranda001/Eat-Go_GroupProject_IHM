/**
 * app.component.ts
 * Componente raiz da aplicação Eat&Go.
 * Requisito 12: Utilizar o Capacitor para controlo do dispositivo
 */
import { Component } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false, // Obrigatório para apps baseadas em NgModules
})
export class AppComponent {

  mostrarSplash = true;   // Controla se o splash está no DOM
  ocultarSplash = false;  // Controla o fade out do splash (classe CSS)
  splashFundo: string;    // Cor de fundo do splash (adapta ao modo escuro)

  /** Páginas disponíveis no menu lateral */
  public menuPages = [
    { title: 'Minhas Avaliações',      url: '/minhas-avaliacoes',      icon: 'star-outline',        requerLogin: true  },
    { title: 'Adicionar Restaurante',  url: '/adicionar-restaurante',  icon: 'add-circle-outline',  requerLogin: true  },
    { title: 'Definições',             url: '/definicoes',             icon: 'settings-outline',    requerLogin: false },
  ];

  constructor(
    private menuCtrl: MenuController,
    public authService: AuthService,  // public: usado diretamente no template para verificar login
    private router: Router,
    private toastCtrl: ToastController
  ) {
    // Restaura modo escuro se estava ativo na sessão anterior
    const escuro = localStorage.getItem('eat_go_modo_escuro') === 'true';
    document.documentElement.classList.toggle('ion-palette-dark', escuro);
    this.splashFundo = escuro ? '#1c1c2e' : '#ffffff';

    // Bloqueia a orientação da app em portrait (vertical)
    // Requisito 12: Capacitor para controlo do dispositivo
    this.bloquearOrientacao();

    // Splash screen: inicia fade out após 1.8s, remove do DOM após a animação (2.4s)
    setTimeout(() => { this.ocultarSplash = true;  }, 1800);
    setTimeout(() => { this.mostrarSplash = false; }, 2400);
  }

  /**
   * Bloqueia a orientação da app em portrait (vertical).
   * Requisito 12: Capacitor para controlo do dispositivo
   */
  async bloquearOrientacao() {
    try {
      await ScreenOrientation.lock({ orientation: 'portrait' });
    } catch (e) {
      // O lock de orientação só funciona em dispositivo físico, não no browser
      console.log('Orientação apenas bloqueada em dispositivo físico.');
    }
  }

  /** Fecha o menu lateral */
  fecharMenu() {
    this.menuCtrl.close();
  }

  /**
   * Termina a sessão do utilizador:
   * - Chama o serviço de autenticação para fazer logout
   * - Fecha o menu lateral
   * - Redireciona para a página inicial
   * - Mostra um toast de confirmação
   */
  async logout() {
    await this.authService.logout();
    this.menuCtrl.close();
    this.router.navigate(['/home']);
    const toast = await this.toastCtrl.create({
      message: 'Sessão terminada com sucesso.',
      duration: 2500,
      position: 'bottom',
      icon: 'log-out-outline',
      cssClass: 'amarelo'
    });
    await toast.present();
  }
}