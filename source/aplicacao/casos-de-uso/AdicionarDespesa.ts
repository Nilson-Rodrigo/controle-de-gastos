import { IRepositorioTransacoes } from "../../dominio/interfaces/IRepositorioTransacoes";
import { Transacao } from "../../dominio/entidades/Transacao";
import { TipoTransacao } from "../../dominio/enumeradores/TipoTransacao";
import { ValorInvalidoErro } from "../../dominio/excecoes/ValorInvalidoErro";

const CATEGORIA_PADRAO = "geral";

/**
 * Caso de uso: Adicionar Despesa.
 *
 * Decisão arquitetural (SRP + Command):
 * Isolado em sua própria classe. Futuras regras de negócio específicas
 * para despesas (ex.: alertas de orçamento, categorias obrigatórias)
 * serão adicionadas apenas aqui, sem risco de regressão em outros casos de uso.
 */
export class AdicionarDespesa {
    constructor(private readonly repositorio: IRepositorioTransacoes) {}

    executar(valor: number, categoria: string = CATEGORIA_PADRAO): void {
        this.validarValor(valor);

        const transacao = new Transacao(valor, TipoTransacao.Despesa, categoria);
        this.repositorio.adicionar(transacao);
    }

    private validarValor(valor: number): void {
        const valorInvalido = valor <= 0 || isNaN(valor);
        if (valorInvalido) {
            throw new ValorInvalidoErro(valor);
        }
    }
}
