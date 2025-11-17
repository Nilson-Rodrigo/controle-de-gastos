import { ListaFinancas } from "./lista-de-financas";

export class ResumoFinanceiro {
    constructor(
        private salarios: ListaFinancas,
        private receitas: ListaFinancas,
        private despesas: ListaFinancas
    ) {}

    public gerar(): string {
        const totalSalarios = this.salarios.somar();
        const totalReceitas = this.receitas.somar();
        const totalDespesas = this.despesas.somar();
        const restante = totalSalarios + totalReceitas - totalDespesas;

        return `
    ===== RESUMO FINANCEIRO =====
    SALDO INICIAL: R$ ${totalSalarios.toFixed(2)}
    TOTAL DE RECEITAS: R$ ${totalReceitas.toFixed(2)}
    TOTAL DE DESPESAS: R$ ${totalDespesas.toFixed(2)}
    VALOR RESTANTE: R$ ${restante.toFixed(2)}
    =============================`;
    }

    public temHistorico(): boolean {
        return (
            this.salarios.somar() > 0 ||
            this.receitas.somar() > 0 ||
            this.despesas.somar() > 0
        );
    }

    public temSaldoNegativo(): boolean {
        const totalSalarios = this.salarios.somar();
        const totalReceitas = this.receitas.somar();
        const totalDespesas = this.despesas.somar();
        return (totalSalarios + totalReceitas - totalDespesas) < 0;
    }
}