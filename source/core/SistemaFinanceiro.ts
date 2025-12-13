import { Transacao } from "../models/Transacao";
import { ResumoFinanceiro } from "../models/ResumoFinanceiro";
import { ListaTransacoes } from "./ListaTransacoes";
import { IFinanceiro } from "./IFinanceiro";

export class SistemaFinanceiro implements IFinanceiro {
    
    private salarios = new ListaTransacoes();
    private receitas = new ListaTransacoes();
    private despesas = new ListaTransacoes();

    adicionarSalario(valor: number): boolean {
        const t = new Transacao(valor, "salario", "salário");
        return this.salarios.adicionar(t);
    }

    adicionarReceita(valor: number, categoria: string = "geral"): boolean {
        const t = new Transacao(valor, "receita", categoria);
        return this.receitas.adicionar(t);
    }

    adicionarDespesa(valor: number, categoria: string = "geral"): boolean {
        const t = new Transacao(valor, "despesa", categoria);
        return this.despesas.adicionar(t);
    }

    listarSalarios() { return this.salarios.listar(); }
    listarReceitas() { return this.receitas.listar(); }
    listarDespesas() { return this.despesas.listar(); }

    removerSalario(indice: number): boolean {
        return this.salarios.remover(indice);
    }

    removerReceita(indice: number): boolean {
        return this.receitas.remover(indice);
    }

    removerDespesa(indice: number): boolean {
        return this.despesas.remover(indice);
    }

    gerarResumo(): ResumoFinanceiro {
        const totalSalarios = this.salarios.somar();
        const totalReceitas = this.receitas.somar();
        const totalDespesas = this.despesas.somar();
        const saldo = totalSalarios + totalReceitas - totalDespesas;

        return new ResumoFinanceiro(
            totalSalarios,
            totalReceitas,
            totalDespesas,
            saldo
        );
    }
}
