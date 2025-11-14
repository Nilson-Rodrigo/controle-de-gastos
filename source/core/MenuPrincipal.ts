
import { ListaFinancas } from "./ListaFinancas";
import { ResumoFinanceiro } from "./ResumoFinanceiro";

export class MenuPrincipal {
    constructor(
        private salarios: ListaFinancas,
        private receitas: ListaFinancas,
        private despesas: ListaFinancas
    ) {}

    public descricao(): string {
        return `Este programa ajuda você a controlar seus gastos mensais de forma simples e prática.`;
    }

    public exibir(): void {
        alert(this.descricao());
        let opcao = 0;

        while (opcao !== 8) {
            opcao = Number(prompt(`Digite:
1 - Adicionar Salário
2 - Adicionar Receita
3 - Adicionar Despesa
4 - Remover
5 - Consultar
6 - Gerar Resumo
7 - Reiniciar
8 - Sair`));

            switch (opcao) {
                case 1:
                    this.adicionar(this.salarios, "salário");
                    break;
                case 2:
                    this.adicionar(this.receitas, "receita");
                    break;
                case 3:
                    this.adicionar(this.despesas, "despesa");
                    break;
                case 4:
                    this.remover();
                    break;
                case 5:
                    this.consultar();
                    break;
                case 6:
                    this.gerarResumo();
                    break;
                case 7:
                    this.reiniciar();
                    break;
                case 8:
                    alert("Saindo...");
                    break;
                default:
                    alert("Opção inválida.");
                    break;
            }
        }
    }

    private adicionar(lista: ListaFinancas, tipo: string): void {
        let instrucao = 0;
        while (instrucao !== 2) {
            instrucao = Number(prompt(`1 - adicionar ${tipo}\n2 - sair`));
            switch (instrucao) {
                case 1:
                    const valor = Number(prompt(`Digite o valor da ${tipo}:`));
                    lista.adicionar(valor);
                    break;
                case 2:
                    break;
                default:
                    alert("Opção inválida.");
                    break;
            }
        }
    }

    private remover(): void {
        const tipo = Number(prompt(`O que deseja remover?
1 - Salário
2 - Receita
3 - Despesa`));

        switch (tipo) {
            case 1:
                this.salarios.remover();
                break;
            case 2:
                this.receitas.remover();
                break;
            case 3:
                this.despesas.remover();
                break;
            default:
                alert("Opção inválida.");
                break;
        }
    }

    private consultar(): void {
        const tipo = Number(prompt(`O que deseja consultar?
1 - Salários
2 - Receitas
3 - Despesas`));

        switch (tipo) {
            case 1:
                this.salarios.listar("salários");
                break;
            case 2:
                this.receitas.listar("receitas");
                break;
            case 3:
                this.despesas.listar("despesas");
                break;
            default:
                alert("Opção inválida.");
                break;
        }
    }

    private gerarResumo(): void {
        const resumo = new ResumoFinanceiro(this.salarios, this.receitas, this.despesas);
        switch (resumo.temHistorico()) {
            case true:
                alert(resumo.gerar());
                break;
            case false:
                alert("Não há dados registrados.");
                break;
        }
    }

    private reiniciar(): void {
        this.salarios.limpar();
        this.receitas.limpar();
        this.despesas.limpar();
        alert("Programa reiniciado com sucesso.");
    }
}
