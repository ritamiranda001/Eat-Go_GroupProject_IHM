/**
 * restaurante-detalhe.page.ts
 * Página de detalhe de um restaurante.
 * Mostra informações completas, mapa Leaflet de localização
 * e lista de avaliações combinando o JSON e o Ionic Storage.
 * Requisito 9: Ionic Storage | Requisito 10: Ficheiros JSON
 * Requisito 11: Leaflet para mapa de localização
 */
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante.model';
import { Avaliacao } from '../models/avaliacao.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-restaurante-detalhe',
  templateUrl: './restaurante-detalhe.page.html',
  styleUrls: ['./restaurante-detalhe.page.scss'],
  standalone: false // Obrigatório para apps baseadas em NgModules
})
export class RestauranteDetalhePage implements OnInit, AfterViewInit, OnDestroy {

  restaurante: Restaurante | undefined; // Dados do restaurante carregado do JSON
  avaliacoes: Avaliacao[] = [];         // Avaliações combinadas (JSON + Storage)

  private mapa: L.Map | undefined;  // Instância do mapa Leaflet
  private mapaIniciado = false;     // Evita inicializar o mapa mais do que uma vez

  constructor(
    private route: ActivatedRoute,          // Para ler o parâmetro 'id' da rota
    private router: Router,
    private restauranteService: RestauranteService,
    private storage: Storage
  ) {}

  /**
   * Inicializa o Storage, obtém o ID da rota, carrega o restaurante
   * e as suas avaliações. Aguarda 300ms antes de iniciar o mapa,
   * garantindo que o DOM está pronto.
   */
  async ngOnInit() {
    await this.storage.create();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.restauranteService.getById(id).subscribe({
      next: async (r) => {
        this.restaurante = r;
        await this.carregarAvaliacoes(id);
        // Aguarda o DOM renderizar antes de iniciar o mapa Leaflet
        setTimeout(() => this.iniciarMapa(), 300);
      },
      error: (err) => console.error('Erro ao carregar restaurante:', err)
    });
  }

  /**
   * Corrige os ícones do Leaflet após a view estar pronta.
   * Necessário porque bundlers como Webpack/Vite quebram os
   * caminhos padrão dos assets do Leaflet.
   */
  ngAfterViewInit() {
    const iconDefault = L.icon({
      iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize:    [25, 41],
      iconAnchor:  [12, 41],
      popupAnchor: [1, -34],
      shadowSize:  [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  /**
   * Remove o mapa Leaflet ao sair da página,
   * evitando fugas de memória e erros ao reentrar na página.
   */
  ngOnDestroy() {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = undefined;
      this.mapaIniciado = false;
    }
  }

  /**
   * Inicializa o mapa Leaflet com OpenStreetMap centrado
   * nas coordenadas do restaurante e adiciona um marker com popup.
   * Não faz nada se as coordenadas não existirem ou o mapa já estiver ativo.
   */
  iniciarMapa() {
    if (this.mapaIniciado || !this.restaurante?.coordenadas) return;

    const el = document.getElementById('mapa-restaurante');
    if (!el) return;

    const { lat, lng } = this.restaurante.coordenadas;

    this.mapa = L.map('mapa-restaurante', {
      center: [lat, lng],
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false // Desativa zoom com scroll para melhor UX em mobile
    });

    // Camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(this.mapa);

    // Marker com popup a mostrar nome e morada do restaurante
    L.marker([lat, lng])
      .addTo(this.mapa)
      .bindPopup(`<b>${this.restaurante.nome}</b><br>${this.restaurante.localizacao}`)
      .openPopup();

    this.mapaIniciado = true;
  }

  /**
   * Carrega as avaliações de um restaurante combinando duas fontes:
   * 1. Ionic Storage: avaliações submetidas pelo utilizador (chave 'avaliacao_*')
   * 2. JSON: avaliações pré-existentes no ficheiro de dados (avaliacoesList)
   * As avaliações do JSON aparecem primeiro, seguidas das do Storage.
   * Requisito 9: Ionic Storage | Requisito 10: Ficheiros JSON
   */
  async carregarAvaliacoes(restauranteId: number) {
    this.avaliacoes = [];

    // Recolhe do Storage apenas as avaliações deste restaurante
    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_') && valor.restauranteId === restauranteId) {
        this.avaliacoes.push(valor);
      }
    });

    // Combina com as avaliações pré-definidas no JSON (se existirem)
    if (this.restaurante && (this.restaurante as any).avaliacoesList) {
      const avaliacoesJSON = (this.restaurante as any).avaliacoesList as Avaliacao[];
      this.avaliacoes = [...avaliacoesJSON, ...this.avaliacoes];
    }
  }

  /** Navega para a página inicial */
  voltar() { this.router.navigate(['/home']); }

  /** Navega para o formulário de avaliação deste restaurante */
  avaliar() { this.router.navigate(['/avaliar', this.restaurante?.id]); }

  /** Gera um array de N elementos para renderizar estrelas no template */
  getEstrelasArray(n: number): number[] {
    return Array(Math.round(n)).fill(0);
  }
}