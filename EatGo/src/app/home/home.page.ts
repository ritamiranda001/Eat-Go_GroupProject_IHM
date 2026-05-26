import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

export interface Restaurante {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  morada: string;
  distancia: number;
  rating: number;
  preco: string;
  avaliacoes: number;
  imagem: string;
}

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

 resultados: Restaurante[] = [
  { id: 1, nome: 'O Pescador', categoria: 'Tradicional', descricao: 'Especializado em arroz de tamboril, feijoada de marisco e peixe grelhado fresquíssimo no centro histórico.', morada: 'Largo São Domingos, Viana do Castelo', distancia: 0.3, rating: 4.5, preco: '$$', avaliacoes: 287, imagem: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600' },
  { id: 2, nome: 'O Tabernão', categoria: 'Petiscos', descricao: 'Tasca aconchegante com petiscos tradicionais como polvo à galega e mexilhão frio com salsa.', morada: 'Largo Infante Dom Henriques 42, Viana do Castelo', distancia: 0.5, rating: 4.6, preco: '$', avaliacoes: 193, imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600' },
  { id: 3, nome: 'Porta 93', categoria: 'Gourmet', descricao: 'Restaurante de autor da Chef Mariana, com pratos criativos feitos com ingredientes locais.', morada: 'Av. Conde Carreira 28, Viana do Castelo', distancia: 0.8, rating: 4.8, preco: '$$$', avaliacoes: 142, imagem: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600' },
  { id: 4, nome: 'Adega do Padrinho', categoria: 'Tradicional', descricao: 'Numa rua típica do centro histórico, cozinha minhota autêntica com bacalhau e pratos regionais.', morada: 'Centro Histórico, Viana do Castelo', distancia: 0.4, rating: 4.3, preco: '$', avaliacoes: 98, imagem: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600' },
  { id: 5, nome: "D'Amore Café", categoria: 'Café', descricao: 'Café charmoso com esplanada encantadora, perfeito para pequenos-almoços e brunchs.', morada: 'R. Mateus Barbosa 23, Viana do Castelo', distancia: 0.6, rating: 4.4, preco: '$', avaliacoes: 215, imagem: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600' },
  { id: 6, nome: 'A Petisqueira', categoria: 'Petiscos', descricao: 'Espaço descontraído especializado em petiscos portugueses para partilhar, com serviço caloroso.', morada: 'Centro, Viana do Castelo', distancia: 1.0, rating: 4.5, preco: '$$', avaliacoes: 176, imagem: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600' },
];

  get resultadosFiltrados(): Restaurante[] {
    let lista = this.resultados.filter(r => {
      const porAvaliacao = this.filtroAvaliacao === 'todos' || Math.floor(r.rating) >= parseInt(this.filtroAvaliacao);
      const porCategoria = this.filtroCategoria === 'todos' || r.categoria === this.filtroCategoria;
      const porPesquisa = this.termoPesquisa === '' ||
        r.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.categoria.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
        r.morada.toLowerCase().includes(this.termoPesquisa.toLowerCase());
      return porAvaliacao && porCategoria && porPesquisa;
    });

    if (this.ordenacaoAtual === 'alfabetica') {
      lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      lista = [...lista].sort((a, b) => a.distancia - b.distancia);
    }

    return lista;
  }

  constructor(private router: Router) {}
  ngOnInit() {}

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