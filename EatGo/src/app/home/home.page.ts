import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante.model';

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
  ordenacaoAtual: 'alfabetica' | 'distancia' = 'distancia';

  categorias = [
    { valor: 'todos',       icone: 'restaurant-outline' },
    { valor: 'Tradicional', icone: 'fish-outline' },
    { valor: 'Gourmet',     icone: 'wine-outline' },
    { valor: 'Café',        icone: 'cafe-outline' },
    { valor: 'Petiscos',    icone: 'beer-outline' },
  ];

  resultados: Restaurante[] = [];

  get resultadosFiltrados(): Restaurante[] {
    let lista = this.resultados.filter(r => {
      const porAvaliacao = this.filtroAvaliacao === 'todos' || Math.floor(r.avaliacao) >= parseInt(this.filtroAvaliacao);
      const porCategoria = this.filtroCategoria === 'todos' || r.categoria === this.filtroCategoria;
      const porPesquisa = this.termoPesquisa === '' ||
        r.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.categoria.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.localizacao.toLowerCase().includes(this.termoPesquisa.toLowerCase());
      return porAvaliacao && porCategoria && porPesquisa;
    });

    if (this.ordenacaoAtual === 'alfabetica') {
      lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      lista = [...lista].sort((a, b) => a.distancia - b.distancia);
    }

    return lista;
  }

  constructor(private router: Router, private restauranteService: RestauranteService) {}

  ngOnInit() {
    this.restauranteService.getAll().subscribe({
      next: (data) => this.resultados = data,
      error: (err) => console.error('Erro ao carregar restaurantes:', err)
    });
  }

  toggleFiltros() { this.mostrarFiltros = !this.mostrarFiltros; }
  togglePesquisa() { this.mostrarPesquisa = !this.mostrarPesquisa; if (!this.mostrarPesquisa) this.termoPesquisa = ''; }
  selecionarAvaliacao(v: string) { this.filtroAvaliacao = v; }
  selecionarCategoria(v: string) { this.filtroCategoria = v; }
  toggleOrdenacao() { this.ordenacaoAtual = this.ordenacaoAtual === 'distancia' ? 'alfabetica' : 'distancia'; }

  verDetalhe(restaurante: Restaurante) { this.router.navigate(['/restaurante-detalhe', restaurante.id]); }
  avaliar(event: Event, restaurante: Restaurante) { event.stopPropagation(); this.router.navigate(['/avaliar', restaurante.id]); }
  verMapa(event: Event, restaurante: Restaurante) { event.stopPropagation(); console.log('Ver mapa:', restaurante.nome); }
  partilhar(event: Event, restaurante: Restaurante) { event.stopPropagation(); console.log('Partilhar:', restaurante.nome); }
  verMaisResultados() { console.log('Ver mais resultados'); }
}