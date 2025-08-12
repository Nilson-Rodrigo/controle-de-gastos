"use strict";
class ControleDeGastos {
    constructor() {
        this.listaSalarios = [];
        this.listaReceitas = [];
        this.listaDespesas = [];
        this.listaDespesas = [];
        this.listaReceitas = [];
        this.listaSalarios = [];
    }
    descricao() {
        return `Este programa foi desenvolvido para ajudar você a controlar seus gastos mensais de forma simples e prática. Com ele, você poderá registrar tudo o que ganha (suas receitas) e tudo o que gasta (suas despesas),acompanhando em tempo real o seu saldo disponível`;
    }
    iniciar() {
        alert(this.descricao());
        let respostaDoUsuario = 0;
        while (respostaDoUsuario != 8) {
            respostaDoUsuario = Number(prompt(`Digite:
1 - Adicionar Salário
2 - Adicionar Receita
3 - Adicionar Despesas
4 - Remover
5 - Consultar
6 - Gerar Resumo
7 - Reiniciar
8 - Sair
`));
            if (respostaDoUsuario == 1) {
                this.perguntarSalario();
            }
            if (respostaDoUsuario == 2) {
                this.perguntarReceitas();
            }
            if (respostaDoUsuario == 3) {
                this.perguntarDespesas();
            }
            if (respostaDoUsuario == 4) {
                this.remover();
            }
            if (respostaDoUsuario == 5) {
                this.consultarDadosFinanceiros();
            }
            if (respostaDoUsuario == 6) {
                if (this.verificarHistorico() == true) {
                    alert(this.historico());
                }
                else {
                    alert('Não há dados registrados');
                }
            }
            if (respostaDoUsuario == 7) {
                this.reeniciarTudo();
            }
            if (respostaDoUsuario !== 1 && respostaDoUsuario !== 2 && respostaDoUsuario !== 3 && respostaDoUsuario !== 4 && respostaDoUsuario !== 5 && respostaDoUsuario !== 6 && respostaDoUsuario !== 7 && respostaDoUsuario !== 8) {
                alert('Digite 8 para sair');
            }
        }
    }
    perguntarSalario() {
        let instrucao = 0;
        while (instrucao !== 2) {
            instrucao = Number(prompt(`1 - adicionar \n2 - sair `));
            if (instrucao !== 1 && instrucao !== 2) {
                alert('Erro ao digitar, verifique se você digitou o número certo');
            }
            else if (instrucao != 2) {
                let adiciona = Number(prompt('Digite o valor do salário'));
                if (!isNaN(adiciona) && adiciona != 0) {
                    this.listaSalarios.push(adiciona);
                }
                else {
                    alert('Erro ao digitar, verifique se você digitou o número certo');
                }
            }
        }
    }
    perguntarDespesas() {
        let instrucao = 1;
        while (instrucao !== 2) {
            instrucao = Number(prompt(`1 - adicionar \n2 - sair `));
            if (instrucao !== 1 && instrucao !== 2) {
                alert('Erro ao digitar, verifique se você digitou o número certo');
            }
            else if (instrucao != 2) {
                let adiciona = Number(prompt('Digite o valor da despesa'));
                if (!isNaN(adiciona) && adiciona != 0) {
                    this.listaDespesas.push(adiciona);
                }
                else {
                    alert('Erro ao digitar, verifique se você digitou o número certo');
                }
            }
        }
    }
    perguntarReceitas() {
        let instrucao = 1;
        while (instrucao !== 2) {
            instrucao = Number(prompt(`1 - adicionar \n2 - sair `));
            if (instrucao !== 1 && instrucao !== 2) {
                alert('Erro ao digitar, verifique se você digitou o número certo');
            }
            else if (instrucao != 2) {
                let adiciona = Number(prompt('Digite o valor da despesa'));
                if (!isNaN(adiciona) && adiciona != 0) {
                    this.listaReceitas.push(adiciona);
                }
                else {
                    alert('Erro ao digitar, verifique se você digitou o número certo');
                }
            }
        }
    }
    calcularSalario() {
        let acumulaSalrio = 0;
        for (let i = 0; i < this.listaSalarios.length; i++) {
            acumulaSalrio += this.listaSalarios[i];
        }
        return acumulaSalrio;
    }
    calcularReceita() {
        let acumulaReceita = 0;
        for (let i = 0; i < this.listaReceitas.length; i++) {
            acumulaReceita += this.listaReceitas[i];
        }
        return acumulaReceita;
    }
    calcularDespesa() {
        let acumulaDespesa = 0;
        for (let i = 0; i < this.listaDespesas.length; i++) {
            acumulaDespesa += this.listaDespesas[i];
        }
        return acumulaDespesa;
    }
    consultarDadosFinanceiros() {
        let opcao = Number(prompt(`Qual informação você deseja consultar?
    1 - Salário
    2 - Receitas
    3 - Despesas`));
        if (opcao == 1) {
            if (this.listaSalarios.length != 0) {
                let salarios = `=====SALARIOS===== \n`;
                for (let i = 0; i < this.listaSalarios.length; i++) {
                    salarios += `${i + 1} - R$ ${this.listaSalarios[i].toFixed(2)} \n`;
                }
                alert(salarios);
            }
            else {
                alert('Você não tem salários registradas');
            }
        }
        else if (opcao == 2) {
            if (this.listaReceitas.length != 0) {
                let receitas = `===== RECEITAS ===== \n`;
                for (let i = 0; i < this.listaReceitas.length; i++) {
                    receitas += `${i + 1} - R$ ${this.listaReceitas[i].toFixed(2)}\n`;
                }
                alert(receitas);
            }
            else {
                alert('Você não tem receitas registradas');
            }
        }
        else if (opcao == 3) {
            if (this.listaDespesas.length != 0) {
                let despesas = `===== DESPESAS ===== \n`;
                for (let i = 0; i < this.listaDespesas.length; i++) {
                    despesas += `${i + 1} - R$ ${this.listaDespesas[i].toFixed(2)}\n`;
                }
                alert(despesas);
            }
            else {
                alert('Você não tem despesas registradas');
            }
        }
        else {
            alert(`Opção inválida. Por favor, digite 1, 2 ou 3.`);
        }
    }
    removerSalario() {
        if (this.listaSalarios.length === 0) {
            alert("Não há salários para remover.");
            return;
        }
        let texto = "===== RECEITAS =====\n";
        for (let i = 0; i < this.listaSalarios.length; i++) {
            texto += `${i + 1} - R$ ${this.listaSalarios[i].toFixed(2)}\n`;
        }
        let indice = Number(prompt(`${texto}\nDigite o número da receita que deseja remover:`));
        if (!isNaN(indice) && indice >= 1 && indice <= this.listaSalarios.length) {
            this.listaSalarios.splice(indice - 1, 1);
            alert("Salário removido com sucesso.");
        }
        else {
            alert("Índice inválido.");
        }
    }
    removerReceita() {
        if (this.listaReceitas.length === 0) {
            alert("Não há receitas para remover.");
            return;
        }
        let texto = "===== RECEITAS =====\n";
        for (let i = 0; i < this.listaReceitas.length; i++) {
            texto += `${i + 1} - R$ ${this.listaReceitas[i].toFixed(2)}\n`;
        }
        let indice = Number(prompt(`${texto}\nDigite o número da receita que deseja remover:`));
        if (!isNaN(indice) && indice >= 1 && indice <= this.listaReceitas.length) {
            this.listaReceitas.splice(indice - 1, 1);
            alert("Receita removida com sucesso.");
        }
        else {
            alert("Índice inválido.");
        }
    }
    removerDespesa() {
        if (this.listaDespesas.length === 0) {
            alert("Não há despesas para remover.");
            return;
        }
        let texto = "===== DESPESAS =====\n";
        for (let i = 0; i < this.listaDespesas.length; i++) {
            texto += `${i + 1} - R$ ${this.listaDespesas[i].toFixed(2)}\n`;
        }
        let indice = Number(prompt(`${texto}\nDigite o número da despesa que deseja remover:`));
        if (!isNaN(indice) && indice >= 1 && indice <= this.listaDespesas.length) {
            this.listaDespesas.splice(indice - 1, 1);
            alert("Despesa removida com sucesso.");
        }
        else {
            alert("Índice inválido.");
        }
    }
    remover() {
        let removerOpcao = Number(prompt(`O que deseja remover?
    1 - Salário
    2 - Receita
    3 - Despesa `));
        if (removerOpcao == 1) {
            this.removerSalario();
        }
        if (removerOpcao == 2) {
            this.removerReceita();
        }
        if (removerOpcao == 3) {
            this.removerDespesa();
        }
        if (removerOpcao !== 1 && removerOpcao !== 2 && removerOpcao !== 3) {
            alert("Opção inválida.");
        }
    }
    historico() {
        let salario = this.calcularSalario().toFixed(2);
        let totalReceitas = this.calcularReceita().toFixed(2);
        let totalDespesas = this.calcularDespesa().toFixed(2);
        let valorRestante = (this.calcularSalario() + this.calcularReceita() - this.calcularDespesa()).toFixed(2);
        return `RESUMO FINANCEIRO
SALDO INICIAL: R$ ${salario}
TOTAL DE RECEITAS: R$ ${totalReceitas}
TOTAL DE DESPESAS: R$ ${totalDespesas}
VALOR RESTANTE: R$ ${valorRestante}`;
    }
    verificarHistorico() {
        if (this.calcularSalario() == 0 && this.calcularDespesa() == 0 && this.calcularReceita() == 0) {
            return false;
        }
        return true;
    }
    reeniciarTudo() {
        this.listaSalarios = [];
        this.listaReceitas = [];
        this.listaDespesas = [];
        alert('Programa reeiniciado com sucesso');
    }
}
let usuario = new ControleDeGastos();
usuario.iniciar();
