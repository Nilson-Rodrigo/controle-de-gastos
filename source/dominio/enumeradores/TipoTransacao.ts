/**
 * Enumerador que representa os tipos possíveis de uma transação financeira.
 *
 * Decisão arquitetural (OCP + eliminação de números mágicos):
 * Substitui as strings literais espalhadas pelo sistema ("salario", "receita", "despesa")
 * por um enum tipado e centralizado. Novos tipos podem ser adicionados aqui sem alterar
 * nenhuma outra parte do código.
 */
export enum TipoTransacao {
    Salario = "salario",
    Receita = "receita",
    Despesa = "despesa",
}
