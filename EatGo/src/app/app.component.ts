/**
 * app.component.ts
 * Componente raiz da aplicação Eat&Go.
 * Gere o menu lateral e o estado de autenticação.
 * Requisito 3: Evidenciar conhecimentos de routing
 * Requisito 12: Utilizar o Capacitor para controlo do dispositivo
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Component, OnInit } from '@angular/core';
/**
 * app.component.ts
 * Componente raiz da aplicação Eat&Go.
 * Requisito 12: Utilizar o Capacitor para controlo do dispositivo
 */
import { Component } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  /** Controla a visibilidade do splash screen */
  mostrarSplash = true;

  /** Controla o fade out do splash screen */
  ocultarSplash = false;

  /** Cor de fundo do splash (claro/escuro) */
  splashFundo: string;

  /** Páginas visíveis apenas para utilizadores autenticados */
  paginasAutenticadas = [
    { title: 'Minhas Avaliações', url: '/minhas-avaliacoes', icon: 'star-outline' },
    { title: 'Adicionar Restaurante', url: '/adicionar-restaurante', icon: 'add-circle-outline' },
  ];

  /** Páginas visíveis para todos */
  paginasPublicas = [
    { title: 'Explorar Mapa', url: '/home', icon: 'map-outline' },
  ];

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private toastCtrl: ToastController,
    public authService: AuthService
  ) {
    // Restaura modo escuro se estava ativo
    const escuro = localStorage.getItem('eat_go_modo_escuro') === 'true';
    document.documentElement.classList.toggle('ion-palette-dark', escuro);
    this.splashFundo = escuro ? '#1c1c2e' : '#ffffff';

    // Bloqueia orientação em portrait
    this.bloquearOrientacao();

    // Splash screen: fade out após 1.8s, remove do DOM após 2.4s
    setTimeout(() => { this.ocultarSplash = true; }, 1800);
    setTimeout(() => { this.mostrarSplash = false; }, 2400);
  }

  ngOnInit() {}
  mostrarSplash = true;
  ocultarSplash = false;
  splashFundo: string;

  /** Páginas disponíveis no menu lateral */
  public menuPages = [
    { title: 'Minhas Avaliações', url: '/minhas-avaliacoes', icon: 'star-outline', requerLogin: true },
    { title: 'Adicionar Restaurante', url: '/adicionar-restaurante', icon: 'add-circle-outline', requerLogin: true },
    { title: 'Definições', url: '/definicoes', icon: 'settings-outline', requerLogin: false },
  ];

  constructor(
  private menuCtrl: MenuController,
  public authService: AuthService,
  private router: Router,
  private toastCtrl: ToastController
) {
  // Restaura modo escuro se estava ativo
  const escuro = localStorage.getItem('eat_go_modo_escuro') === 'true';
  document.documentElement.classList.toggle('ion-palette-dark', escuro);
  this.splashFundo = escuro ? '#1c1c2e' : '#ffffff';

  // Bloqueia a orientação da app em portrait (vertical)
  // Requisito 12: Capacitor para controlo do dispositivo
  this.bloquearOrientacao();

  // Splash screen: inicia fade out após 1.8s, remove do DOM após a animação
  setTimeout(() => { this.ocultarSplash = true; }, 1800);
  setTimeout(() => { this.mostrarSplash = false; }, 2400);
}
    

  /**
   * Bloqueia a orientação da app em portrait.
   * Requisito 12: Capacitor para controlo do dispositivo
   */
  async bloquearOrientacao() {
    try {
      await ScreenOrientation.lock({ orientation: 'portrait' });
    } catch (e) {
      console.log('Orientação apenas bloqueada em dispositivo físico.');
    }
  }

  /** Fecha o menu lateral */
  fecharMenu() {
    this.menuCtrl.close();
  }

  /** Navega para o perfil */
  irPerfil() {
    this.router.navigate(['/perfil']);
  }

  /**
   * Termina a sessão do utilizador e redireciona para home.
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
      color: 'dark'
    });
    await toast.present();
  }
}