import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private storage: Storage,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  /** Recarrega as avaliações sempre que a página é aberta */
  async ionViewWillEnter() {
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

  /**
   * Mostra confirmação antes de apagar uma avaliação.
   * @param av - Avaliação a apagar
   */
  async apagar(av: Avaliacao) {
    const alert = await this.alertCtrl.create({
      header: 'Apagar avaliação',
      message: `Tens a certeza que queres apagar a avaliação de "${av.restauranteNome}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Apagar',
          role: 'destructive',
          handler: async () => {
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
        }
      ]
    });
    await alert.present();
  }

  /** Navega de volta para o home */
  voltar() {
    this.router.navigate(['/home']);
  }
}