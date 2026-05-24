/**
 * auth.service.ts
 * Serviço responsável pela autenticação do utilizador.
 * Requisito 9: Guardar informação com recurso ao Ionic Storage
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const CHAVE_UTILIZADOR = 'eat_go_utilizador';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Utilizador atual em memória */
  private utilizadorAtual: any = null;

  constructor(private storage: Storage) {
    this.init();
  }

  /** Inicializa o Storage e restaura sessão anterior */
  async init() {
    await this.storage.create();
    this.utilizadorAtual = await this.storage.get(CHAVE_UTILIZADOR);
  }

  /** Faz login e guarda no Storage */
  async login(email: string, palavraPasse: string): Promise<boolean> {
    if (!email || !palavraPasse) return false;
    const utilizador = { email, nome: email.split('@')[0] };
    this.utilizadorAtual = utilizador;
    await this.storage.set(CHAVE_UTILIZADOR, utilizador);
    return true;
  }

  /** Termina sessão */
  async logout() {
    this.utilizadorAtual = null;
    await this.storage.remove(CHAVE_UTILIZADOR);
  }

  /** Verifica se está autenticado */
  isLoggedIn(): boolean {
    return this.utilizadorAtual !== null;
  }

  /** Devolve dados do utilizador */
  getUtilizador(): any {
    return this.utilizadorAtual;
  }
}