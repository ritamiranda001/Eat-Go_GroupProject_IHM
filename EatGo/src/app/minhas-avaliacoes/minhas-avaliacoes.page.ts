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

  avaliacoes: any[] = []; // Lista de avaliações do utilizador carregadas do storage

  constructor(
    private router: Router,
    private storage: Storage,          // Storage local para ler e apagar avaliações
    private alertCtrl: AlertController // Controlador de alertas de confirmação
  ) {}

  // Inicializa o storage local ao carregar o componente
  async ngOnInit() {
    await this.storage.create();
  }

  // Recarrega as avaliações sempre que a página fica visível
  async ionViewWillEnter() {
    await this.carregarAvaliacoes();
  }

  // Lê todas as avaliações guardadas no storage e ordena da mais recente para a mais antiga
  async carregarAvaliacoes() {
    this.avaliacoes = [];

    // Percorre todas as entradas do storage e filtra as avaliações pelo prefixo
    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_')) {
        // Guarda a chave exata dentro do objeto para permitir apagar apenas esta entrada
        this.avaliacoes.push({ ...valor, _chave: chave });
      }
    });

    // Ordena pela chave (que contém o timestamp) — mais recente primeiro
    this.avaliacoes.sort((a, b) => {
      const chaveA = a._chave.split('_').pop() || '0'; // Extrai o timestamp da chave
      const chaveB = b._chave.split('_').pop() || '0';
      return Number(chaveB) - Number(chaveA); // Ordem decrescente (mais recente primeiro)
    });
  }

  // Pede confirmação e apaga uma avaliação do storage
  async apagar(av: any) {
    const alert = await this.alertCtrl.create({
      header: 'Apagar avaliação',
      message: `Tens a certeza que queres apagar a avaliação de "${av.restauranteNome}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel' // Fecha o alerta sem apagar
        },
        {
          text: 'Apagar',
          role: 'destructive',   // Estilo destrutivo (vermelho)
          cssClass: 'alerta-apagar',
          handler: async () => {
            // Remove a avaliação do storage usando a chave guardada
            await this.storage.remove(av._chave);
            // Recarrega a lista após apagar
            await this.carregarAvaliacoes();
          }
        }
      ]
    });

    await alert.present();
  }

  // Navega de volta para a página inicial
  voltar() {
    this.router.navigate(['/home']);
  }
}