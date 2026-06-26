import { IRepositorioTransacoes } from "../../dominio/interfaces/IRepositorioTransacoes";
import { IResumoFinanceiro } from "../../dominio/interfaces/IResumoFinanceiro";
import { ResumoFinanceiro } from "../../dominio/objetos-de-valor/ResumoFinanceiro";
import { TipoTransacao } from "../../dominio/enumeradores/TipoTransacao";

/**
 * Caso de uso: Gerar Resumo Financeiro.
 *
 * Decisão arquitetural (SRP):
 * O cálculo do resumo financeiro, que antes estava embutido em SistemaFinanceiro,
 * agora é uma responsabilidade isolada e explícita.
 * Retorna IResumoFinanceiro (abstração) ao invés de ResumoFinanceiro (concreto),
 * respeitando DIP na camada de apresentação.
 */
export class GerarResumo {
    constructor(private readonly repositorio: IRepositorioTransacoes) {}

    executar(): IResumoFinanceiro {
        const totalSalarios = this.repositorio.somar(TipoTransacao.Salario);
        const totalReceitas = this.repositorio.somar(TipoTransacao.Receita);
        const totalDespesas = this.repositorio.somar(TipoTransacao.Despesa);
        const saldoRestante = totalSalarios + totalReceitas - totalDespesas;

        return new ResumoFinanceiro(
            totalSalarios,
            totalReceitas,
            totalDespesas,
            saldoRestante
        );
    }
}
