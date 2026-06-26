import { ServicoFinanceiro } from "../../aplicacao/servicos/ServicoFinanceiro";
import { FormatadorTexto } from "./FormatadorTexto";
import { TipoTransacao } from "../../dominio/enumeradores/TipoTransacao";
import { ValorInvalidoErro } from "../../dominio/excecoes/ValorInvalidoErro";

const OPCAO_CANCELADA = null;

const OPCAO_ADICIONAR_SALARIO = 1;
const OPCAO_ADICIONAR_RECEITA = 2;
const OPCAO_ADICIONAR_DESPESA = 3;
const OPCAO_LISTAR_TRANSACOES = 4;
const OPCAO_REMOVER_TRANSACAO = 5;
const OPCAO_GERAR_RESUMO = 6;
const OPCAO_REINICIAR = 7;
const OPCAO_SAIR = 8;

const TIPO_REMOCAO_SALARIO = 1;
const TIPO_REMOCAO_RECEITA = 2;
const TIPO_REMOCAO_DESPESA = 3;

/**
 * Interface de usuário baseada em prompt/alert do navegador.
 *
 * Decisão arquitetural (SRP + DIP):
 * MenuPrompt é responsável apenas pelo fluxo de interação com o usuário.
 * Recebe ServicoFinanceiro por injeção — nunca instancia dependências diretamente.
 * A formatação de texto foi delegada a FormatadorTexto.
 *
 * Esta classe pode ser substituída por uma interface web, API REST ou CLI
 * sem nenhuma alteração nas camadas de domínio e aplicação.
 */
export class MenuPrompt {
    private readonly formatador: FormatadorTexto;

    constructor(private readonly servico: ServicoFinanceiro) {
        this.formatador = new FormatadorTexto();
    }

    iniciar(): void {
        while (true) {
            const opcao = this.lerOpcaoDoMenu();

            if (opcao === OPCAO_CANCELADA) {
                alert("👋 Saindo do sistema...");
                break;
            }

            this.processarOpcao(opcao);
        }
    }

    // ===== MENU =====

    private lerOpcaoDoMenu(): number | null {
        const input = prompt(this.textoMenuPrincipal());

        if (input === null) return null;

        const opcao = Number(input);
        return isNaN(opcao) ? -1 : opcao;
    }

    private textoMenuPrincipal(): string {
        return `
===== CONTROLE FINANCEIRO =====
1 - Adicionar Salário
2 - Adicionar Receita
3 - Adicionar Despesa
4 - Listar Transações
5 - Remover Transação
6 - Gerar Resumo
7 - Reiniciar Sistema
8 - Sair

(Cancelar para sair)`;
    }

    private processarOpcao(opcao: number): void {
        switch (opcao) {
            case OPCAO_ADICIONAR_SALARIO: this.fluxoAdicionarSalario(); break;
            case OPCAO_ADICIONAR_RECEITA: this.fluxoAdicionarReceita(); break;
            case OPCAO_ADICIONAR_DESPESA: this.fluxoAdicionarDespesa(); break;
            case OPCAO_LISTAR_TRANSACOES: this.fluxoListarTransacoes(); break;
            case OPCAO_REMOVER_TRANSACAO: this.fluxoRemoverTransacao(); break;
            case OPCAO_GERAR_RESUMO:      this.fluxoGerarResumo(); break;
            case OPCAO_REINICIAR:
                alert("⚠️ Reinício não implementado nesta interface.");
                break;
            case OPCAO_SAIR:
                alert("👋 Saindo do sistema...");
                return;
            default:
                alert("❌ Opção inválida.");
        }
    }

    // ===== FLUXOS =====

    private fluxoAdicionarSalario(): void {
        const input = prompt("Digite o valor do salário:\n(Cancelar para voltar)");
        if (input === null) return;

        this.executarComTratamentoDeErro(() => {
            this.servico.adicionarSalario(Number(input));
            alert("✅ Salário adicionado com sucesso.");
        });
    }

    private fluxoAdicionarReceita(): void {
        const valorInput = prompt("Digite o valor da receita:\n(Cancelar para voltar)");
        if (valorInput === null) return;

        const categoriaInput = prompt("Digite a categoria (opcional):\n(Cancelar para voltar)");
        if (categoriaInput === null) return;

        const categoria = categoriaInput || "geral";

        this.executarComTratamentoDeErro(() => {
            this.servico.adicionarReceita(Number(valorInput), categoria);
            alert("✅ Receita adicionada com sucesso.");
        });
    }

    private fluxoAdicionarDespesa(): void {
        const valorInput = prompt("Digite o valor da despesa:\n(Cancelar para voltar)");
        if (valorInput === null) return;

        const categoriaInput = prompt("Digite a categoria (opcional):\n(Cancelar para voltar)");
        if (categoriaInput === null) return;

        const categoria = categoriaInput || "geral";

        this.executarComTratamentoDeErro(() => {
            this.servico.adicionarDespesa(Number(valorInput), categoria);
            alert("✅ Despesa adicionada com sucesso.");
        });
    }

    private fluxoListarTransacoes(): void {
        const salarios = this.servico.listarTransacoes(TipoTransacao.Salario);
        const receitas = this.servico.listarTransacoes(TipoTransacao.Receita);
        const despesas = this.servico.listarTransacoes(TipoTransacao.Despesa);

        alert(this.formatador.formatarListaTransacoes(salarios, receitas, despesas));
    }

    private fluxoRemoverTransacao(): void {
        const tipoInput = prompt(`
REMOVER TRANSAÇÃO
1 - Salário
2 - Receita
3 - Despesa

(Cancelar para voltar)`);
        if (tipoInput === null) return;

        const tipoNumero = Number(tipoInput);
        const tipoTransacao = this.resolverTipoTransacao(tipoNumero);

        if (tipoTransacao === null) {
            alert("❌ Tipo inválido.");
            return;
        }

        const indiceInput = prompt("Digite o índice (começa em 1):\n(Cancelar para voltar)");
        if (indiceInput === null) return;

        const indiceBaseZero = Number(indiceInput) - 1;
        const sucesso = this.servico.removerTransacao(tipoTransacao, indiceBaseZero);

        alert(sucesso ? "✅ Removido com sucesso." : "❌ Índice inválido.");
    }

    private fluxoGerarResumo(): void {
        const resumo = this.servico.gerarResumo();
        alert(this.formatador.formatarResumo(resumo));
    }

    // ===== UTILIDADES =====

    private resolverTipoTransacao(tipo: number): TipoTransacao | null {
        const mapa: Record<number, TipoTransacao> = {
            [TIPO_REMOCAO_SALARIO]: TipoTransacao.Salario,
            [TIPO_REMOCAO_RECEITA]: TipoTransacao.Receita,
            [TIPO_REMOCAO_DESPESA]: TipoTransacao.Despesa,
        };
        return mapa[tipo] ?? null;
    }

    private executarComTratamentoDeErro(acao: () => void): void {
        try {
            acao();
        } catch (erro) {
            if (erro instanceof ValorInvalidoErro) {
                alert("❌ Valor inválido.");
            } else {
                throw erro;
            }
        }
    }
}
