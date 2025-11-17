import { ListaFinancas } from "../ts/lista-de-financas";
import { MenuPrincipal } from "../ts/menu-principal";

export class ControleDeGastos {
    private salarios = new ListaFinancas();
    private receitas = new ListaFinancas();
    private despesas = new ListaFinancas();
    private menu = new MenuPrincipal(this.salarios, this.receitas, this.despesas);

    public iniciar(): void {
        this.menu.exibir();
    }
}
