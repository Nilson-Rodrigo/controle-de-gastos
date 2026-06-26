import { IRepositorioTransacoes } from "../../dominio/interfaces/IRepositorioTransacoes";
import { Transacao } from "../../dominio/entidades/Transacao";
import { TipoTransacao } from "../../dominio/enumeradores/TipoTransacao";
import { ValorInvalidoErro } from "../../dominio/excecoes/ValorInvalidoErro";

const CATEGORIA_PADRAO = "geral";

/**
 * Caso de uso: Adicionar Receita.
 *
 * Decisão arquitetural (SRP + Command):
 * Isolado em sua própria classe para que futuras mudanças nas regras
 * de adição de receita (ex.: limite por categoria, notificações)
 * não afetem outros casos de uso.
 */
export class AdicionarReceita {
    constructor(private readonly repositorio: IRepositorioTransacoes) {}

    executar(valor: number, categoria: string = CATEGORIA_PADRAO): void {
        this.validarValor(valor);

        const transacao = new Transacao(valor, TipoTransacao.Receita, categoria);
        this.repositorio.adicionar(transacao);
    }

    private validarValor(valor: number): void {
        const valorInvalido = valor <= 0 || isNaN(valor);
        if (valorInvalido) {
            throw new ValorInvalidoErro(valor);
        }
    }
}
