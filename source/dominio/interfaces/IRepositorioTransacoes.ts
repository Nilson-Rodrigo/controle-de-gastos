import { Transacao } from "../entidades/Transacao";
import { TipoTransacao } from "../enumeradores/TipoTransacao";

/**
 * Contrato de persistência de transações financeiras.
 *
 * Decisão arquitetural (DIP + Strategy + OCP):
 * Esta interface é o ponto central do princípio de Inversão de Dependência.
 * A camada de aplicação depende APENAS desta abstração.
 * A camada de infraestrutura fornece as implementações concretas.
 *
 * Isso permite que no futuro sejam criadas novas implementações:
 *   - RepositorioEmMemoria (atual)
 *   - RepositorioSQLite
 *   - RepositorioPostgres
 *   - RepositorioMongo
 * ...sem alterar nenhuma linha de lógica de negócio.
 */
export interface IRepositorioTransacoes {
    adicionar(transacao: Transacao): void;
    remover(tipo: TipoTransacao, indice: number): boolean;
    listar(tipo: TipoTransacao): Transacao[];
    somar(tipo: TipoTransacao): number;
}
