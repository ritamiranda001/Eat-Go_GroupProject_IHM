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

  modo: 'login' | 'registo' = 'login'; // Modo atual do formulário: login ou registo

  email: string = '';                      // Email introduzido pelo utilizador
  palavraPasse: string = '';               // Palavra-passe introduzida
  confirmarPalavraPasse: string = '';      // Confirmação da palavra-passe (só no registo)
  nome: string = '';                       // Nome do utilizador (só no registo)
  lembrarMe: boolean = false;              // Se true, mantém a sessão iniciada
  mostrarPalavraPasse: boolean = false;    // Controla a visibilidade da palavra-passe

  constructor(
    private router: Router,
    private authService: AuthService,        // Serviço de autenticação
    private toastCtrl: ToastController,      // Controlador de mensagens toast
    private loadingCtrl: LoadingController   // Controlador de loading spinner
  ) {}

  ngOnInit() {}

  // Alterna entre o modo login e registo, limpando os campos do formulário
  toggleModo() {
    this.modo = this.modo === 'login' ? 'registo' : 'login';
    this.email = '';
    this.palavraPasse = '';
    this.confirmarPalavraPasse = '';
    this.nome = '';
  }

  // Alterna a visibilidade da palavra-passe (mostrar/ocultar)
  togglePalavraPasse() {
    this.mostrarPalavraPasse = !this.mostrarPalavraPasse;
  }

  // Valida os campos e executa o login do utilizador
  async entrar() {
    // Valida se os campos obrigatórios estão preenchidos
    if (!this.email || !this.palavraPasse) {
      await this.mostrarToast('Por favor preenche todos os campos.', 'warning');
      return;
    }

    // Mostra o spinner de loading durante a autenticação
    const loading = await this.loadingCtrl.create({
      message: 'A entrar...',
      duration: 1500
    });
    await loading.present();

    // Tenta autenticar o utilizador via AuthService
    const sucesso = await this.authService.login(this.email, this.palavraPasse);
    await loading.dismiss();

    if (sucesso) {
      await this.mostrarToast('Login efetuado com sucesso!', 'success', 'log-in-outline');
      // Navega para a home substituindo o histórico (impede voltar ao login)
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      await this.mostrarToast('Email ou palavra-passe incorretos.', 'danger');
    }
  }

  // Valida os requisitos da palavra-passe
  // Retorna mensagem de erro se inválida, ou null se válida
  validarPalavraPasse(pass: string): string | null {
    if (pass.length < 4) return 'A palavra-passe deve ter pelo menos 4 caracteres.';
    if (pass.length > 8) return 'A palavra-passe não pode ter mais de 8 caracteres.';
    if (!/[A-Z]/.test(pass)) return 'A palavra-passe deve ter pelo menos uma letra maiúscula.';
    if (!/[0-9]/.test(pass)) return 'A palavra-passe deve ter pelo menos um número.';
    return null;
  }

  // Valida os campos e executa o registo de um novo utilizador
  async registar() {
    // Valida se todos os campos do registo estão preenchidos
    if (!this.nome || !this.email || !this.palavraPasse || !this.confirmarPalavraPasse) {
      await this.mostrarToast('Por favor preenche todos os campos.', 'warning');
      return;
    }

    // Valida os requisitos da palavra-passe
    const erroPass = this.validarPalavraPasse(this.palavraPasse);
    if (erroPass) {
      await this.mostrarToast(erroPass, 'warning');
      return;
    }

    // Verifica se as palavras-passe coincidem
    if (this.palavraPasse !== this.confirmarPalavraPasse) {
      await this.mostrarToast('As palavras-passe não coincidem.', 'danger');
      return;
    }

    // Mostra o spinner de loading durante a criação da conta
    const loading = await this.loadingCtrl.create({
      message: 'A criar conta...',
      duration: 1500
    });
    await loading.present();

    // Tenta criar a conta via AuthService
    const sucesso = await this.authService.login(this.email, this.palavraPasse);
    await loading.dismiss();

    if (sucesso) {
      await this.mostrarToast('Conta criada com sucesso!', 'success', 'person-add-outline');
      // Navega para a home substituindo o histórico
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      await this.mostrarToast('Erro ao criar conta. Tenta novamente.', 'danger');
    }
  }

  // Navega de volta para a página inicial
  voltar() {
    this.router.navigate(['/home']);
  }

  // Exibe uma mensagem toast com cor e ícone opcionais
  private async mostrarToast(mensagem: string, cor: string, icone?: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2500,
      color: cor,
      position: 'bottom',
      icon: icone // Ícone opcional ao lado da mensagem
    });
    await toast.present();
  }
}