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

  /** Alterna entre modo login e registo. */
  toggleModo() {
    this.modo = this.modo === 'login' ? 'registo' : 'login';
    this.email = '';
    this.palavraPasse = '';
    this.confirmarPalavraPasse = '';
    this.nome = '';
  }

  /** Alterna visibilidade da palavra-passe. */
  togglePalavraPasse() {
    this.mostrarPalavraPasse = !this.mostrarPalavraPasse;
  }

  /** Executa o login do utilizador. */
  async entrar() {
    if (!this.email || !this.palavraPasse) {
      await this.mostrarToast('Por favor preenche todos os campos.', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'A entrar...',
      duration: 1500
    });
    await loading.present();

    const sucesso = await this.authService.login(this.email, this.palavraPasse);
    await loading.dismiss();

    if (sucesso) {
      await this.mostrarToast('Login efetuado com sucesso!', 'success');
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      await this.mostrarToast('Email ou palavra-passe incorretos.', 'danger');
    }
  }

  /** Valida as regras da palavra-passe. Devolve mensagem de erro ou null se válida. */
  validarPalavraPasse(pass: string): string | null {
    if (pass.length < 4) return 'A palavra-passe deve ter pelo menos 4 caracteres.';
    if (pass.length > 8) return 'A palavra-passe não pode ter mais de 8 caracteres.';
    if (!/[A-Z]/.test(pass)) return 'A palavra-passe deve ter pelo menos uma letra maiúscula.';
    if (!/[0-9]/.test(pass)) return 'A palavra-passe deve ter pelo menos um número.';
    return null;
  }

  /** Executa o registo de um novo utilizador. */
  async registar() {
    if (!this.nome || !this.email || !this.palavraPasse || !this.confirmarPalavraPasse) {
      await this.mostrarToast('Por favor preenche todos os campos.', 'warning');
      return;
    }

    const erroPass = this.validarPalavraPasse(this.palavraPasse);
    if (erroPass) {
      await this.mostrarToast(erroPass, 'warning');
      return;
    }

    if (this.palavraPasse !== this.confirmarPalavraPasse) {
      await this.mostrarToast('As palavras-passe não coincidem.', 'danger');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'A criar conta...',
      duration: 1500
    });
    await loading.present();

    const sucesso = await this.authService.login(this.email, this.palavraPasse);
    await loading.dismiss();

    if (sucesso) {
      await this.mostrarToast('Conta criada com sucesso!', 'success');
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      await this.mostrarToast('Erro ao criar conta. Tenta novamente.', 'danger');
    }
  }

  /** Volta à página anterior. */
  voltar() {
    this.router.navigate(['/home']);
  }

  /** Mostra uma mensagem toast ao utilizador. */
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