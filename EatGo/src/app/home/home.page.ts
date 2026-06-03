import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante.model';
import { Avaliacao } from '../models/avaliacao.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  // Referência ao input nativo da pesquisa para dar foco automático
  @ViewChild('searchbar') searchbarRef!: ElementRef<HTMLInputElement>;

  mostrarFiltros = false;    // Controla a visibilidade do painel de filtros
  mostrarPesquisa = false;   // Controla a visibilidade da barra de pesquisa
  termoPesquisa = '';        // Texto introduzido na pesquisa
  filtroAvaliacao = 'todos'; // Filtro de avaliação ativo ('todos' ou '1'-'5')
  filtroCategoria = 'todos'; // Filtro de categoria ativo ('todos' ou nome da categoria)
  ordenacaoAtual: 'az' | 'za' = 'az'; // Ordenação atual da lista
  limite = 5; // Número de restaurantes visíveis (aumenta com "Ver mais")

  // Categorias disponíveis para filtrar — incluindo "todos" como opção de reset
  categorias = [
    { valor: 'todos',       icone: 'restaurant-outline' },
    { valor: 'Tradicional', icone: 'fish-outline' },
    { valor: 'Gourmet',     icone: 'wine-outline' },
    { valor: 'Café',        icone: 'cafe-outline' },
    { valor: 'Petiscos',    icone: 'beer-outline' },
  ];

  resultados: Restaurante[] = [];                      // Lista completa de restaurantes carregados
  avaliacoesMap: Map<number, Avaliacao[]> = new Map(); // Mapa de avaliações locais por ID de restaurante

  // Filtra um restaurante com base na avaliação selecionada
  // Cada nível corresponde a um intervalo específico de estrelas
  private filtrarPorAvaliacao(r: Restaurante): boolean {
    if (this.filtroAvaliacao === 'todos') return true;
    const av = this.getAvaliacao(r);
    const filtro = parseInt(this.filtroAvaliacao);
    if (filtro === 5) return av >= 5.0;               // Exatamente 5 estrelas
    if (filtro === 1) return av >= 0.0 && av < 2.0;  // Entre 0.0 e 1.9
    return av >= filtro && av < filtro + 1;           // Ex: 4 → entre 4.0 e 4.9
  }

  // Lista filtrada, ordenada e limitada de restaurantes para exibição
  get resultadosFiltrados(): Restaurante[] {
    let lista = this.resultados.filter(r => {
      const porAvaliacao = this.filtrarPorAvaliacao(r);
      const porCategoria = this.filtroCategoria === 'todos' || r.categoria === this.filtroCategoria;
      // Pesquisa por nome, categoria ou localização (case-insensitive)
      const porPesquisa = this.termoPesquisa === '' ||
        r.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.categoria.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.localizacao.toLowerCase().includes(this.termoPesquisa.toLowerCase());
      return porAvaliacao && porCategoria && porPesquisa;
    });

    // Ordenação alfabética A-Z ou Z-A
    if (this.ordenacaoAtual === 'az') {
      lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      lista = [...lista].sort((a, b) => b.nome.localeCompare(a.nome));
    }

    // Aplica o limite de resultados visíveis
    return lista.slice(0, this.limite);
  }

  // Total de restaurantes que correspondem aos filtros ativos (sem limite)
  get totalFiltrados(): number {
    return this.resultados.filter(r => {
      const porAvaliacao = this.filtrarPorAvaliacao(r);
      const porCategoria = this.filtroCategoria === 'todos' || r.categoria === this.filtroCategoria;
      const porPesquisa = this.termoPesquisa === '' ||
        r.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.categoria.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.localizacao.toLowerCase().includes(this.termoPesquisa.toLowerCase());
      return porAvaliacao && porCategoria && porPesquisa;
    }).length;
  }

  constructor(
    private router: Router,
    private restauranteService: RestauranteService,
    private storage: Storage
  ) {}

  ngOnInit() {}

  // Executado sempre que a página fica visível — recarrega dados atualizados
  async ionViewWillEnter() {
    await this.storage.create(); // Inicializa o storage local

    // Carrega todos os restaurantes da API
    this.restauranteService.getAll().subscribe({
      next: async (data) => {
        this.resultados = data;
        await this.carregarAvaliacoes(); // Carrega avaliações locais após obter restaurantes
      },
      error: (err) => console.error('Erro ao carregar restaurantes:', err)
    });
  }

  // Lê todas as avaliações guardadas localmente e organiza-as por ID de restaurante
  async carregarAvaliacoes() {
    this.avaliacoesMap = new Map();
    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_')) {
        const av: Avaliacao = valor;
        const lista = this.avaliacoesMap.get(av.restauranteId) || [];
        lista.push(av);
        this.avaliacoesMap.set(av.restauranteId, lista);
      }
    });
  }

  // Calcula a avaliação média de um restaurante
  // Combina avaliações do JSON (dados estáticos) com avaliações locais do utilizador
  getAvaliacao(restaurante: Restaurante): number {
    const avaliacoesStorage = this.avaliacoesMap.get(restaurante.id) || [];
    const avaliacoesJSON = (restaurante as any).avaliacoesList || [];
    const todas = [...avaliacoesJSON, ...avaliacoesStorage];

    // Se não houver avaliações, usa o valor padrão do restaurante
    if (todas.length === 0) return restaurante.avaliacao || 0;

    // Calcula a média arredondada a 1 casa decimal
    const soma = todas.reduce((acc: number, av: Avaliacao) => acc + av.estrelas, 0);
    return Math.round((soma / todas.length) * 10) / 10;
  }

  // Retorna o número total de avaliações de um restaurante (JSON + storage local)
  getTotalAvaliacoes(restaurante: Restaurante): number {
    const avaliacoesStorage = this.avaliacoesMap.get(restaurante.id) || [];
    const avaliacoesJSON = (restaurante as any).avaliacoesList || [];
    return avaliacoesJSON.length + avaliacoesStorage.length;
  }

  // Alterna a visibilidade do painel de filtros
  toggleFiltros() { this.mostrarFiltros = !this.mostrarFiltros; }

  // Alterna a visibilidade da barra de pesquisa
  // Ao abrir, dá foco automático ao input; ao fechar, limpa o termo
  togglePesquisa() {
    this.mostrarPesquisa = !this.mostrarPesquisa;
    if (!this.mostrarPesquisa) {
      this.termoPesquisa = '';
    } else {
      // Pequeno delay para garantir que o elemento já está renderizado no DOM
      setTimeout(() => this.searchbarRef?.nativeElement?.focus(), 150);
    }
  }

  // Seleciona ou desseleciona um filtro de avaliação (clique duplo remove o filtro)
  selecionarAvaliacao(v: string) { this.filtroAvaliacao = this.filtroAvaliacao === v ? 'todos' : v; }

  // Define a categoria selecionada para filtrar
  selecionarCategoria(v: string) { this.filtroCategoria = v; }

  // Alterna entre ordenação A-Z e Z-A
  toggleOrdenacao() { this.ordenacaoAtual = this.ordenacaoAtual === 'az' ? 'za' : 'az'; }

  // Aumenta o número de restaurantes visíveis em 5
  verMaisResultados() { this.limite += 5; }

  // Navega para a página de avaliação do restaurante selecionado
  avaliar(event: Event, restaurante: Restaurante) {
    event.stopPropagation(); // Impede que o clique propague para o cartão
    this.router.navigate(['/avaliar', restaurante.id]);
  }

  // Navega para a página de detalhe do restaurante
  verDetalhe(restaurante: Restaurante) {
    this.router.navigate(['/restaurante-detalhe', restaurante.id]);
  }

  // Navega para o detalhe do restaurante (anteriormente abria o mapa)
  verMapa(event: Event, restaurante: Restaurante) {
    event.stopPropagation(); // Impede propagação do clique
    this.router.navigate(['/restaurante-detalhe', restaurante.id]);
  }

  // Partilha as informações do restaurante via API nativa ou copia para clipboard
  async partilhar(event: Event, restaurante: Restaurante) {
    event.stopPropagation(); // Impede propagação do clique para o cartão

    // Texto formatado com os dados do restaurante
    const texto = `🍽️ ${restaurante.nome} — ${restaurante.categoria} • ${restaurante.nivelPreco}\n📍 ${restaurante.localizacao}\n⭐ ${this.getAvaliacao(restaurante)} estrelas\n\nDescoberto na app Eat&Go!`;

    // Tenta usar a Web Share API (disponível em dispositivos móveis)
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurante.nome,
          text: texto
        });
      } catch {
        // Utilizador cancelou a partilha
      }
      return;
    }

    // Fallback: copia o texto para a área de transferência
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(texto);
        await this.mostrarToast('Informação copiada! Cola onde quiseres partilhar. 📋');
      } catch {
        await this.mostrarToast('A partilha não está disponível neste dispositivo.');
      }
    }
  }

  // Exibe uma mensagem temporária (toast) no fundo do ecrã
  private async mostrarToast(mensagem: string) {
    const toast = document.createElement('ion-toast');
    toast.message = mensagem;
    toast.duration = 3000;  // Visível durante 3 segundos
    toast.position = 'bottom';
    toast.color = 'dark';
    document.body.appendChild(toast);
    await toast.present();
  }
}