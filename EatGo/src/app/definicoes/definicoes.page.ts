import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-definicoes',
  templateUrl: './definicoes.page.html',
  styleUrls: ['./definicoes.page.scss'],
  standalone: false
})
export class DefinicoesPage implements OnInit {

  modoEscuro = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Restaura preferência guardada
    const guardado = localStorage.getItem('eat_go_modo_escuro');
    this.modoEscuro = guardado === 'true';
    this.aplicarTema(this.modoEscuro);
  }

  toggleModoEscuro() {
    this.modoEscuro = !this.modoEscuro;
    this.aplicarTema(this.modoEscuro);
    localStorage.setItem('eat_go_modo_escuro', String(this.modoEscuro));
  }

  private aplicarTema(escuro: boolean) {
  document.documentElement.classList.toggle('ion-palette-dark', escuro);
}

  voltar() {
    this.router.navigate(['/home']);
  }
}
