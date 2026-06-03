import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Avaliacao } from '../models/avaliacao.model';

@Component({
  selector: 'app-minhas-avaliacoes',
  templateUrl: './minhas-avaliacoes.page.html',
  styleUrls: ['./minhas-avaliacoes.page.scss'],
  standalone: false
})
export class MinhasAvaliacoesPage implements OnInit {

  avaliacoes: any[] = [];

  constructor(
    private router: Router,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  async ionViewWillEnter() {
    await this.carregarAvaliacoes();
  }

  async carregarAvaliacoes() {
    this.avaliacoes = [];
    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_')) {
        // Guarda a chave exata dentro do objeto para apagar só este
        this.avaliacoes.push({ ...valor, _chave: chave });
      }
    });
    // Ordena da mais recente para a mais antiga
    this.avaliacoes.sort((a, b) => {
      const chaveA = a._chave.split('_').pop() || '0';
      const chaveB = b._chave.split('_').pop() || '0';
      return Number(chaveB) - Number(chaveA);
    });
  }

  async apagar(av: any) {
    const alert = await this.alertCtrl.create({
      header: 'Apagar avaliação',
      message: 'Tens a certeza que queres apagar a tua avaliação de<strong> ${av.restauranteNome}</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Apagar',
          role: 'destructive',
          cssClass: 'alerta-apagar',
          handler: async () => {
            await this.storage.remove(av._chave);
            await this.carregarAvaliacoes();
          }
        }
      ]
    });

    await alert.present();
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}