import { Component, OnInit } from '@angular/core';
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

  mostrarFiltros = false;
  mostrarPesquisa = false;
  termoPesquisa = '';
  filtroAvaliacao = 'todos';
  filtroCategoria = 'todos';
  ordenacaoAtual: 'az' | 'za' = 'az';
  limite = 5;

  categorias = [
    { valor: 'todos',       icone: 'restaurant-outline' },
    { valor: 'Tradicional', icone: 'fish-outline' },
    { valor: 'Gourmet',     icone: 'wine-outline' },
    { valor: 'Café',        icone: 'cafe-outline' },
    { valor: 'Petiscos',    icone: 'beer-outline' },
  ];

  resultados: Restaurante[] = [];
  avaliacoesMap: Map<number, Avaliacao[]> = new Map();

  private filtrarPorAvaliacao(r: Restaurante): boolean {
    if (this.filtroAvaliacao === 'todos') return true;
    const av = this.getAvaliacao(r);
    const filtro = parseInt(this.filtroAvaliacao);
    if (filtro === 5) return av >= 5.0;
    if (filtro === 1) return av >= 0.0 && av < 2.0;
    return av >= filtro && av < filtro + 1;
  }

  get resultadosFiltrados(): Restaurante[] {
    let lista = this.resultados.filter(r => {
      const porAvaliacao = this.filtrarPorAvaliacao(r);
      const porCategoria = this.filtroCategoria === 'todos' || r.categoria === this.filtroCategoria;
      const porPesquisa = this.termoPesquisa === '' ||
        r.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.categoria.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.localizacao.toLowerCase().includes(this.termoPesquisa.toLowerCase());
      return porAvaliacao && porCategoria && porPesquisa;
    });

    if (this.ordenacaoAtual === 'az') {
      lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      lista = [...lista].sort((a, b) => b.nome.localeCompare(a.nome));
    }

    return lista.slice(0, this.limite);
  }

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

  async ionViewWillEnter() {
    await this.storage.create();
    this.restauranteService.getAll().subscribe({
      next: async (data) => {
        this.resultados = data;
        await this.carregarAvaliacoes();
      },
      error: (err) => console.error('Erro ao carregar restaurantes:', err)
    });
  }

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

  getAvaliacao(restaurante: Restaurante): number {
    const avaliacoesStorage = this.avaliacoesMap.get(restaurante.id) || [];
    const avaliacoesJSON = (restaurante as any).avaliacoesList || [];
    const todas = [...avaliacoesJSON, ...avaliacoesStorage];

    if (todas.length === 0) return restaurante.avaliacao || 0;

    const soma = todas.reduce((acc: number, av: Avaliacao) => acc + av.estrelas, 0);
    return Math.round((soma / todas.length) * 10) / 10;
  }

  getTotalAvaliacoes(restaurante: Restaurante): number {
    const avaliacoesStorage = this.avaliacoesMap.get(restaurante.id) || [];
    const avaliacoesJSON = (restaurante as any).avaliacoesList || [];
    return avaliacoesJSON.length + avaliacoesStorage.length;
  }

  toggleFiltros() { this.mostrarFiltros = !this.mostrarFiltros; }
  togglePesquisa() { this.mostrarPesquisa = !this.mostrarPesquisa; if (!this.mostrarPesquisa) this.termoPesquisa = ''; }
  selecionarAvaliacao(v: string) { this.filtroAvaliacao = this.filtroAvaliacao === v ? 'todos' : v; }
  selecionarCategoria(v: string) { this.filtroCategoria = v; }
  toggleOrdenacao() { this.ordenacaoAtual = this.ordenacaoAtual === 'az' ? 'za' : 'az'; }
  verMaisResultados() { this.limite += 5; }

  avaliar(event: Event, restaurante: Restaurante) { event.stopPropagation(); this.router.navigate(['/avaliar', restaurante.id]); }

  verDetalhe(restaurante: Restaurante) {
    this.router.navigate(['/restaurante-detalhe', restaurante.id]);
  }

  verMapa(event: Event, restaurante: Restaurante) {
    event.stopPropagation();
    this.router.navigate(['/restaurante-detalhe', restaurante.id]);
  }

  async partilhar(event: Event, restaurante: Restaurante) {
    event.stopPropagation();

    const texto = `🍽️ ${restaurante.nome} — ${restaurante.categoria} • ${restaurante.nivelPreco}\n📍 ${restaurante.localizacao}\n⭐ ${this.getAvaliacao(restaurante)} estrelas\n\nDescoberto na app Eat&Go!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurante.nome,
          text: texto
        });
      } catch {
        // Utilizador cancelou
      }
      return;
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(texto);
        await this.mostrarToast('Informação copiada! Cola onde quiseres partilhar. 📋');
      } catch {
        await this.mostrarToast('A partilha não está disponível neste dispositivo.');
      }
    }
  }

  private async mostrarToast(mensagem: string) {
    const toast = document.createElement('ion-toast');
    toast.message = mensagem;
    toast.duration = 3000;
    toast.position = 'bottom';
    toast.color = 'dark';
    document.body.appendChild(toast);
    await toast.present();
  }
}