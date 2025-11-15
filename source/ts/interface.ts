export class InterfaceDoUsuario {

    /* * * * * MÉTODOS DE ENTRADA DO USUÁRIO * * * * */

    public static obterOpcaoMenuPrincipal(): number {
        const input = prompt(`MENU PRINCIPAL - Digite a opção desejada:

    1 - Adicionar Salário
    2 - Adicionar Receita
    3 - Adicionar Despesa
    4 - Remover Item
    5 - Consultar Registros
    6 - Gerar Resumo
    7 - Reiniciar Sistema
    8 - Sair do Programa`);
        
        if (input === null) {
            return 8;
        }
        
        return Number(input);
    }

    public static obterOpcaoAdicionar(tipo: string): number {
        const input = prompt(`ADICIONAR ${tipo.toUpperCase()}:

    1 - Adicionar ${tipo}
    2 - Voltar ao menu`);
        
        if (input === null) {
            return 2;
        }
        
        return Number(input);
    }

    public static obterOpcaoRemover(): number {
        const input = prompt(`REMOVER ITEM - Selecione o tipo:

    1 - Salário
    2 - Receita
    3 - Despesa`);
        
        if (input === null) {
            return -1;
        }
        
        return Number(input);
    }

    public static obterOpcaoConsultar(): number {
        const input = prompt(`CONSULTAR REGISTROS - Selecione o tipo:

    1 - Salários
    2 - Receitas
    3 - Despesas`);
        
        if (input === null) {
            return -1;
        }
        
        return Number(input);
    }

    public static obterValor(tipo: string): number {
        const input = prompt(`DIGITE O VALOR:

    Digite o valor da ${tipo}:`);
        
        if (input === null) {
            return NaN;
        }
        
        return Number(input);
    }

    public static obterIndiceRemocao(texto: string): number {
        const input = prompt(`${texto}

    Digite o número do item que deseja remover:`);
        
        if (input === null) {
            return NaN;
        }
        
        return Number(input);
    }

    /* * * * * MÉTODOS DE EXIBIÇÃO * * * * */

    public static exibirMensagem(mensagem: string): void {
        alert(mensagem);
    }

    public static exibirDescricao(descricao: string): void {
        alert(descricao);
    }

    public static exibirLista(texto: string): void {
        alert(texto);
    }

    /* * * * * MENSAGENS PADRÃO DO SISTEMA * * * * */
    
    public static readonly MENSAGENS = {
        SUCESSO_ADICIONAR: "✅ Valor adicionado com sucesso!",
        ERRO_VALOR: "❌ Erro ao processar valor, verifique os dados informados!",
        SUCESSO_REMOVER: "✅ Item removido com sucesso.",
        INDICE_INVALIDO: "❌ Índice inválido. Tente novamente.",
        NENHUM_ITEM: "ℹ️ Nenhum item disponível para remover.",
        SEM_REGISTROS: (tipo: string) => `📭 Você não tem ${tipo} registradas.`,
        OPCAO_INVALIDA: "❌ Opção inválida. Selecione uma opção válida.",
        SAINDO: "👋 Saindo do programa...",
        REINICIADO: "🔄 Sistema reiniciado com sucesso!",
        SEM_DADOS: "📊 Não há dados registrados no sistema."
    };
}