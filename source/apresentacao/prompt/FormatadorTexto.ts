import { IResumoFinanceiro } from "../../dominio/interfaces/IResumoFinanceiro";
import { Transacao } from "../../dominio/entidades/Transacao";

/**
 * Responsável exclusivamente pela formatação de texto para exibição.
 *
 * Decisão arquitetural (SRP):
 * Extrai de MenuPrompt a responsabilidade de formatar strings.
 * MenuPrompt sabe QUANDO exibir; FormatadorTexto sabe COMO formatar.
 * Isso permite que no futuro o mesmo FormatadorTexto seja reutilizado
 * por outras interfaces ou que a formatação seja trocada sem tocar no fluxo de menu.
 */
export class FormatadorTexto {
    formatarResumo(resumo: IResumoFinanceiro): string {
        return [
            "===== RESUMO FINANCEIRO =====",
            `Salários: R$ ${this.formatarValor(resumo.totalSalarios)}`,
            `Receitas: R$ ${this.formatarValor(resumo.totalReceitas)}`,
            `Despesas: R$ ${this.formatarValor(resumo.totalDespesas)}`,
            "----------------------------",
            `Saldo:    R$ ${this.formatarValor(resumo.saldoRestante)}`,
            "============================",
        ].join("\n");
    }

    formatarListaTransacoes(
        salarios: Transacao[],
        receitas: Transacao[],
        despesas: Transacao[]
    ): string {
        return [
            "===== TRANSAÇÕES =====",
            this.formatarSecao("Salários", salarios),
            this.formatarSecao("Receitas", receitas),
            this.formatarSecao("Despesas", despesas),
        ].join("\n");
    }

    private formatarSecao(titulo: string, lista: Transacao[]): string {
        const cabecalho = `\n--- ${titulo} ---`;
        const conteudo = this.formatarItens(lista);
        return `${cabecalho}\n${conteudo}`;
    }

    private formatarItens(lista: Transacao[]): string {
        if (lista.length === 0) {
            return "Nenhum registro.";
        }

        return lista
            .map((t, i) => `${i + 1} - R$ ${this.formatarValor(t.valor)} (${t.categoria})`)
            .join("\n");
    }

    private formatarValor(valor: number): string {
        return valor.toFixed(2);
    }
}
