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

  restaurante: Restaurante | undefined; // Restaurante a ser avaliado
  estrelasAtivas = 0;                   // Número de estrelas selecionadas (0 = nenhuma)
  comentario = '';                      // Texto do comentário da avaliação
  sucesso = false;                      // Controla a exibição do banner de sucesso
  erro = '';                            // Mensagem de erro de validação
  anonimo = false;                      // Se true, publica a avaliação como anónimo
  readonly estrelas = [1, 2, 3, 4, 5]; // Array fixo para gerar os 5 ícones de estrelas

  constructor(
    private route: ActivatedRoute,          // Para obter o ID do restaurante da URL
    private router: Router,                 // Para navegar entre páginas
    private restauranteService: RestauranteService, // Serviço de restaurantes
    private storage: Storage,              // Armazenamento local das avaliações
    private authService: AuthService       // Serviço de autenticação para obter o utilizador atual
  ) {}

  // Inicializa a página — carrega o restaurante com base no ID da URL
  async ngOnInit() {
    await this.storage.create(); // Inicializa o storage local

    // Obtém o ID do restaurante a partir dos parâmetros da rota
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Carrega os dados do restaurante pelo ID
    this.restauranteService.getById(id).subscribe({
      next: (r) => this.restaurante = r,
      error: (err) => console.error('Erro ao carregar restaurante:', err)
    });
  }

  // Atualiza o número de estrelas selecionadas
  selecionarEstrelas(n: number) { this.estrelasAtivas = n; }

  // Valida e submete a avaliação
  async submeter() {
    this.erro = '';

    // Validação: obriga a selecionar pelo menos 1 estrela
    if (this.estrelasAtivas === 0) {
      this.erro = 'Por favor seleciona uma classificação.';
      return;
    }

    // Validação: comentário deve ter pelo menos 5 caracteres
    if (this.comentario.trim().length < 5) {
      this.erro = 'O comentário deve ter pelo menos 5 caracteres.';
      return;
    }

    // Define o nome do autor — anónimo ou nome do utilizador autenticado
    const utilizadorAtual = this.authService.getUtilizador();
    const nomeUtilizador = this.anonimo
      ? 'Utilizador Anónimo'
      : (utilizadorAtual?.nome || 'Utilizador Anónimo');

    // Constrói o objeto de avaliação
    const avaliacao: Avaliacao = {
      restauranteId: this.restaurante!.id,
      restauranteNome: this.restaurante!.nome,
      estrelas: this.estrelasAtivas,
      comentario: this.comentario.trim(),
      data: new Date().toLocaleDateString('pt-PT'), // Data formatada em português
      utilizador: nomeUtilizador
    };

    // Guarda a avaliação no storage local com uma chave única (restauranteId + timestamp)
    const chave = `avaliacao_${this.restaurante!.id}_${Date.now()}`;
    await this.storage.set(chave, avaliacao);

    // Mostra o banner de sucesso e redireciona para a home após 2 segundos
    this.sucesso = true;
    setTimeout(() => this.router.navigate(['/home']), 2000);
  }

  // Navega de volta para a página inicial
  voltar() { this.router.navigate(['/home']); }
}