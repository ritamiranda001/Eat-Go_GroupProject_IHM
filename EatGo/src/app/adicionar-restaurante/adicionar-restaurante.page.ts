import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  selecionarPreco(p: string) {
    this.novoRestaurante.nivelPreco = p as '$' | '$$' | '$$$';
  }

  categorias = ['Tradicional', 'Gourmet', 'Petiscos', 'Café', 'Italiano', 'Fast Food'];

  imagemPreview: string = '';
  sucesso = false;
  erros: string[] = [];

  constructor(private router: Router) {}

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

  submeter() {
    if (!this.validar()) return;
    console.log('Novo restaurante:', this.novoRestaurante);
    this.sucesso = true;
    setTimeout(() => this.router.navigate(['/home']), 2000);
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}