import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { RestauranteService } from '../services/restaurante.service';
import { AuthService } from '../services/auth.service';
import { Restaurante } from '../models/restaurante.model';
import { Avaliacao } from '../models/avaliacao.model';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
  standalone: false
})
export class AvaliarPage implements OnInit {

  restaurante: Restaurante | undefined;
  estrelasAtivas = 0;
  comentario = '';
  sucesso = false;
  erro = '';
  anonimo = false;
  readonly estrelas = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restauranteService: RestauranteService,
    private storage: Storage,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restauranteService.getById(id).subscribe({
      next: (r) => this.restaurante = r,
      error: (err) => console.error('Erro ao carregar restaurante:', err)
    });
  }

  selecionarEstrelas(n: number) { this.estrelasAtivas = n; }

  async submeter() {
    this.erro = '';
    if (this.estrelasAtivas === 0) { this.erro = 'Por favor seleciona uma classificação.'; return; }
    if (this.comentario.trim().length < 5) { this.erro = 'O comentário deve ter pelo menos 5 caracteres.'; return; }

    // Se anónimo usa "Utilizador Anónimo", senão usa o nome do utilizador autenticado
    const utilizadorAtual = this.authService.getUtilizador();
    const nomeUtilizador = this.anonimo ? 'Utilizador Anónimo' : (utilizadorAtual?.nome || 'Utilizador Anónimo');

    const avaliacao: Avaliacao = {
      restauranteId: this.restaurante!.id,
      restauranteNome: this.restaurante!.nome,
      estrelas: this.estrelasAtivas,
      comentario: this.comentario.trim(),
      data: new Date().toLocaleDateString('pt-PT'),
      utilizador: nomeUtilizador
    };

    const chave = `avaliacao_${this.restaurante!.id}_${Date.now()}`;
    await this.storage.set(chave, avaliacao);
    this.sucesso = true;
    setTimeout(() => this.router.navigate(['/home']), 2000);
  }

  voltar() { this.router.navigate(['/home']); }
}