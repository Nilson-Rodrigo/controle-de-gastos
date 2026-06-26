/**
 * Contrato do objeto de valor de resumo financeiro.
 *
 * Decisão arquitetural (ISP + DIP):
 * As camadas de aplicação e apresentação dependem desta interface,
 * não da implementação concreta ResumoFinanceiro.
 * Isso permite que no futuro sejam criados resumos alternativos
 * (ex.: IResumoFinanceiroPorCategoria) sem quebrar código existente.
 */
export interface IResumoFinanceiro {
    readonly totalSalarios: number;
    readonly totalReceitas: number;
    readonly totalDespesas: number;
    readonly saldoRestante: number;
}
