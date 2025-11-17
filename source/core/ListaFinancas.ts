
import { Financa } from "./Financa";

export class ListaFinancas {
    private lista: Financa[] = [];

    public adicionar(valor: number): void {
        const item = new Financa(valor);
        if (item.validar() == true) {
            this.lista.push(item);
            alert("Valor adicionado com sucesso!");
        } else {
            alert("Erro ao digitar, verifique o valor informado!");
        }
    }

    public remover(): void {
        if (this.lista.length == 0) {

            alert("Nenhum item para remover.");
        }
        else {
            let texto = "";
            for (let i = 0; i < this.lista.length; i++) {
                texto += `${i + 1} - R$ ${this.lista[i].valor.toFixed(2)}\n`;
            }
            const indice = Number(prompt(`${texto}\nDigite o número que deseja remover:`));

            if (!isNaN(indice) && indice >= 1 && indice <= this.lista.length) {
                this.lista.splice(indice - 1, 1);
                alert("Removido com sucesso.");
            } else {
                alert("Índice inválido.");
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
