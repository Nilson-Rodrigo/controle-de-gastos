/**
 * Exceção de domínio para valores inválidos em transações financeiras.
 *
 * Decisão arquitetural (SRP + Clean Code):
 * Substitui o retorno booleano opaco (true/false) por uma exceção semântica.
 * O chamador sabe exatamente o que deu errado, ao invés de inferir
 * o significado de um `false`.
 *
 * Exceções de domínio são independentes de qualquer framework.
 * No futuro, uma API REST pode capturar esta exceção e retornar HTTP 400.
 * Um handler CLI pode capturá-la e exibir uma mensagem ao usuário.
 */
export class ValorInvalidoErro extends Error {
    constructor(valor: number) {
        super(`Valor inválido: ${valor}. O valor deve ser um número positivo.`);
        this.name = "ValorInvalidoErro";
    }
}
