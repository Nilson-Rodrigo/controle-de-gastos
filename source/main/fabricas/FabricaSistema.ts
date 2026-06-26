import { RepositorioEmMemoria } from "../../infraestrutura/repositorios/RepositorioEmMemoria";
import { ServicoFinanceiro } from "../../aplicacao/servicos/ServicoFinanceiro";
import { MenuPrompt } from "../../apresentacao/prompt/MenuPrompt";

/**
 * Fábrica do sistema financeiro.
 *
 * Decisão arquitetural (Factory Method + DIP):
 * Este é o ÚNICO ponto do sistema que conhece as implementações concretas.
 * Toda a lógica de wiring (composição de dependências) está centralizada aqui.
 *
 * Para trocar a persistência para SQLite no futuro, basta alterar apenas esta classe:
 *   const repositorio = new RepositorioSQLite(conexao);  // em vez de RepositorioEmMemoria
 *
 * O restante do sistema (casos de uso, serviços, apresentação) permanece intacto.
 */
export class FabricaSistema {
    static criarMenuPrompt(): MenuPrompt {
        const repositorio = new RepositorioEmMemoria();
        const servico = new ServicoFinanceiro(repositorio);
        return new MenuPrompt(servico);
    }
}
