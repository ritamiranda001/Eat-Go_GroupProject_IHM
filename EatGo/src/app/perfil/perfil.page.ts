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
import { Avaliacao } from '../models/avaliacao.model';

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

  /** Total de avaliações feitas pelo utilizador */
  totalAvaliacoes = 0;

  /** Média de estrelas das avaliações */
  mediaEstrelas = 0;

  /** Data de registo formatada */
  dataRegisto: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.utilizador = this.authService.getUtilizador();
    this.dataRegisto = new Date().toLocaleDateString('pt-PT');
    await this.carregarEstatisticas();
  }

  /**
   * Carrega estatísticas das avaliações guardadas no Storage.
   */
  async carregarEstatisticas() {
    const avaliacoes: Avaliacao[] = [];

    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_')) {
        avaliacoes.push(valor);
      }
    });

    this.totalAvaliacoes = avaliacoes.length;

    if (avaliacoes.length > 0) {
      const soma = avaliacoes.reduce((acc, av) => acc + av.estrelas, 0);
      this.mediaEstrelas = Math.round((soma / avaliacoes.length) * 10) / 10;
    }
  }

  /**
   * Devolve as iniciais do nome do utilizador.
   */
  getIniciais(): string {
    if (!this.utilizador?.nome) return '?';
    return this.utilizador.nome
      .split('.')
      .map((p: string) => p[0]?.toUpperCase())
      .join('');
  }

  /**
   * Navega para a página de início.
   */
  voltar() {
    this.router.navigate(['/home']);
  }

  /**
   * Faz logout e redireciona para home.
   */
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/home']);
  }
}