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
  standalone: false
})
export class RestauranteDetalhePage implements OnInit, AfterViewInit, OnDestroy {

  restaurante: Restaurante | undefined;
  avaliacoes: Avaliacao[] = [];

  private mapa: L.Map | undefined;
  private mapaIniciado = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restauranteService: RestauranteService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.restauranteService.getById(id).subscribe({
      next: async (r) => {
        this.restaurante = r;
        await this.carregarAvaliacoes(id);
        // Tenta iniciar o mapa depois de ter os dados
        setTimeout(() => this.iniciarMapa(), 300);
      },
      error: (err) => console.error('Erro ao carregar restaurante:', err)
    });
  }

  ngAfterViewInit() {
    // Garante ícones corretos do Leaflet (necessário com bundlers)
    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  ngOnDestroy() {
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = undefined;
      this.mapaIniciado = false;
    }
  }

  iniciarMapa() {
    // Só inicia se tiver coordenadas e ainda não tiver iniciado
    if (this.mapaIniciado || !this.restaurante?.coordenadas) return;

    const el = document.getElementById('mapa-restaurante');
    if (!el) return;

    const { lat, lng } = this.restaurante.coordenadas;

    this.mapa = L.map('mapa-restaurante', {
      center: [lat, lng],
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(this.mapa);

    L.marker([lat, lng])
      .addTo(this.mapa)
      .bindPopup(`<b>${this.restaurante.nome}</b><br>${this.restaurante.localizacao}`)
      .openPopup();

    this.mapaIniciado = true;
  }

  async carregarAvaliacoes(restauranteId: number) {
    this.avaliacoes = [];

    await this.storage.forEach((valor, chave) => {
      if (chave.startsWith('avaliacao_') && valor.restauranteId === restauranteId) {
        this.avaliacoes.push(valor);
      }
    });

    if (this.restaurante && (this.restaurante as any).avaliacoesList) {
      const avaliacoesJSON = (this.restaurante as any).avaliacoesList as Avaliacao[];
      this.avaliacoes = [...avaliacoesJSON, ...this.avaliacoes];
    }
  }

  voltar() { this.router.navigate(['/home']); }
  avaliar() { this.router.navigate(['/avaliar', this.restaurante?.id]); }

  getEstrelasArray(n: number): number[] {
    return Array(Math.round(n)).fill(0);
  }
}