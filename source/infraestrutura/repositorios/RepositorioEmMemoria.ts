import { IRepositorioTransacoes } from "../../dominio/interfaces/IRepositorioTransacoes";
import { Transacao } from "../../dominio/entidades/Transacao";
import { TipoTransacao } from "../../dominio/enumeradores/TipoTransacao";

/**
 * Implementação em memória do repositório de transações.
 *
 * Decisão arquitetural (Strategy + LSP):
 * Esta classe é a única que conhece o detalhe de implementação (Map de arrays).
 * Implementa IRepositorioTransacoes, podendo ser substituída por
 * RepositorioSQLite, RepositorioPostgres ou RepositorioMongo
 * sem alterar nenhuma linha da camada de aplicação ou domínio.
 *
 * O uso de Map<TipoTransacao, Transacao[]> evita a triplicação de lógica
 * que existia antes (salarios, receitas, despesas como campos separados).
 */
export class RepositorioEmMemoria implements IRepositorioTransacoes {
    private readonly armazenamento: Map<TipoTransacao, Transacao[]>;

    constructor() {
        this.armazenamento = new Map([
            [TipoTransacao.Salario, []],
            [TipoTransacao.Receita, []],
            [TipoTransacao.Despesa, []],
        ]);
    }

    adicionar(transacao: Transacao): void {
        this.obterLista(transacao.tipo).push(transacao);
    }

    remover(tipo: TipoTransacao, indice: number): boolean {
        const lista = this.obterLista(tipo);
        const indiceInvalido = indice < 0 || indice >= lista.length;

        if (indiceInvalido) {
            return false;
        }

        lista.splice(indice, 1);
        return true;
    }

    listar(tipo: TipoTransacao): Transacao[] {
        return [...this.obterLista(tipo)];
    }

    somar(tipo: TipoTransacao): number {
        return this.obterLista(tipo).reduce((acumulador, t) => acumulador + t.valor, 0);
    }

    private obterLista(tipo: TipoTransacao): Transacao[] {
        return this.armazenamento.get(tipo)!;
    }
}
