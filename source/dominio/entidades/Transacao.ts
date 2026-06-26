import { TipoTransacao } from "../enumeradores/TipoTransacao";

/**
 * Entidade de domínio que representa uma transação financeira.
 *
 * Decisão arquitetural (SRP):
 * A entidade é responsável apenas por guardar os dados de uma transação.
 * A validação de entrada foi removida desta classe e delegada aos casos de uso,
 * que são o local correto para aplicar regras de negócio sobre dados recebidos.
 *
 * A propriedade `id` foi adicionada para permitir identificação única futura
 * (necessária para persistência em banco de dados).
 */
export class Transacao {
    public readonly id: string;

    constructor(
        public readonly valor: number,
        public readonly tipo: TipoTransacao,
        public readonly categoria: string = "geral",
        public readonly data: Date = new Date()
    ) {
        this.id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }
}
