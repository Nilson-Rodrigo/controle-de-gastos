# Tarefas — Refatoração Arquitetural

## Domínio
- [x] `dominio/enumeradores/TipoTransacao.ts`
- [x] `dominio/entidades/Transacao.ts`
- [x] `dominio/objetos-de-valor/ResumoFinanceiro.ts`
- [x] `dominio/interfaces/IRepositorioTransacoes.ts`
- [x] `dominio/interfaces/IResumoFinanceiro.ts`
- [x] `dominio/excecoes/ValorInvalidoErro.ts`

## Aplicação
- [x] `aplicacao/casos-de-uso/AdicionarSalario.ts`
- [x] `aplicacao/casos-de-uso/AdicionarReceita.ts`
- [x] `aplicacao/casos-de-uso/AdicionarDespesa.ts`
- [x] `aplicacao/casos-de-uso/RemoverTransacao.ts`
- [x] `aplicacao/casos-de-uso/ListarTransacoes.ts`
- [x] `aplicacao/casos-de-uso/GerarResumo.ts`
- [x] `aplicacao/servicos/ServicoFinanceiro.ts`

## Infraestrutura
- [x] `infraestrutura/repositorios/RepositorioEmMemoria.ts`

## Apresentação
- [x] `apresentacao/prompt/FormatadorTexto.ts`
- [x] `apresentacao/prompt/MenuPrompt.ts`

## Main / Composição
- [x] `main/fabricas/FabricaSistema.ts`
- [x] `main/index.ts`
- [x] `index.html` (atualizar src)

## Limpeza
- [x] Remover `source/core/IFinanceiro.ts`
- [x] Remover `source/core/ListaTransacoes.ts`
- [x] Remover `source/core/SistemaFinanceiro.ts`
- [x] Remover `source/models/ResumoFinanceiro.ts`
- [x] Remover `source/models/Transacao.ts`
- [x] Remover `source/app/index.ts`
- [x] Remover `source/app/menuPrompt.ts`

## Verificação
- [x] Compilar sem erros (`tsc --noEmit`) — ✅ 0 erros
