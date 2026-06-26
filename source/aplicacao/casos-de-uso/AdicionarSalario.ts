import { IRepositorioTransacoes } from "../../dominio/interfaces/IRepositorioTransacoes";
import { Transacao } from "../../dominio/entidades/Transacao";
import { TipoTransacao } from "../../dominio/enumeradores/TipoTransacao";
import { ValorInvalidoErro } from "../../dominio/excecoes/ValorInvalidoErro";

/**
 * Caso de uso: Adicionar Salário.
 *
 * Decisão arquitetural (SRP + Command):
 * Cada caso de uso tem uma única responsabilidade: executar uma ação específica
 * do negócio. Valida a entrada e delega a persistência ao repositório.
 * A validação que antes estava em Transacao.validar() foi trazida para cá,
 * pois é uma regra de negócio da operação de adição, não da entidade em si.
 */
export class AdicionarSalario {
    constructor(private readonly repositorio: IRepositorioTransacoes) {}

    executar(valor: number): void {
        this.validarValor(valor);

        const transacao = new Transacao(valor, TipoTransacao.Salario, "salário");
        this.repositorio.adicionar(transacao);
    }

    private validarValor(valor: number): void {
        const valorInvalido = valor <= 0 || isNaN(valor);
        if (valorInvalido) {
            throw new ValorInvalidoErro(valor);
        }
    }
}
