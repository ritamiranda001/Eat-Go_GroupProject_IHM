/**
 * avaliar.page.ts
 * Página para avaliar um restaurante.
 * Requisito 4: Utilizar o Angular Router: Router e ActivatedRoute
 * Requisito 5: Navegar e passar informação (parâmetros) entre páginas
 * Requisito 9: Guardar informação com recurso ao Ionic Storage
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante.model';

/** Interface que representa uma avaliação feita pelo utilizador */
export interface Avaliacao {
  /** ID do restaurante avaliado */
  restauranteId: number;
  /** Nome do restaurante avaliado */
  restauranteNome: string;
  /** Classificação de 1 a 5 estrelas */
  estrelas: number;
  /** Comentário do utilizador */
  comentario: string;
  /** Data da avaliação */
  data: string;
}

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AvaliarPage implements OnInit {

  /** Restaurante a ser avaliado */
  restaurante: Restaurante | undefined;

  /** Número de estrelas selecionadas (1-5) */
  estrelasAtivas = 0;

  /** Comentário escrito pelo utilizador */
  comentario = '';

  /** Indica se a avaliação foi submetida com sucesso */
  sucesso = false;

  /** Mensagem de erro caso a validação falhe */
  erro = '';

  /** Array de 5 posições para renderizar as estrelas */
  readonly estrelas = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restauranteService: RestauranteService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    // Inicializa o Storage
    await this.storage.create();

    // Obtém o ID do restaurante a partir dos parâmetros da rota
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restauranteService.getById(id).subscribe({
      next: (r) => this.restaurante = r,
      error: (err) => console.error('Erro ao carregar restaurante:', err)
    });
  }

  /**
   * Define o número de estrelas selecionadas pelo utilizador.
   * @param n - Número de estrelas (1 a 5)
   */
  selecionarEstrelas(n: number) {
    this.estrelasAtivas = n;
  }

  /**
   * Valida e submete a avaliação, guardando-a no Ionic Storage.
   */
  async submeter() {
    this.erro = '';

    if (this.estrelasAtivas === 0) {
      this.erro = 'Por favor seleciona uma classificação.';
      return;
    }
    if (this.comentario.trim().length < 5) {
      this.erro = 'O comentário deve ter pelo menos 5 caracteres.';
      return;
    }

    // Cria o objeto de avaliação
    const avaliacao: Avaliacao = {
      restauranteId: this.restaurante!.id,
      restauranteNome: this.restaurante!.nome,
      estrelas: this.estrelasAtivas,
      comentario: this.comentario.trim(),
      data: new Date().toLocaleDateString('pt-PT')
    };

    // Guarda no Storage — chave única por restaurante + timestamp
    const chave = `avaliacao_${this.restaurante!.id}_${Date.now()}`;
    await this.storage.set(chave, avaliacao);

    this.sucesso = true;
    setTimeout(() => this.router.navigate(['/home']), 2000);
  }

  /** Navega de volta para a página anterior */
  voltar() {
    this.router.navigate(['/home']);
  }
}
