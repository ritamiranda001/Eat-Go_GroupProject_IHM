import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { Avaliacao } from '../models/avaliacao.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  utilizador: any = null;
  totalAvaliacoes = 0;
  mediaEstrelas = 0;
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

  getIniciais(): string {
    if (!this.utilizador?.nome) return '?';
    return this.utilizador.nome
      .split('.')
      .map((p: string) => p[0]?.toUpperCase())
      .join('');
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/home']);
  }
}
