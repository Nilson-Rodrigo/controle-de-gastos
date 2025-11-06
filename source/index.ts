import { Aluno } from "./aluno.js";
import { ControleDeGastos } from "./app/ControleDeGastos.js";

const aluno1 = new Aluno('Rikelry Monteiro Souza', '2025116TADS0025');
const app = new ControleDeGastos();

aluno1.exibirInfo();
app.iniciar();
