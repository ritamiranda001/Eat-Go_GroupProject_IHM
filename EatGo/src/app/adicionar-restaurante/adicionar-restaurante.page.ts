import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

  imagensDefault: { [key: string]: string } = {
    'Tradicional': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
    'Gourmet':     'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    'Petiscos':    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
    'Café':        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
    'Italiano':    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
    'Fast Food':   'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
  };

  imagemFallback = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600';

  imagemPreview: string = '';
  sucesso = false;
  erros: string[] = [];

  constructor(
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

  async selecionarImagem() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos // abre galeria diretamente
      });

      if (image.dataUrl) {
        this.imagemPreview = image.dataUrl;
        this.novoRestaurante.imagem = image.dataUrl;
      }
    } catch (err) {
      // utilizador cancelou ou negou permissão
      console.log('Seleção de imagem cancelada:', err);
    }
  }

  selecionarPreco(p: string) {
    this.novoRestaurante.nivelPreco = p as '$' | '$$' | '$$$';
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

    // Verificar nome duplicado
    const nomeTrimmed = this.novoRestaurante.nome.trim().toLowerCase();
    const existente = await new Promise<boolean>((resolve) => {
      this.restauranteService.getAll().subscribe({
        next: (lista) => {
          const duplicado = lista.some(r => r.nome.trim().toLowerCase() === nomeTrimmed);
          resolve(duplicado);
        },
        error: () => resolve(false)
      });
    });

    if (existente) {
      this.erros.push('Já existe um restaurante com esse nome.');
      return;
    }

    // Imagem final
    const imagemFinal = this.novoRestaurante.imagem.trim()
      || this.imagensDefault[this.novoRestaurante.categoria]
      || this.imagemFallback;

    const restaurante: Restaurante = {
      id: 0,
      nome: this.novoRestaurante.nome,
      categoria: this.novoRestaurante.categoria,
      descricao: this.novoRestaurante.descricao,
      localizacao: this.novoRestaurante.localizacao,
      nivelPreco: this.novoRestaurante.nivelPreco,
      imagem: imagemFinal,
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