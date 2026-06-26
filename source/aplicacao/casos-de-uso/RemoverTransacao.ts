import { IRepositorioTransacoes } from "../../dominio/interfaces/IRepositorioTransacoes";
import { TipoTransacao } from "../../dominio/enumeradores/TipoTransacao";

/**
 * Caso de uso: Remover Transação por tipo e índice.
 *
 * Decisão arquitetural (SRP + Command):
 * Encapsula a operação de remoção. O índice é baseado em zero internamente;
 * a conversão de índice baseado em 1 (apresentado ao usuário) para 0 é
 * responsabilidade da camada de apresentação, não deste caso de uso.
 */
export class RemoverTransacao {
    constructor(private readonly repositorio: IRepositorioTransacoes) {}

    executar(tipo: TipoTransacao, indice: number): boolean {
        return this.repositorio.remover(tipo, indice);
    }
}
