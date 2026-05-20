import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurante-detalhe',
  templateUrl: './restaurante-detalhe.page.html',
  styleUrls: ['./restaurante-detalhe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RestauranteDetalhePage implements OnInit {
  constructor() { }
  ngOnInit() { }
}