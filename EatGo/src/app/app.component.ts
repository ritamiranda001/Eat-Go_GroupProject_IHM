import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public menuPages = [
    { title: 'Minhas Avaliações', url: '/avaliar', icon: 'star-outline' },
    { title: 'Adicionar Restaurante', url: '/adicionar-restaurante', icon: 'add-circle-outline' },
    { title: 'Explorar Mapa', url: '/home', icon: 'search-outline' },
  ];

  constructor(private menuCtrl: MenuController) {}

  fecharMenu() {
    this.menuCtrl.close();
  }
}