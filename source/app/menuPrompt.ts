import { SistemaFinanceiro } from "../core/SistemaFinanceiro";
import { IFinanceiro } from "../core/IFinanceiro";
import { Transacao } from "../models/Transacao";

class MenuPrompt {
    private sistema: IFinanceiro;

    constructor() {
        this.sistema = new SistemaFinanceiro();
    }

    iniciar(): void {
        while (true) {
            const opcao = this.menuPrincipal();

            // Cancelar no menu principal encerra
            if (opcao === null) {
                alert("👋 Saindo do sistema...");
                break;
            }

            switch (opcao) {
                case 1: this.adicionarSalario(); break;
                case 2: this.adicionarReceita(); break;
                case 3: this.adicionarDespesa(); break;
                case 4: this.listarTransacoes(); break;
                case 5: this.removerTransacao(); break;
                case 6: this.gerarResumo(); break;
                case 7:
                    alert("⚠️ Reinício não implementado nesta interface.");
                    break;
                case 8:
                    alert("👋 Saindo do sistema...");
                    return;
                default:
                    alert("❌ Opção inválida.");
            }
        }
    }

    // ===== MENU PRINCIPAL =====

    private menuPrincipal(): number | null {
        const input = prompt(`
===== CONTROLE FINANCEIRO =====
1 - Adicionar Salário
2 - Adicionar Receita
3 - Adicionar Despesa
4 - Listar Transações
5 - Remover Transação
6 - Gerar Resumo
7 - Reiniciar Sistema
8 - Sair

(Cancelar para sair)
`);

        if (input === null) return null;

        const opcao = Number(input);
        return isNaN(opcao) ? -1 : opcao;
    }

    // ===== AÇÕES =====

    private adicionarSalario(): void {
        const input = prompt("Digite o valor do salário:\n(Cancelar para voltar)");
        if (input === null) return;

        const valor = Number(input);

        if (this.sistema.adicionarSalario(valor)) {
            alert("✅ Salário adicionado com sucesso.");
        } else {
            alert("❌ Valor inválido.");
        }
    }

    private adicionarReceita(): void {
        const valorInput = prompt("Digite o valor da receita:\n(Cancelar para voltar)");
        if (valorInput === null) return;

        const categoriaInput = prompt("Digite a categoria (opcional):\n(Cancelar para voltar)");
        if (categoriaInput === null) return;

        const valor = Number(valorInput);
        const categoria = categoriaInput || "geral";

        if (this.sistema.adicionarReceita(valor, categoria)) {
            alert("✅ Receita adicionada com sucesso.");
        } else {
            alert("❌ Valor inválido.");
        }
    }

    private adicionarDespesa(): void {
        const valorInput = prompt("Digite o valor da despesa:\n(Cancelar para voltar)");
        if (valorInput === null) return;

        const categoriaInput = prompt("Digite a categoria (opcional):\n(Cancelar para voltar)");
        if (categoriaInput === null) return;

        const valor = Number(valorInput);
        const categoria = categoriaInput || "geral";

        if (this.sistema.adicionarDespesa(valor, categoria)) {
            alert("✅ Despesa adicionada com sucesso.");
        } else {
            alert("❌ Valor inválido.");
        }
    }

    private listarTransacoes(): void {
        let texto = "===== TRANSAÇÕES =====\n";

        texto += this.formatarLista("Salários", this.sistema.listarSalarios());
        texto += this.formatarLista("Receitas", this.sistema.listarReceitas());
        texto += this.formatarLista("Despesas", this.sistema.listarDespesas());

        alert(texto);
    }

    private removerTransacao(): void {
        const tipoInput = prompt(`
REMOVER TRANSAÇÃO
1 - Salário
2 - Receita
3 - Despesa

(Cancelar para voltar)
`);
        if (tipoInput === null) return;

        const tipo = Number(tipoInput);
        if (tipo !== 1 && tipo !== 2 && tipo !== 3) {
            alert("❌ Tipo inválido.");
            return;
        }


        const indiceInput = prompt("Digite o índice (começa em 1):\n(Cancelar para voltar)");
        if (indiceInput === null) return;

        const indice = Number(indiceInput) - 1;

        let sucesso = false;
        if (tipo === 1) sucesso = this.sistema.removerSalario(indice);
        if (tipo === 2) sucesso = this.sistema.removerReceita(indice);
        if (tipo === 3) sucesso = this.sistema.removerDespesa(indice);

        alert(sucesso ? "✅ Removido com sucesso." : "❌ Índice inválido.");
    }

    private gerarResumo(): void {
        const r = this.sistema.gerarResumo();

        alert(`
===== RESUMO FINANCEIRO =====
Salários: R$ ${r.totalSalarios.toFixed(2)}
Receitas: R$ ${r.totalReceitas.toFixed(2)}
Despesas: R$ ${r.totalDespesas.toFixed(2)}
----------------------------
Saldo: R$ ${r.saldoRestante.toFixed(2)}
============================
`);
    }

    // ===== UTIL =====

    private formatarLista(titulo: string, lista: Transacao[]): string {
        let texto = `\n--- ${titulo} ---\n`;

        if (lista.length === 0) {
            texto += "Nenhum registro.\n";
        } else {
            lista.forEach((t, i) => {
                texto += `${i + 1} - R$ ${t.valor.toFixed(2)} (${t.categoria})\n`;
            });
        }

        return texto;
    }
}

new MenuPrompt().iniciar();
