/**
 * login.page.ts
 * Página de autenticação da app Eat&Go.
 * Requisito 4: Angular Router + ActivatedRoute
 * Requisito 9: Guardar informação com recurso ao Ionic Storage (via AuthService)
 * Requisito 15: Lógica isolada em Services
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  /** Modo atual: 'login' ou 'registo' */
  modo: 'login' | 'registo' = 'login';

  /** Email introduzido pelo utilizador */
  email: string = '';

  /** Palavra-passe introduzida */
  palavraPasse: string = '';

  /** Confirmar palavra-passe (só no registo) */
  confirmarPalavraPasse: string = '';

  /** Nome do utilizador (só no registo) */
  nome: string = '';

  /** Flag: lembrar o utilizador */
  lembrarMe: boolean = false;

  /** Flag: mostrar/esconder palavra-passe */
  mostrarPalavraPasse: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  /**
   * Alterna entre modo login e registo.
   */
  toggleModo() {
    this.modo = this.modo === 'login' ? 'registo' : 'login';
    // Limpa os campos ao trocar de modo
    this.email = '';
    this.palavraPasse = '';
    this.confirmarPalavraPasse = '';
    this.nome = '';
  }

  /**
   * Alterna visibilidade da palavra-passe.
   */
  togglePalavraPasse() {
    this.mostrarPalavraPasse = !this.mostrarPalavraPasse;
  }

  /**
   * Executa o login do utilizador.
   * Requisito 9: Ionic Storage via AuthService
   */
  async entrar() {
    // Validação básica dos campos
    if (!this.email || !this.palavraPasse) {
      await this.mostrarToast('Por favor preenche todos os campos.', 'warning');
      return;
    }

    // Mostra loading enquanto autentica
    const loading = await this.loadingCtrl.create({
      message: 'A entrar...',
      duration: 1500
    });
    await loading.present();

    // Chama o serviço de autenticação
    const sucesso = await this.authService.login(this.email, this.palavraPasse);

    await loading.dismiss();

    if (sucesso) {
      await this.mostrarToast('Login efetuado com sucesso!', 'success');
      // Navega para a página explorar após login
      this.router.navigate(['/explorar'], { replaceUrl: true });
    } else {
      await this.mostrarToast('Email ou palavra-passe incorretos.', 'danger');
    }
  }

  /**
   * Executa o registo de um novo utilizador.
   */
  async registar() {
    // Validação dos campos obrigatórios
    if (!this.nome || !this.email || !this.palavraPasse || !this.confirmarPalavraPasse) {
      await this.mostrarToast('Por favor preenche todos os campos.', 'warning');
      return;
    }

    // Verifica se as palavras-passe coincidem
    if (this.palavraPasse !== this.confirmarPalavraPasse) {
      await this.mostrarToast('As palavras-passe não coincidem.', 'danger');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'A criar conta...',
      duration: 1500
    });
    await loading.present();

    // TODO: Integrar com API MongoDB para criar utilizador
    const sucesso = await this.authService.login(this.email, this.palavraPasse);

    await loading.dismiss();

    if (sucesso) {
      await this.mostrarToast('Conta criada com sucesso!', 'success');
      this.router.navigate(['/explorar'], { replaceUrl: true });
    } else {
      await this.mostrarToast('Erro ao criar conta. Tenta novamente.', 'danger');
    }
  }

  /**
   * Volta à página anterior.
   * Requisito 3: Routing na navegação
   */
  voltar() {
    this.router.navigate(['/explorar']);
  }

  /**
   * Mostra uma mensagem toast ao utilizador.
   * @param mensagem - Texto a mostrar
   * @param cor - Cor do toast (success, warning, danger)
   */
  private async mostrarToast(mensagem: string, cor: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2500,
      color: cor,
      position: 'bottom'
    });
    await toast.present();
  }
}