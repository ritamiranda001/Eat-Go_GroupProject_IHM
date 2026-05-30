/**
 * perfil.page.ts
 * Página de perfil do utilizador autenticado.
 * Requisito 4: Utilizar o Angular Router
 * Requisito 9: Guardar informação com recurso ao Ionic Storage
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { Avaliacao } from '../avaliar/avaliar.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {

  /** Dados do utilizador autenticado */
  utilizador: any = null;

  /** Lista de avaliações feitas pelo utilizador */
  avaliacoes: Avaliacao[] = [];

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.utilizador = this.authService.getUtilizador();
    await this.carregarAvaliacoes();
  }

  /**
   * Carrega todas as avaliações guardadas no Storage.
   */
  async carregarAvaliacoes() {
    this.avaliacoes = [];
    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_')) {
        this.avaliacoes.push(valor);
      }
    });
  }

  /**
   * Faz logout e redireciona para home.
   */
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/home']);
  }

  /**
   * Navega para a página de início.
   */
  voltar() {
  window.history.back();
}

  /**
   * Devolve um array com o número de estrelas para renderizar.
   * @param n - Número de estrelas
   */
  getEstrelas(n: number): number[] {
    return Array(n).fill(0);
  }
}