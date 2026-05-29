import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante.model';
import { Avaliacao } from '../models/avaliacao.model';

@Component({
  selector: 'app-restaurante-detalhe',
  templateUrl: './restaurante-detalhe.page.html',
  styleUrls: ['./restaurante-detalhe.page.scss'],
  standalone: false
})
export class RestauranteDetalhePage implements OnInit {

  restaurante: Restaurante | undefined;
  avaliacoes: Avaliacao[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restauranteService: RestauranteService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.restauranteService.getById(id).subscribe({
      next: async (r) => {
        this.restaurante = r;
        await this.carregarAvaliacoes(id);
      },
      error: (err) => console.error('Erro ao carregar restaurante:', err)
    });
  }

  async carregarAvaliacoes(restauranteId: number) {
    this.avaliacoes = [];

    // Avaliações do Storage (feitas pelo utilizador)
    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_') && valor.restauranteId === restauranteId) {
        this.avaliacoes.push(valor);
      }
    });

    // Avaliações do JSON (se existirem)
    if (this.restaurante && (this.restaurante as any).avaliacoesList) {
      const avaliacoesJSON = (this.restaurante as any).avaliacoesList as Avaliacao[];
      this.avaliacoes = [...avaliacoesJSON, ...this.avaliacoes];
    }
  }

  voltar() { this.router.navigate(['/home']); }
  avaliar() { this.router.navigate(['/avaliar', this.restaurante?.id]); }

  getEstrelasArray(n: number): number[] {
    return Array(Math.round(n)).fill(0);
  }
}