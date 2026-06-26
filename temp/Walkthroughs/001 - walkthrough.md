# Walkthrough — Refatoração Arquitetural Concluída

## Resultado da Compilação

```
$ ./node_modules/.bin/tsc --noEmit

✅ 0 erros  |  0 avisos
```

---

## Estrutura Final

```
source/
├── dominio/                          ← Camada mais interna. Zero dependências externas.
│   ├── entidades/
│   │   └── Transacao.ts             ← Dados imutáveis. Sem lógica de validação.
│   ├── enumeradores/
│   │   └── TipoTransacao.ts         ← Substitui strings mágicas por enum tipado.
│   ├── excecoes/
│   │   └── ValorInvalidoErro.ts     ← Exceção de domínio semântica.
│   ├── interfaces/
│   │   ├── IRepositorioTransacoes.ts ← Contrato de persistência (ponto DIP central).
│   │   └── IResumoFinanceiro.ts     ← Contrato do objeto de valor.
│   └── objetos-de-valor/
│       └── ResumoFinanceiro.ts      ← Value Object imutável.
│
├── aplicacao/                        ← Orquestração. Depende só do domínio.
│   ├── casos-de-uso/
│   │   ├── AdicionarSalario.ts
│   │   ├── AdicionarReceita.ts
│   │   ├── AdicionarDespesa.ts
│   │   ├── RemoverTransacao.ts
│   │   ├── ListarTransacoes.ts
│   │   └── GerarResumo.ts
│   └── servicos/
│       └── ServicoFinanceiro.ts     ← Facade sobre os casos de uso.
│
├── infraestrutura/                   ← Implementações concretas. Camada isolada.
│   └── repositorios/
│       └── RepositorioEmMemoria.ts  ← Implementa IRepositorioTransacoes.
│
├── apresentacao/                     ← UI. Depende só da camada de aplicação.
│   └── prompt/
│       ├── MenuPrompt.ts            ← Fluxo de interação via prompt/alert.
│       └── FormatadorTexto.ts       ← Formatação de strings extraída do menu.
│
├── main/                             ← Composição. Único local com concretos.
│   ├── fabricas/
│   │   └── FabricaSistema.ts        ← Factory Method. Monta e injeta dependências.
│   └── index.ts                     ← Entry point minimalista.
│
└── index.html                        ← Inicialização via Parcel.
```

---

## O que Mudou e Por Quê

### Domínio

| Arquivo | Mudança | Princípio |
|---|---|---|
| `Transacao.ts` | Removida `validar()`. Adicionado `id`. Campos `readonly`. Usa `TipoTransacao`. | SRP |
| `TipoTransacao.ts` | **[NOVO]** Enum substitui strings `"salario"`, `"receita"`, `"despesa"` | OCP, eliminação de números mágicos |
| `ResumoFinanceiro.ts` | Movido para domínio. Implementa `IResumoFinanceiro`. Campos `readonly`. | SRP, LSP |
| `IRepositorioTransacoes.ts` | **[NOVO]** Contrato de persistência. Ponto central do DIP. | DIP, Strategy |
| `IResumoFinanceiro.ts` | **[NOVO]** Interface do Value Object de resumo. | ISP, DIP |
| `ValorInvalidoErro.ts` | **[NOVO]** Exceção semântica de domínio. | SRP, Clean Code |

### Aplicação

| Arquivo | Mudança | Princípio |
|---|---|---|
| `AdicionarSalario.ts` | **[NOVO]** Caso de uso isolado com validação própria | SRP, Command |
| `AdicionarReceita.ts` | **[NOVO]** Caso de uso isolado | SRP, Command |
| `AdicionarDespesa.ts` | **[NOVO]** Caso de uso isolado | SRP, Command |
| `RemoverTransacao.ts` | **[NOVO]** Remoção por tipo e índice | SRP, Command |
| `ListarTransacoes.ts` | **[NOVO]** Consulta pura sem efeitos colaterais | SRP, Command |
| `GerarResumo.ts` | **[NOVO]** Cálculo financeiro extraído de `SistemaFinanceiro` | SRP |
| `ServicoFinanceiro.ts` | Substitui `SistemaFinanceiro`. Recebe repositório por injeção. | DIP, Facade |

### Infraestrutura

| Arquivo | Mudança | Princípio |
|---|---|---|
| `RepositorioEmMemoria.ts` | **[NOVO]** Substitui `ListaTransacoes`. Usa `Map` para eliminar triplicação. | Strategy, LSP |

### Apresentação

| Arquivo | Mudança | Princípio |
|---|---|---|
| `MenuPrompt.ts` | Recebe `ServicoFinanceiro` por injeção. Usa constantes no lugar de números mágicos. | DIP, SRP |
| `FormatadorTexto.ts` | **[NOVO]** Toda formatação extraída do `MenuPrompt`. | SRP |

### Main

| Arquivo | Mudança | Princípio |
|---|---|---|
| `FabricaSistema.ts` | **[NOVO]** Único ponto que conhece implementações concretas. | Factory Method, DIP |
| `index.ts` | Reduzido a 2 linhas — usa apenas a fábrica. | SRP |

---

## Arquivos Removidos

| Arquivo | Substituído por |
|---|---|
| `core/IFinanceiro.ts` | `IRepositorioTransacoes.ts` + `IResumoFinanceiro.ts` (ISP: interfaces menores) |
| `core/ListaTransacoes.ts` | `RepositorioEmMemoria.ts` |
| `core/SistemaFinanceiro.ts` | `ServicoFinanceiro.ts` + 6 casos de uso |
| `models/Transacao.ts` | `dominio/entidades/Transacao.ts` |
| `models/ResumoFinanceiro.ts` | `dominio/objetos-de-valor/ResumoFinanceiro.ts` |
| `app/index.ts` | `main/index.ts` |
| `app/menuPrompt.ts` | `apresentacao/prompt/MenuPrompt.ts` |

---

## Como Adicionar um Banco de Dados no Futuro

Para adotar SQLite, por exemplo, basta:

1. Criar `source/infraestrutura/repositorios/RepositorioSQLite.ts` implementando `IRepositorioTransacoes`
2. Alterar **apenas** `FabricaSistema.ts`:

```diff
- const repositorio = new RepositorioEmMemoria();
+ const repositorio = new RepositorioSQLite(conexao);
```

**Zero alterações** em domínio, aplicação ou apresentação.

---

## Como Adicionar uma API REST no Futuro

1. Criar `source/apresentacao/api/ControladorFinanceiro.ts` recebendo `ServicoFinanceiro`
2. Alterar `FabricaSistema.ts` para criar um `ControladorFinanceiro` ao invés de `MenuPrompt`

**Zero alterações** em domínio, aplicação ou infraestrutura.
