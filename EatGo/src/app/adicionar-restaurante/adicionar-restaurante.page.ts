import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante.model';

@Component({
  selector: 'app-adicionar-restaurante',
  templateUrl: './adicionar-restaurante.page.html',
  styleUrls: ['./adicionar-restaurante.page.scss'],
  standalone: false
})
export class AdicionarRestaurantePage {

  novoRestaurante = {
    nome: '',
    categoria: '',
    descricao: '',
    localizacao: '',
    nivelPreco: '$' as '$' | '$$' | '$$$',
    imagem: ''
  };

  categorias = ['Tradicional', 'Gourmet', 'Petiscos', 'Café', 'Italiano', 'Fast Food'];

  imagemPreview: string = '';
  sucesso = false;
  erros: string[] = [];

  constructor(
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

  selecionarPreco(p: string) {
    this.novoRestaurante.nivelPreco = p as '$' | '$$' | '$$$';
  }

  atualizarPreview() {
    this.imagemPreview = this.novoRestaurante.imagem;
  }

  validar(): boolean {
    this.erros = [];
    if (!this.novoRestaurante.nome.trim()) this.erros.push('Nome é obrigatório.');
    if (!this.novoRestaurante.categoria) this.erros.push('Categoria é obrigatória.');
    if (!this.novoRestaurante.descricao.trim()) this.erros.push('Descrição é obrigatória.');
    if (!this.novoRestaurante.localizacao.trim()) this.erros.push('Localização é obrigatória.');
    return this.erros.length === 0;
  }

  async submeter() {
    if (!this.validar()) return;

    const restaurante: Restaurante = {
      id: 0,
      nome: this.novoRestaurante.nome,
      categoria: this.novoRestaurante.categoria,
      descricao: this.novoRestaurante.descricao,
      localizacao: this.novoRestaurante.localizacao,
      nivelPreco: this.novoRestaurante.nivelPreco,
      imagem: this.novoRestaurante.imagem || 'assets/icon/favicon.png',
      distancia: 0,
      avaliacao: 0,
      totalAvaliacoes: 0
    };

    await this.restauranteService.adicionar(restaurante);
    this.sucesso = true;
    setTimeout(() => this.router.navigate(['/home']), 2000);
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}