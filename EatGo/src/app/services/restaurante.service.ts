/**
 * restaurante.service.ts
 * Serviço responsável por gerir os dados dos restaurantes.
 * Requisito 9:  Guardar informação com recurso ao Ionic Storage
 * Requisito 10: Utilizar informação proveniente de ficheiros JSON
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../models/restaurante.model';
import { Storage } from '@ionic/storage-angular';

// Chave usada no Ionic Storage para guardar restaurantes adicionados pelo utilizador
const CHAVE_RESTAURANTES = 'eat_go_restaurantes_adicionados';

@Injectable({
  providedIn: 'root' // Disponível como singleton em toda a aplicação
})
export class RestauranteService {

  // Caminho para o ficheiro JSON com os restaurantes base (Requisito 10)
  private readonly DATA_PATH = 'assets/data/restaurantes.json';

  constructor(private http: HttpClient, private storage: Storage) {
    // Inicializa o Storage ao arrancar o serviço
    this.storage.create();
  }

  /**
   * Obtém todos os restaurantes combinando duas fontes:
   * 1. Ficheiro JSON base (assets/data/restaurantes.json)
   * 2. Restaurantes adicionados pelo utilizador (Ionic Storage)
   * Requisito 10: JSON | Requisito 9: Storage
   */
  getAll(): Observable<Restaurante[]> {
    return new Observable(observer => {
      this.http.get<Restaurante[]>(this.DATA_PATH).subscribe({
        next: async (restaurantesJSON) => {
          // Combina os restaurantes do JSON com os guardados no Storage
          const adicionados = await this.storage.get(CHAVE_RESTAURANTES) || [];
          observer.next([...restaurantesJSON, ...adicionados]);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  /**
   * Obtém um restaurante pelo seu ID.
   * Reutiliza getAll() para pesquisar em ambas as fontes de dados.
   */
  getById(id: number): Observable<Restaurante | undefined> {
    return new Observable(observer => {
      this.getAll().subscribe({
        next: (restaurantes) => {
          observer.next(restaurantes.find(r => r.id === id));
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  /**
   * Adiciona um novo restaurante ao Ionic Storage.
   * Gera um ID único baseado no timestamp atual.
   * Requisito 9: Ionic Storage
   */
  async adicionar(restaurante: Restaurante): Promise<void> {
    const adicionados: Restaurante[] = await this.storage.get(CHAVE_RESTAURANTES) || [];
    restaurante.id = Date.now(); // ID único baseado no timestamp
    adicionados.push(restaurante);
    await this.storage.set(CHAVE_RESTAURANTES, adicionados);
  }
}