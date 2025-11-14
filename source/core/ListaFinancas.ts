
import { Financa } from "./Financa";

export class ListaFinancas {
    private lista: Financa[] = [];

    public adicionar(valor: number): void {
        const item = new Financa(valor);
        switch (item.validar()) {
            case true:
                this.lista.push(item);
                alert("Valor adicionado com sucesso!");
                break;
            case false:
                alert("Erro ao digitar, verifique o valor informado!");
                break;
        }
    }

    public remover(): void {
        switch (this.lista.length) {
            case 0:
                alert("Nenhum item para remover.");
                return;
            default:
                let texto = "";
                for (let i = 0; i < this.lista.length; i++) {
                    texto += `${i + 1} - R$ ${this.lista[i].valor.toFixed(2)}\n`;
                }
                const indice = Number(prompt(`${texto}\nDigite o número que deseja remover:`));
                switch (true) {
                    case !isNaN(indice) && indice >= 1 && indice <= this.lista.length:
                        this.lista.splice(indice - 1, 1);
                        alert("Removido com sucesso.");
                        break;
                    default:
                        alert("Índice inválido.");
                        break;
                }
        }
    }

    public listar(tipo: string): void {
        switch (this.lista.length > 0) {
            case true:
                let texto = `===== ${tipo.toUpperCase()} =====\n`;
                for (let i = 0; i < this.lista.length; i++) {
                    texto += `${i + 1} - R$ ${this.lista[i].valor.toFixed(2)}\n`;
                }
                alert(texto);
                break;
            case false:
                alert(`Você não tem ${tipo.toLowerCase()} registradas.`);
                break;
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
}
