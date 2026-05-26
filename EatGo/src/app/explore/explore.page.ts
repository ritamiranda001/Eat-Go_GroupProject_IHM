/**
 * explore.page.ts
 * Página de exploração de restaurantes com pesquisa e filtros.
 * Requisito 3: Routing aplicado na navegação
 * Requisito 4: Angular Router + ActivatedRoute
 * Requisito 5: Passar parâmetros entre páginas
 * Requisito 15: Lógica isolada em Services
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

/** Interface local compatível com o modelo da Rita */
interface Restaurante {
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
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: false,
})
export class ExplorePage implements OnInit {

  /** Texto introduzido na barra de pesquisa */
  searchQuery: string = '';

  /** Lista completa de restaurantes carregada do JSON */
  allRestaurants: Restaurante[] = [];

  /** Lista filtrada e apresentada na UI */
  filteredRestaurants: Restaurante[] = [];

  /** Categorias com filtro ativo */
  activeFilters: string[] = [];

  /** Flag: se está ordenado por distância */
  sortedByDistance: boolean = false;

  /** Flag: se existem mais resultados para carregar */
  hasMoreResults: boolean = false;

  /** Flag: se o menu lateral está aberto */
  menuAberto: boolean = false;

  /** Flag: se o utilizador está autenticado */
  isLoggedIn: boolean = false;

  /** Número de restaurantes visíveis por página */
  private readonly PAGE_SIZE = 6;

  /** Página atual para paginação */
  private currentPage: number = 1;

  /** Dados dos restaurantes (compatível com o modelo da Rita) */
  private restaurantesData: Restaurante[] = [
    { id: 1, nome: 'Smash Burger Co.', categoria: 'Fast Food', descricao: 'Os melhores hambúrgueres smash da cidade, feitos na hora com ingredientes frescos.', morada: 'Cais do Sodré, Lisboa', distancia: 0.8, rating: 4.5, preco: '$', avaliacoes: 312, imagem: 'assets/images/smash-burger.jpg' },
    { id: 2, nome: 'Yami Sushi', categoria: 'Outros', descricao: 'Sushi de fusão num ambiente vibrante com ingredientes de alta qualidade.', morada: 'Parque das Nações, Lisboa', distancia: 5.4, rating: 4.6, preco: '$$$', avaliacoes: 420, imagem: 'assets/images/yami-sushi.jpg' },
    { id: 3, nome: 'Café da Esquina', categoria: 'Café', descricao: 'Brunch incrível e os melhores pastéis de nata da zona.', morada: 'Príncipe Real, Lisboa', distancia: 1.2, rating: 4.3, preco: '$', avaliacoes: 189, imagem: 'assets/images/cafe-esquina.jpg' },
    { id: 4, nome: 'Sweet Tooth', categoria: 'Pastelaria', descricao: 'Bolos artesanais, tartes de fruta e cheesecakes que vão fazer-te sorrir.', morada: 'Chiado, Lisboa', distancia: 2.1, rating: 4.7, preco: '$$', avaliacoes: 256, imagem: 'assets/images/sweet-tooth.jpg' },
    { id: 5, nome: 'Nonna Trattoria', categoria: 'Italiano', descricao: 'Autêntica cozinha italiana da avó: massas frescas, risotto e muito amor.', morada: 'Intendente, Lisboa', distancia: 3.0, rating: 4.4, preco: '$$', avaliacoes: 98, imagem: 'assets/images/nonna-trattoria.jpg' },
    { id: 6, nome: 'Bistro Central', categoria: 'Bistro', descricao: 'Pratos mediterrânicos frescos num espaço acolhedor e com música ao vivo.', morada: 'Avenida da Liberdade, Lisboa', distancia: 1.7, rating: 4.2, preco: '$$', avaliacoes: 143, imagem: 'assets/images/bistro-central.jpg' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Carrega os dados e verifica autenticação
    this.allRestaurants = this.restaurantesData;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.applyFilters();
  }

  ionViewWillEnter() {
    // Atualiza o estado de login sempre que a página fica ativa
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  /**
   * Aplica pesquisa, filtros e ordenação à lista de restaurantes.
   */
  applyFilters() {
    let result = [...this.allRestaurants];

    // Filtro por texto de pesquisa
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(r =>
        r.nome.toLowerCase().includes(query) ||
        r.categoria.toLowerCase().includes(query) ||
        r.descricao.toLowerCase().includes(query)
      );
    }

    // Filtro por categorias ativas
    if (this.activeFilters.length > 0) {
      result = result.filter(r => this.activeFilters.includes(r.categoria));
    }

    // Ordenação por distância crescente
    if (this.sortedByDistance) {
      result.sort((a, b) => a.distancia - b.distancia);
    }

    // Paginação
    const totalVisivel = this.currentPage * this.PAGE_SIZE;
    this.filteredRestaurants = result.slice(0, totalVisivel);
    this.hasMoreResults = result.length > totalVisivel;
  }

  /**
   * Chamado quando o utilizador escreve na barra de pesquisa.
   */
  onSearch(event: any) {
    this.searchQuery = event.detail.value ?? '';
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Alterna ordenação por distância.
   */
  sortByDistance() {
    this.sortedByDistance = !this.sortedByDistance;
    this.applyFilters();
  }

  /**
   * Abre o action sheet para filtrar por categoria.
   * Requisito 11: Ionic Components (ActionSheet)
   */
  async openFilters() {
    const categorias = [...new Set(this.allRestaurants.map(r => r.categoria))];

    const botoes = categorias.map(cat => ({
      text: cat,
      handler: () => {
        if (!this.activeFilters.includes(cat)) {
          this.activeFilters.push(cat);
          this.currentPage = 1;
          this.applyFilters();
        }
      }
    }));

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Filtrar por categoria',
      buttons: [
        ...botoes,
        {
          text: 'Limpar filtros',
          role: 'destructive',
          handler: () => {
            this.activeFilters = [];
            this.currentPage = 1;
            this.applyFilters();
          }
        },
        { text: 'Cancelar', role: 'cancel' }
      ]
    });

    await actionSheet.present();
  }

  /**
   * Remove um filtro de categoria ativo.
   */
  removeFilter(filtro: string) {
    this.activeFilters = this.activeFilters.filter(f => f !== filtro);
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Carrega mais restaurantes (paginação).
   */
  loadMore() {
    this.currentPage++;
    this.applyFilters();
  }

  /**
   * Navega para o detalhe do restaurante.
   * Requisito 5: passar parâmetro :id na rota
   */
  goToRestaurant(id: number) {
    this.router.navigate(['/restaurante-detalhe', id]);
  }

  /**
   * Navega para a página de avaliação.
   * Verifica autenticação antes de avaliar.
   * Requisito 5: passar parâmetro :id na rota
   */
  goToAvaliar(id: number, event: Event) {
    event.stopPropagation();
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/avaliar', id]);
  }

  /**
   * Abre a localização no Google Maps.
   */
  openMap(restaurante: Restaurante, event: Event) {
    event.stopPropagation();
    const url = `https://maps.google.com/?q=${encodeURIComponent(restaurante.morada)}`;
    window.open(url, '_blank');
  }

  /**
   * Partilha o restaurante via Web Share API.
   * Requisito 12: Capacitor para controlo do dispositivo
   */
  async shareRestaurant(restaurante: Restaurante, event: Event) {
    event.stopPropagation();
    if (navigator.share) {
      await navigator.share({
        title: restaurante.nome,
        text: restaurante.descricao,
        url: window.location.href
      });
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Partilha não suportada neste dispositivo.',
        duration: 2000,
        color: 'warning',
        position: 'bottom'
      });
      await toast.present();
    }
  }

  /**
   * Alterna a visibilidade do menu lateral.
   */
  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  /**
   * Termina a sessão do utilizador.
   */
  async logout() {
    await this.authService.logout();
    this.isLoggedIn = false;
  }

  /**
   * TrackBy para otimizar a renderização do *ngFor.
   */
  trackById(index: number, restaurante: Restaurante): number {
    return restaurante.id;
  }
}