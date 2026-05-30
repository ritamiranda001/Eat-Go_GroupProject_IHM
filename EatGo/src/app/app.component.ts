/**
 * app.component.ts
 * Componente raiz da aplicação Eat&Go.
 * Gere o menu lateral e o estado de autenticação.
 * Requisito 3: Evidenciar conhecimentos de routing
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

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
    private navCtrl: NavController,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  /** Fecha o menu lateral */
  fecharMenu() {
    this.menuCtrl.close();
  }

  /** Navega para o perfil */
 irPerfil() {
  this.router.navigate(['/perfil']);
}

  /** Faz logout e redireciona para home */
  async logout() {
    await this.authService.logout();
    this.menuCtrl.close();
    this.navCtrl.navigateRoot('/home');
  }
}