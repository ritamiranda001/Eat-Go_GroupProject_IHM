/**
 * restaurante.ts (RestauranteService)
 * Serviço responsável por gerir os dados dos restaurantes.
 * Requisito 7: Estruturar e organizar devidamente os vários módulos, services e assets
 * Requisito 10: Utilizar informação proveniente de ficheiros JSON
 * Requisito 15: Otimizar código com recurso a Services
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../models/restaurante.model';

@Injectable({
  providedIn: 'root' // Disponível em toda a aplicação sem necessidade de declarar no módulo
})
export class RestauranteService {

  /** Caminho para o ficheiro JSON com os dados dos restaurantes */
  private readonly DATA_PATH = 'assets/data/restaurantes.json';

  /**
   * Injeta o HttpClient para fazer pedidos HTTP (leitura do JSON)
   * @param http - Cliente HTTP do Angular
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtém a lista completa de restaurantes a partir do ficheiro JSON.
   * Futuramente pode ser substituído por uma chamada à API MongoDB.
   * @returns Observable com array de Restaurante
   */
  getAll(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(this.DATA_PATH);
  }

  /**
   * Obtém um restaurante específico pelo seu ID.
   * @param id - ID do restaurante a procurar
   * @returns Observable com o Restaurante encontrado ou undefined
   */
  getById(id: number): Observable<Restaurante | undefined> {
    return new Observable(observer => {
      this.getAll().subscribe({
        next: (restaurantes) => {
          // Procura o restaurante com o ID correspondente
          const encontrado = restaurantes.find(r => r.id === id);
          observer.next(encontrado);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  /**
   * Filtra restaurantes por categoria.
   * @param categoria - Categoria a filtrar (ex: "Fast Food", "Gourmet")
   * @returns Observable com array de Restaurante filtrado
   */
  getByCategoria(categoria: string): Observable<Restaurante[]> {
    return new Observable(observer => {
      this.getAll().subscribe({
        next: (restaurantes) => {
          const filtrados = restaurantes.filter(r => r.categoria === categoria);
          observer.next(filtrados);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}