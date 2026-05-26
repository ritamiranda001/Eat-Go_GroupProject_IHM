import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante.model';

@Component({
  selector: 'app-restaurante-detalhe',
  templateUrl: './restaurante-detalhe.page.html',
  styleUrls: ['./restaurante-detalhe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RestauranteDetalhePage implements OnInit {

  restaurante: Restaurante | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restauranteService.getById(id).subscribe({
      next: (r) => this.restaurante = r,
      error: (err) => console.error('Erro ao carregar restaurante:', err)
    });
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  avaliar() {
    this.router.navigate(['/avaliar', this.restaurante?.id]);
  }

  getEstrelasArray(avaliacao: number): number[] {
    return Array(Math.round(avaliacao)).fill(0);
  }
}