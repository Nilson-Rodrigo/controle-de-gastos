import { IRepositorioTransacoes } from "../../dominio/interfaces/IRepositorioTransacoes";
import { Transacao } from "../../dominio/entidades/Transacao";
import { TipoTransacao } from "../../dominio/enumeradores/TipoTransacao";

/**
 * Caso de uso: Listar Transações por tipo.
 *
 * Decisão arquitetural (SRP + ISP):
 * A consulta é uma operação de leitura pura, sem efeitos colaterais.
 * Separada em caso de uso próprio para que possa ser reutilizada
 * por qualquer interface (CLI, API REST, GUI) sem duplicação de lógica.
 */
export class ListarTransacoes {
    constructor(private readonly repositorio: IRepositorioTransacoes) {}

    executar(tipo: TipoTransacao): Transacao[] {
        return this.repositorio.listar(tipo);
    }
}
