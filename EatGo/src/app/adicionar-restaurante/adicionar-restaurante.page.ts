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

  // Objeto que armazena os dados do novo restaurante a ser criado
  novoRestaurante = {
    nome: '',
    categoria: '',
    descricao: '',
    localizacao: '',
    nivelPreco: '$' as '$' | '$$' | '$$$',
    imagem: ''
  };

  // Lista de categorias disponíveis para seleção
  categorias = ['Tradicional', 'Gourmet', 'Petiscos', 'Café', 'Italiano', 'Fast Food'];

  // Imagens default por categoria — usadas quando o utilizador não escolhe foto
  imagensDefault: { [key: string]: string } = {
    'Tradicional': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
    'Gourmet':     'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    'Petiscos':    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
    'Café':        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
    'Italiano':    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
    'Fast Food':   'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
  };

  // Imagem de fallback usada quando a categoria não tem imagem default definida
  imagemFallback = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600';

  imagemPreview: string = ''; // URL da imagem para mostrar o preview no formulário
  sucesso = false;            // Controla a exibição do banner de sucesso
  erros: string[] = [];       // Lista de erros de validação

  constructor(
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

  // Abre a galeria do telemóvel para o utilizador escolher uma foto
  async selecionarImagem() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,          // Qualidade da imagem (0-100)
        allowEditing: false,  // Não permite editar a imagem antes de selecionar
        resultType: CameraResultType.DataUrl, // Retorna a imagem em formato base64
        source: CameraSource.Photos           // Abre a galeria (não a câmara)
      });

      // Se a imagem foi selecionada com sucesso, atualiza o preview e o modelo
      if (image.dataUrl) {
        this.imagemPreview = image.dataUrl;
        this.novoRestaurante.imagem = image.dataUrl;
      }
    } catch (err) {
      // Ocorre quando o utilizador cancela ou nega a permissão de acesso à galeria
      console.log('Seleção de imagem cancelada:', err);
    }
  }

  // Define o nível de preço selecionado ($, $$ ou $$$)
  selecionarPreco(p: string) {
    this.novoRestaurante.nivelPreco = p as '$' | '$$' | '$$$';
  }

  // Valida os campos obrigatórios do formulário
  // Retorna true se válido, false se houver erros
  validar(): boolean {
    this.erros = [];
    if (!this.novoRestaurante.nome.trim()) this.erros.push('Nome é obrigatório.');
    if (!this.novoRestaurante.categoria) this.erros.push('Categoria é obrigatória.');
    if (!this.novoRestaurante.descricao.trim()) this.erros.push('Descrição é obrigatória.');
    if (!this.novoRestaurante.localizacao.trim()) this.erros.push('Localização é obrigatória.');
    return this.erros.length === 0;
  }

  // Submete o formulário — valida, verifica duplicados e cria o restaurante
  async submeter() {
    // Interrompe se houver erros de validação
    if (!this.validar()) return;

    // Verifica se já existe um restaurante com o mesmo nome (ignora maiúsculas/minúsculas)
    const nomeTrimmed = this.novoRestaurante.nome.trim().toLowerCase();
    const existente = await new Promise<boolean>((resolve) => {
      this.restauranteService.getAll().subscribe({
        next: (lista) => {
          const duplicado = lista.some(r => r.nome.trim().toLowerCase() === nomeTrimmed);
          resolve(duplicado);
        },
        error: () => resolve(false) // Em caso de erro na chamada, permite continuar
      });
    });

    // Bloqueia a criação se o nome já existir
    if (existente) {
      this.erros.push('Já existe um restaurante com esse nome.');
      return;
    }

    // Define a imagem final:
    // 1. Foto escolhida pelo utilizador
    // 2. Imagem default da categoria
    // 3. Imagem de fallback genérica
    const imagemFinal = this.novoRestaurante.imagem.trim()
      || this.imagensDefault[this.novoRestaurante.categoria]
      || this.imagemFallback;

    // Constrói o objeto restaurante com os dados do formulário
    const restaurante: Restaurante = {
      id: 0,                                    // ID gerado pelo servidor
      nome: this.novoRestaurante.nome,
      categoria: this.novoRestaurante.categoria,
      descricao: this.novoRestaurante.descricao,
      localizacao: this.novoRestaurante.localizacao,
      nivelPreco: this.novoRestaurante.nivelPreco,
      imagem: imagemFinal,
      distancia: 0,         // Distância calculada posteriormente
      avaliacao: 0,         // Sem avaliações inicialmente
      totalAvaliacoes: 0    // Sem avaliações inicialmente
    };

    // Envia o restaurante para o serviço e redireciona para a home após 2 segundos
    await this.restauranteService.adicionar(restaurante);
    this.sucesso = true;
    setTimeout(() => this.router.navigate(['/home']), 2000);
  }

  // Navega de volta para a página inicial
  voltar() {
    this.router.navigate(['/home']);
  }
}