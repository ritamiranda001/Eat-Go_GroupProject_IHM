import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-definicoes',
  templateUrl: './definicoes.page.html',
  styleUrls: ['./definicoes.page.scss'],
  standalone: false
})
export class DefinicoesPage implements OnInit {

  modoEscuro = false; // Estado atual do modo escuro (true = ativo)

  constructor(private router: Router) {}

  // Inicializa a página — restaura a preferência de tema guardada anteriormente
  ngOnInit() {
    // Lê a preferência guardada no localStorage
    const guardado = localStorage.getItem('eat_go_modo_escuro');
    this.modoEscuro = guardado === 'true';

    // Aplica o tema correspondente ao carregar a página
    this.aplicarTema(this.modoEscuro);
  }

  // Alterna entre modo claro e escuro e guarda a preferência
  toggleModoEscuro() {
    this.modoEscuro = !this.modoEscuro;

    // Aplica o tema visualmente
    this.aplicarTema(this.modoEscuro);

    // Guarda a preferência no localStorage para persistir entre sessões
    localStorage.setItem('eat_go_modo_escuro', String(this.modoEscuro));
  }

  // Adiciona ou remove a classe do tema escuro no elemento raiz do documento
  private aplicarTema(escuro: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', escuro);
  }

  // Navega de volta para a página inicial
  voltar() {
    this.router.navigate(['/home']);
  }
}