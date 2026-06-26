import { IResumoFinanceiro } from "../interfaces/IResumoFinanceiro";

/**
 * Objeto de valor que representa o resumo financeiro consolidado.
 *
 * Decisão arquitetural (Value Object / DDD):
 * Objetos de valor são imutáveis e definidos pelos seus atributos, não por identidade.
 * Dois resumos com os mesmos valores são equivalentes.
 * Implementa IResumoFinanceiro para permitir substituição por implementações alternativas
 * (ex.: resumo com histórico, resumo por categoria).
 */
export class ResumoFinanceiro implements IResumoFinanceiro {
    constructor(
        public readonly totalSalarios: number,
        public readonly totalReceitas: number,
        public readonly totalDespesas: number,
        public readonly saldoRestante: number
    ) {}
}
