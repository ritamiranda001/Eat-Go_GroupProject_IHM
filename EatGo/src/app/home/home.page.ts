import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

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

  resultados: Restaurante[] = [
    {
      id: 1,
      nome: 'Smash Burger Co.',
      categoria: 'Fast Food',
      descricao: 'Os melhores hambúrgueres smash da cidade, feitos na hora com ingredientes frescos.',
      morada: 'Cais do Sodré, Lisboa',
      distancia: 0.8,
      rating: 4.5,
      preco: '$',
      avaliacoes: 312,
      imagem: 'assets/images/smash-burger.jpg',
    },
    {
      id: 2,
      nome: 'Yami Sushi',
      categoria: 'Outros',
      descricao: 'Sushi de fusão num ambiente vibrante com ingredientes de alta qualidade.',
      morada: 'Parque das Nações, Lisboa',
      distancia: 5.4,
      rating: 4.6,
      preco: '$$$',
      avaliacoes: 420,
      imagem: 'assets/images/yami-sushi.jpg',
    },
    {
      id: 3,
      nome: 'Café da Esquina',
      categoria: 'Café',
      descricao: 'Brunch incrível e os melhores pastéis de nata da zona.',
      morada: 'Príncipe Real, Lisboa',
      distancia: 1.2,
      rating: 4.3,
      preco: '$',
      avaliacoes: 189,
      imagem: 'assets/images/cafe-esquina.jpg',
    },
    {
      id: 4,
      nome: 'Sweet Tooth',
      categoria: 'Pastelaria',
      descricao: 'Bolos artesanais, tartes de fruta e cheesecakes que vão fazer-te sorrir.',
      morada: 'Chiado, Lisboa',
      distancia: 2.1,
      rating: 4.7,
      preco: '$$',
      avaliacoes: 256,
      imagem: 'assets/images/sweet-tooth.jpg',
    },
    {
      id: 5,
      nome: 'Nonna Trattoria',
      categoria: 'Italiano',
      descricao: 'Autêntica cozinha italiana da avó: massas frescas, risotto e muito amor.',
      morada: 'Intendente, Lisboa',
      distancia: 3.0,
      rating: 4.4,
      preco: '$$',
      avaliacoes: 98,
      imagem: 'assets/images/nonna-trattoria.jpg',
    },
    {
      id: 6,
      nome: 'Bistro Central',
      categoria: 'Bistro',
      descricao: 'Pratos mediterrânicos frescos num espaço acolhedor e com música ao vivo.',
      morada: 'Avenida da Liberdade, Lisboa',
      distancia: 1.7,
      rating: 4.2,
      preco: '$$',
      avaliacoes: 143,
      imagem: 'assets/images/bistro-central.jpg',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  verDetalhe(restaurante: Restaurante) {
    this.router.navigate(['/restaurante-detalhe', restaurante.id]);
  }

  avaliar(event: Event, restaurante: Restaurante) {
    event.stopPropagation();
    this.router.navigate(['/avaliar', restaurante.id]);
  }

  verMapa(event: Event, restaurante: Restaurante) {
    event.stopPropagation();
    console.log('Ver mapa:', restaurante.nome);
  }

  partilhar(event: Event, restaurante: Restaurante) {
    event.stopPropagation();
    console.log('Partilhar:', restaurante.nome);
  }

  abrirFiltros() {
    console.log('Abrir filtros');
  }

  abrirOrdenacao() {
    console.log('Abrir ordenação');
  }

  verMaisResultados() {
    console.log('Ver mais resultados');
  }
}