/**
 * app.component.ts
 * Componente raiz da aplicação Eat&Go.
 * Gere o menu lateral e o estado de autenticação.
 * Requisito 3: Evidenciar conhecimentos de routing
 * Requisito 12: Utilizar o Capacitor para controlo do dispositivo
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Component, OnInit } from '@angular/core';
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
    const escuro = localStorage.getItem('eat_go_modo_escuro') === 'true';
    document.documentElement.classList.toggle('ion-palette-dark', escuro);
    this.splashFundo = escuro ? '#1c1c2e' : '#ffffff';
    this.bloquearOrientacao();
    setTimeout(() => { this.ocultarSplash = true; }, 1800);
    setTimeout(() => { this.mostrarSplash = false; }, 2400);
  }

  ngOnInit() {}

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

  /** Termina a sessão do utilizador e redireciona para home */
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