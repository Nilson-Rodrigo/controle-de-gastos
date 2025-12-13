import { SistemaFinanceiro } from "../core/SistemaFinanceiro";

const sistema = new SistemaFinanceiro();

sistema.adicionarSalario(2000);
sistema.adicionarDespesa(500, "alimentação");

console.log(sistema.gerarResumo());
