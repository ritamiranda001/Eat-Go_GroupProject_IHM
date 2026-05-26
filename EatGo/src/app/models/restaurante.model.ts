/**
 * restaurante.model.ts
 * Define a estrutura de dados de um Restaurante na app Eat&Go.
 * Requisito 10: Utilizar informação proveniente de ficheiros JSON
 */
export interface Restaurante {
  /** Identificador único do restaurante */
  id: number;

  /** Nome do restaurante */
  nome: string;

  /** Categoria (ex: Fast Food, Gourmet, Sushi...) */
  categoria: string;

  /** Descrição curta do restaurante */
  descricao: string;

  /** Localização textual (bairro, cidade) */
  localizacao: string;

  /** Distância em km do utilizador */
  distancia: number;

  /** Nível de preço: $, $$, $$$ */
  nivelPreco: '$' | '$$' | '$$$';

  /** Classificação média de 0 a 5 */
  avaliacao: number;

  /** Total de avaliações feitas */
  totalAvaliacoes: number;

  /** Caminho para a imagem do restaurante */
  imagem: string;

  /** Coordenadas GPS para mostrar no mapa (opcional) */
  coordenadas?: {
    lat: number;
    lng: number;
  };
}