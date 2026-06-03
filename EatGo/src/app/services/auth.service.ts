/**
 * auth.service.ts
 * Serviço responsável pela autenticação do utilizador.
 * Requisito 9:  Guardar informação com recurso ao Ionic Storage
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// Chave usada no Ionic Storage para persistir a sessão do utilizador
const CHAVE_UTILIZADOR = 'eat_go_utilizador';

@Injectable({
  providedIn: 'root' // Singleton disponível em toda a aplicação
})
export class AuthService {

  // Utilizador autenticado mantido em memória para acesso síncrono
  private utilizadorAtual: any = null;

  constructor(private storage: Storage) {
    // Inicializa o Storage e restaura sessão ao arrancar o serviço
    this.init();
  }

  /**
   * Inicializa o Ionic Storage e restaura o utilizador
   * da sessão anterior (se existir).
   * Requisito 9: Ionic Storage
   */
  async init() {
    await this.storage.create();
    this.utilizadorAtual = await this.storage.get(CHAVE_UTILIZADOR);
  }

  /**
   * Autentica o utilizador com email e palavra-passe.
   * O nome de utilizador é derivado da parte local do email (antes do '@').
   * Guarda a sessão no Storage para persistência entre arranques.
   * Retorna true se o login foi bem-sucedido, false se os campos estiverem vazios.
   * Requisito 9: Ionic Storage
   */
  async login(email: string, palavraPasse: string): Promise<boolean> {
    if (!email || !palavraPasse) return false;
    // Gera o nome a partir do email (ex: "joao@mail.com" → nome: "joao")
    const utilizador = { email, nome: email.split('@')[0] };
    this.utilizadorAtual = utilizador;
    await this.storage.set(CHAVE_UTILIZADOR, utilizador);
    return true;
  }

  /**
   * Termina a sessão do utilizador:
   * - Limpa o utilizador em memória
   * - Remove a entrada do Ionic Storage
   */
  async logout() {
    this.utilizadorAtual = null;
    await this.storage.remove(CHAVE_UTILIZADOR);
  }

  /** Retorna true se houver um utilizador autenticado em memória */
  isLoggedIn(): boolean {
    return this.utilizadorAtual !== null;
  }

  /** Retorna os dados do utilizador autenticado (ou null se não autenticado) */
  getUtilizador(): any {
    return this.utilizadorAtual;
  }
}