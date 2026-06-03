/**
 * perfil.page.ts
 * Página de perfil do utilizador autenticado.
 * Requisito 4: Utilizar o Angular Router
 * Requisito 9: Guardar informação com recurso ao Ionic Storage
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
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

  /** Lista de avaliações feitas pelo utilizador */
  avaliacoes: Avaliacao[] = [];

  /** Total de avaliações feitas */
  totalAvaliacoes = 0;

  /** Média das estrelas das avaliações */
  mediaEstrelas = 0;

  /** Data de registo do utilizador */
  dataRegisto: string = '';

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.utilizador = this.authService.getUtilizador();
    this.dataRegisto = new Date().toLocaleDateString('pt-PT');
    await this.carregarAvaliacoes();
  }

  /** Carrega todas as avaliações guardadas no Storage */
  async carregarAvaliacoes() {
    this.avaliacoes = [];
    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_')) {
        this.avaliacoes.push(valor);
      }
    });
    this.totalAvaliacoes = this.avaliacoes.length;
    if (this.avaliacoes.length > 0) {
      const soma = this.avaliacoes.reduce((acc, av) => acc + av.estrelas, 0);
      this.mediaEstrelas = Math.round((soma / this.avaliacoes.length) * 10) / 10;
    }
  }

  /** Devolve as iniciais do nome do utilizador */
  getIniciais(): string {
    if (!this.utilizador?.nome) return '?';
    return this.utilizador.nome
      .split('.')
      .map((p: string) => p[0]?.toUpperCase())
      .join('');
  }

  /** Devolve um array com o número de estrelas para renderizar */
  getEstrelas(n: number): number[] {
    return Array(n).fill(0);
  }

  /** Navega para a página de início */
  voltar() {
    this.router.navigate(['/home']);
  }

  /** Faz logout e redireciona para home */
  async logout() {
    await this.authService.logout();
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