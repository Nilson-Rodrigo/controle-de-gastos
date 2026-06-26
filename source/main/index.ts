import { FabricaSistema } from "./fabricas/FabricaSistema";

/**
 * Ponto de entrada da aplicação.
 *
 * Decisão arquitetural (Clean Architecture):
 * O entry point é propositalmente minimalista.
 * Sua única responsabilidade é solicitar à fábrica um sistema montado e iniciá-lo.
 * Não conhece repositórios, serviços ou casos de uso — apenas a fábrica.
 */
FabricaSistema.criarMenuPrompt().iniciar();
