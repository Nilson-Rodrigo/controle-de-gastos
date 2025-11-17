import { ListaFinancas } from "./lista-de-financas";
import { ResumoFinanceiro } from "./resumo-financeiro";
import { InterfaceDoUsuario } from "./interface.js";

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
        InterfaceDoUsuario.exibirDescricao(this.descricao());
        let opcao = 0;

        while (opcao !== 8) {
            opcao = InterfaceDoUsuario.obterOpcaoMenuPrincipal();

            switch (opcao) {
                case 1: this.adicionar(this.salarios, "salário"); break;
                case 2: this.adicionar(this.receitas, "receita"); break;
                case 3: this.adicionar(this.despesas, "despesa"); break;
                case 4: this.remover(); break;
                case 5: this.consultar(); break;
                case 6: this.gerarResumo(); break;
                case 7: this.reiniciar(); break;
                case 8: InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.SAINDO); break;
                default: 
                    if (opcao !== 8) {
                        InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.OPCAO_INVALIDA);
                    }
                    break;
            }
        }
    }

    private adicionar(lista: ListaFinancas, tipo: string): void {
        let instrucao = 0;
        while (instrucao !== 2) {
            instrucao = InterfaceDoUsuario.obterOpcaoAdicionar(tipo);
            
            switch (instrucao) {
                case 1:
                    const valor = InterfaceDoUsuario.obterValor(tipo);
                    lista.adicionar(valor);
                    break;
                case 2:
                    break;
                default:
                    if (instrucao !== 2) {
                        InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.OPCAO_INVALIDA);
                    }
                    break;
            }
        }
    }

    private remover(): void {
        const tipo = InterfaceDoUsuario.obterOpcaoRemover();

        switch (tipo) {
            case 1: this.salarios.remover(); break;
            case 2: this.receitas.remover(); break;
            case 3: this.despesas.remover(); break;
            default: InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.OPCAO_INVALIDA); break;
        }
    }

    private consultar(): void {
        const tipo = InterfaceDoUsuario.obterOpcaoConsultar();

        switch (tipo) {
            case 1: this.salarios.listar("salários"); break;
            case 2: this.receitas.listar("receitas"); break;
            case 3: this.despesas.listar("despesas"); break;
            default: InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.OPCAO_INVALIDA); break;
        }
    }

    private gerarResumo(): void {
        const resumo = new ResumoFinanceiro(this.salarios, this.receitas, this.despesas);
        
        if (resumo.temHistorico()) {
            InterfaceDoUsuario.exibirMensagem(resumo.gerar());
        } else {
            InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.SEM_DADOS);
        }
    }

    private reiniciar(): void {
        this.salarios.limpar();
        this.receitas.limpar();
        this.despesas.limpar();
        InterfaceDoUsuario.exibirMensagem(InterfaceDoUsuario.MENSAGENS.REINICIADO);
    }
}