import { Financa } from "./financas.js";
import { InterfaceDoUsuario } from "./interface.js";

export class ListaFinancas {
    private lista: Financa[] = [];

    public adicionar(valor: number): void {
        const item = new Financa(valor);
        
        if (item.validar()) {
            this.lista.push(item);
            InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.SUCESSO_ADICIONAR);
        } else {
            InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.ERRO_VALOR);
        }
    }

    public remover(): void {
        if (this.lista.length === 0) {
            InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.NENHUM_ITEM);
            return;
        }

        let texto = "";
        for (let i = 0; i < this.lista.length; i++) {
            texto += `${i + 1} - R$ ${this.lista[i].valor.toFixed(2)}\n`;
        }
        
        const indice = InterfaceDoUsuario.obterIndiceRemocao(texto);
        
        if (!isNaN(indice) && indice >= 1 && indice <= this.lista.length) {
            this.lista.splice(indice - 1, 1);
            InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.SUCESSO_REMOVER);
        } else {
            InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.INDICE_INVALIDO);
        }
    }

    public listar(tipo: string): void {
        if (this.lista.length > 0) {
            let texto = `===== ${tipo.toUpperCase()} =====\n`;
            for (let i = 0; i < this.lista.length; i++) {
                texto += `${i + 1} - R$ ${this.lista[i].valor.toFixed(2)}\n`;
            }
            InterfaceDoUsuario.exibirLista(texto);
        } else {
            InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.SEM_REGISTROS(tipo.toLowerCase()));
        }
    }

    public somar(): number {
        return this.lista.reduce((acc, item) => acc + item.valor, 0);
    }

    public limpar(): void {
        this.lista = [];
    }

    public temDados(): boolean {
        return this.lista.length > 0;
    }

    public getTamanho(): number {
        return this.lista.length;
    }
}
