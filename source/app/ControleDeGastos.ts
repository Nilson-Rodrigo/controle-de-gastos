import { ListaFinancas } from "../core/ListaFinancas.js";
import { MenuPrincipal } from "../core/MenuPrincipal.js";

export class ControleDeGastos {
    private salarios = new ListaFinancas();
    private receitas = new ListaFinancas();
    private despesas = new ListaFinancas();
    private menu = new MenuPrincipal(this.salarios, this.receitas, this.despesas);

    public iniciar(): void {
        this.menu.exibir();
    }
}
