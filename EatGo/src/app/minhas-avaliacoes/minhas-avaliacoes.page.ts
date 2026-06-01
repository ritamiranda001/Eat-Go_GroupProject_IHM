import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Avaliacao } from '../models/avaliacao.model';

@Component({
  selector: 'app-minhas-avaliacoes',
  templateUrl: './minhas-avaliacoes.page.html',
  styleUrls: ['./minhas-avaliacoes.page.scss'],
  standalone: false
})
export class MinhasAvaliacoesPage implements OnInit {

  /** Lista de avaliações carregadas do Storage */
  avaliacoes: Avaliacao[] = [];

  constructor(
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
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
  }

  /** Apaga uma avaliação do Storage */
  async apagar(av: Avaliacao) {
    const chaves: string[] = [];
    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_') && valor.restauranteId === av.restauranteId && valor.data === av.data) {
        chaves.push(chave);
      }
    });
    for (const chave of chaves) {
      await this.storage.remove(chave);
    }
    await this.carregarAvaliacoes();
  }

  /** Navega de volta para o home */
  voltar() {
    this.router.navigate(['/home']);
  }
}