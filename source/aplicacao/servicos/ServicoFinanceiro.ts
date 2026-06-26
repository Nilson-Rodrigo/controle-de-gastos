import { IRepositorioTransacoes } from "../../dominio/interfaces/IRepositorioTransacoes";
import { IResumoFinanceiro } from "../../dominio/interfaces/IResumoFinanceiro";
import { Transacao } from "../../dominio/entidades/Transacao";
import { TipoTransacao } from "../../dominio/enumeradores/TipoTransacao";
import { AdicionarSalario } from "../casos-de-uso/AdicionarSalario";
import { AdicionarReceita } from "../casos-de-uso/AdicionarReceita";
import { AdicionarDespesa } from "../casos-de-uso/AdicionarDespesa";
import { RemoverTransacao } from "../casos-de-uso/RemoverTransacao";
import { ListarTransacoes } from "../casos-de-uso/ListarTransacoes";
import { GerarResumo } from "../casos-de-uso/GerarResumo";

/**
 * Serviço de aplicação que orquestra os casos de uso financeiros.
 *
 * Decisão arquitetural (DIP + Facade):
 * Este serviço recebe IRepositorioTransacoes por injeção de dependência,
 * nunca instanciando uma implementação concreta.
 * Atua como Facade para a camada de apresentação, oferecendo uma API
 * coesa e simplificada sem expor os casos de uso individuais.
 *
 * A camada de apresentação (MenuPrompt, futura API REST, futura GUI)
 * depende apenas deste serviço — sem conhecer os casos de uso internos.
 */
export class ServicoFinanceiro {
    private readonly adicionarSalarioCasoDeUso: AdicionarSalario;
    private readonly adicionarReceitaCasoDeUso: AdicionarReceita;
    private readonly adicionarDespesaCasoDeUso: AdicionarDespesa;
    private readonly removerTransacaoCasoDeUso: RemoverTransacao;
    private readonly listarTransacoesCasoDeUso: ListarTransacoes;
    private readonly gerarResumoCasoDeUso: GerarResumo;

    constructor(repositorio: IRepositorioTransacoes) {
        this.adicionarSalarioCasoDeUso = new AdicionarSalario(repositorio);
        this.adicionarReceitaCasoDeUso = new AdicionarReceita(repositorio);
        this.adicionarDespesaCasoDeUso = new AdicionarDespesa(repositorio);
        this.removerTransacaoCasoDeUso = new RemoverTransacao(repositorio);
        this.listarTransacoesCasoDeUso = new ListarTransacoes(repositorio);
        this.gerarResumoCasoDeUso = new GerarResumo(repositorio);
    }

    adicionarSalario(valor: number): void {
        this.adicionarSalarioCasoDeUso.executar(valor);
    }

    adicionarReceita(valor: number, categoria?: string): void {
        this.adicionarReceitaCasoDeUso.executar(valor, categoria);
    }

    adicionarDespesa(valor: number, categoria?: string): void {
        this.adicionarDespesaCasoDeUso.executar(valor, categoria);
    }

    removerTransacao(tipo: TipoTransacao, indice: number): boolean {
        return this.removerTransacaoCasoDeUso.executar(tipo, indice);
    }

    listarTransacoes(tipo: TipoTransacao): Transacao[] {
        return this.listarTransacoesCasoDeUso.executar(tipo);
    }

    gerarResumo(): IResumoFinanceiro {
        return this.gerarResumoCasoDeUso.executar();
    }
}
