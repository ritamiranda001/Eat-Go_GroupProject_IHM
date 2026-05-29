/**
 * restaurante.service.ts
 * Serviço responsável por gerir os dados dos restaurantes.
 * Requisito 9: Guardar informação com recurso ao Ionic Storage
 * Requisito 10: Utilizar informação proveniente de ficheiros JSON
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Restaurante } from '../models/restaurante.model';
import { Storage } from '@ionic/storage-angular';

const CHAVE_RESTAURANTES = 'eat_go_restaurantes_adicionados';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private readonly DATA_PATH = 'assets/data/restaurantes.json';

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  /** Obtém todos os restaurantes (JSON + adicionados pelo utilizador) */
  getAll(): Observable<Restaurante[]> {
    return new Observable(observer => {
      this.http.get<Restaurante[]>(this.DATA_PATH).subscribe({
        next: async (restaurantesJSON) => {
          const adicionados = await this.storage.get(CHAVE_RESTAURANTES) || [];
          observer.next([...restaurantesJSON, ...adicionados]);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  /** Obtém um restaurante pelo ID */
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

  /** Adiciona um novo restaurante ao Storage */
  async adicionar(restaurante: Restaurante): Promise<void> {
    const adicionados: Restaurante[] = await this.storage.get(CHAVE_RESTAURANTES) || [];
    const novoId = Date.now();
    restaurante.id = novoId;
    adicionados.push(restaurante);
    await this.storage.set(CHAVE_RESTAURANTES, adicionados);
  }
}