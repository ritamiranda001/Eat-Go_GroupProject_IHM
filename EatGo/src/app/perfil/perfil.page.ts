/**
 * perfil.page.ts
 * Página de perfil do utilizador autenticado.
 * Mostra informações da conta e estatísticas calculadas
 * a partir das avaliações guardadas no Ionic Storage.
 * Requisito 9: Guardar informação com recurso ao Ionic Storage
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { Avaliacao } from '../models/avaliacao.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false // Obrigatório para apps baseadas em NgModules
})
export class PerfilPage implements OnInit {

  utilizador: any = null;  // Dados do utilizador autenticado
  totalAvaliacoes = 0;     // Total de avaliações feitas pelo utilizador
  mediaEstrelas = 0;       // Média de estrelas dada pelo utilizador
  dataRegisto: string = ''; // Data de registo (atualmente a data atual)

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {}

  /**
   * Inicializa o Storage, carrega o utilizador autenticado
   * e calcula as estatísticas de avaliações.
   */
  async ngOnInit() {
    await this.storage.create();
    this.utilizador = this.authService.getUtilizador();
    this.dataRegisto = new Date().toLocaleDateString('pt-PT');
    await this.carregarEstatisticas();
  }

  /**
   * Percorre todas as entradas do Storage e recolhe
   * as avaliações (chaves com prefixo 'avaliacao_').
   * Calcula o total e a média de estrelas.
   * Requisito 9: Ionic Storage
   */
  async carregarEstatisticas() {
    const avaliacoes: Avaliacao[] = [];

    // Itera sobre todas as chaves do Storage e filtra as avaliações do utilizador
    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_')) {
        avaliacoes.push(valor);
      }
    });

    this.totalAvaliacoes = avaliacoes.length;

    // Calcula a média apenas se existirem avaliações; arredonda a 1 casa decimal
    if (avaliacoes.length > 0) {
      const soma = avaliacoes.reduce((acc, av) => acc + av.estrelas, 0);
      this.mediaEstrelas = Math.round((soma / avaliacoes.length) * 10) / 10;
    }
  }

  /**
   * Gera as iniciais do utilizador a partir do nome.
   * O nome de utilizador usa '.' como separador (ex: "joao.silva" → "JS").
   * Retorna '?' se o nome não estiver disponível.
   */
  getIniciais(): string {
    if (!this.utilizador?.nome) return '?';
    return this.utilizador.nome
      .split('.')
      .map((p: string) => p[0]?.toUpperCase())
      .join('');
  }

  /** Navega para a página inicial */
  voltar() {
    this.router.navigate(['/home']);
  }

  /**
   * Termina a sessão do utilizador:
   * - Chama o AuthService para fazer logout
   * - Redireciona para a página inicial
   * - Mostra um toast de confirmação
   */
  async logout() {
    await this.authService.logout();
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