---
# Estes são elementos de metadados opcionais. Sinta-se à vontade para remover qualquer um deles.
status: "{proposto | rejeitado | aceito | obsoleto | … | substituído por ADR-0123}"
data: {AAAA-MM-DD quando a decisão foi atualizada pela última vez}
decisores: {lista todos os envolvidos na decisão}
consultados: {lista todos aqueles cujas opiniões são solicitadas (tipicamente especialistas no assunto); e com quem há uma comunicação bidirecional}
informados: {lista todos que são mantidos atualizados sobre o progresso; e com quem há uma comunicação unidirecional}
---

# {título curto, representativo do problema resolvido e da solução encontrada}

## Contexto e Declaração do Problema

{Descreva o contexto e a declaração do problema, por exemplo, em formato livre usando duas ou três frases ou na forma de uma história ilustrativa. Você pode querer articular o problema em forma de pergunta. Considere adicionar links para quadros de colaboração ou sistemas de gerenciamento de issues. Torne o escopo da decisão explícito, por exemplo, indicando ou apontando elementos de arquitetura estrutural (componentes, conectores, ...).}

<!-- Este é um elemento opcional. Sinta-se à vontade para remover. -->
## Direcionadores da Decisão

* {direcionador da decisão 1, por exemplo, uma qualidade de software desejada, preocupação enfrentada, restrição ou força}
* {direcionador da decisão 2}
* … <!-- o número de direcionadores pode variar -->

## Opções Consideradas

* {título da opção 1}
* {título da opção 2}
* {título da opção 3}
* … <!-- o número de opções pode variar -->

## Resultado da Decisão

Opção escolhida: "{título da opção 1}", porque {justificativa. Ex.: única opção que atende ao critério de eliminação direcionador da decisão | que resolve a força {força} | … | é a melhor (veja abaixo)}.

<!-- Este é um elemento opcional. Sinta-se à vontade para remover. -->
### Consequências

* Boa, porque {consequência positiva, ex.: melhoria de uma ou mais qualidades desejadas, …}
* Ruim, porque {consequência negativa, ex.: comprometimento de uma ou mais qualidades desejadas, …}
* … <!-- o número de consequências pode variar -->

<!-- Este é um elemento opcional. Sinta-se à vontade para remover. -->
### Confirmação

{Descreva como a implementação / conformidade com o ADR pode/será confirmada. Existe alguma função de adequação automatizada ou manual? Se sim, liste-a e explique como ela é aplicada. O design escolhido e sua implementação estão alinhados com a decisão? Ex.: uma revisão de design/código ou um teste com uma biblioteca como ArchUnit pode ajudar a validar isso. Observe que, embora classifiquemos este elemento como opcional, ele está incluído em muitos ADRs.}

<!-- Este é um elemento opcional. Sinta-se à vontade para remover. -->
## Prós e Contras das Opções

### {título da opção 1}

<!-- Este é um elemento opcional. Sinta-se à vontade para remover. -->
{exemplo | descrição | ponteiro para mais informações | …}

* Bom, porque {argumento a}
* Bom, porque {argumento b}
<!-- use "neutro" se o argumento dado não pesar nem a favor nem contra -->
* Neutro, porque {argumento c}
* Ruim, porque {argumento d}
* … <!-- o número de prós e contras pode variar -->

### {título da outra opção}

{exemplo | descrição | ponteiro para mais informações | …}

* Bom, porque {argumento a}
* Neutro, porque {argumento b}
* Ruim, porque {argumento c}
* …

<!-- Este é um elemento opcional. Sinta-se à vontade para remover. -->
## Mais Informações

{Você pode querer fornecer evidências/confiança adicionais para o resultado da decisão aqui e/ou documentar o acordo da equipe sobre a decisão e/ou definir quando/como esta decisão deve ser realizada e se/quando ela deve ser revisitada. Links para outras decisões e recursos podem aparecer aqui também.}