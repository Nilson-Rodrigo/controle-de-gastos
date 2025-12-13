import { Transacao } from "../models/Transacao";

export class ListaTransacoes {
    private lista: Transacao[] = [];

    public adicionar(transacao: Transacao): boolean {
        if (transacao.validar()) {
            this.lista.push(transacao);
            return true;
        }
        return false;
    }

    public remover(indice: number): boolean {
        if (indice >= 0 && indice < this.lista.length) {
            this.lista.splice(indice, 1);
            return true;
        }
        return false;
    }

    public listar(): Transacao[] {
        return [...this.lista];
    }

    public somar(): number {
        return this.lista.reduce((acc, t) => acc + t.valor, 0);
    }
}
