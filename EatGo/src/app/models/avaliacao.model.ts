/** Interface que representa uma avaliação feita pelo utilizador */
export interface Avaliacao {
  /** ID do restaurante avaliado */
  restauranteId: number;
  /** Nome do restaurante avaliado */
  restauranteNome: string;
  /** Classificação de 1 a 5 estrelas */
  estrelas: number;
  /** Comentário do utilizador */
  comentario: string;
  /** Data da avaliação */
  data: string;
}
