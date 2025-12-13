import { Transacao } from "../models/Transacao";
import { ResumoFinanceiro } from "../models/ResumoFinanceiro";

export interface IFinanceiro {
    adicionarSalario(valor: number): boolean;
    adicionarReceita(valor: number, categoria?: string): boolean;
    adicionarDespesa(valor: number, categoria?: string): boolean;

    listarSalarios(): Transacao[];
    listarReceitas(): Transacao[];
    listarDespesas(): Transacao[];

    removerSalario(indice: number): boolean;
    removerReceita(indice: number): boolean;
    removerDespesa(indice: number): boolean;

    gerarResumo(): ResumoFinanceiro;
}
