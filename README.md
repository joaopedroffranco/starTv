# Módulo de desenvolvimento para SmartTVs 
Módulo que abstrai principais responsabilidades para desenvolvimento de aplicações Web Hosted para SmarTVs.
Com StarTV, voce consegue desenvolver o mais próximo póssivel de uma aplicação Web, se preocupando pouco com mapeamento dos controles e dependencias de cada plataforma de TV, e também na navegação entre os elementos da tela.

## Como funciona o desenvolvimento para SmartTVS?
Atualmente, há muitas plataformas para TVs: `Samsung`, `LG`, `Sony`, etc...
Cada plataforma tem seu processo e linguagem nativa (que basicamente é *javascript* também), porém, para não ter que fazer a mesma aplicação várias vezes (isto é, replicar código e funcionalidades), podemos criar uma aplicação (em *React*, por exemplo) e as aplicações nativas apenas apontam para nossa solução Web Hosted.

Legal, certo? Nem tanto, cada plataforma tem suas dependencias, seus controles remotos e seu processos especificos, e seria muito chato ter que implementar e tratar essas especialidades. Além do mais, TV não é apenas um Web Site, não tem teclado e mouse, temos que lidar com cliques dos usuários (esquerda, direita, cima, baixo). Aí que nós entramos, abstraimos isso para voce se preocupar mais com as funcionalidades reais da aplicação.

## Sample
Na pasta `/samples` voce encontra uma aplicação em *React* com um uso básico dos principais tipos de navegação (Trilhos, tanto vertical, quanto horizontal e Mosaico), com um menu lateral. Esse tipo de aplicação é muito comum nos Apps para SmartTVs. Vá para raiz da pasta e rode `npm install`, `npm start` e divirta-se!

## Status
O projeto já atende principais formas de navegação, mas estamos sempre evoluindo!
Foi testado apenas em aplicações *React*.

## Instalação
O StarTV é um módulo em *javascript*.
Execute `npm install --save startv` para instalar e salvar nas dependencias do projeto, simples.

## Como usar?
Há uma hierarquia no módulo:

Plataforma `startv/tv/plataform`
    Navegação `startv/navigation/navigation`
        Tipo (Trilho ou Mosaico) `startv/navigation/track` ou `startv/navigation/mosaic`

Em alguma das primeiras telas da sua aplicação, voce vai criar uma instancia *global* de `Plataform`.

### Plataform
Automaticamente, ele descobrirá em qual plataforma de TV voce está trabalhando, construirá uma instancia de navegação `navigation` e chamará as dependencias necessárias. A propriedade `settings` é o objeto com tudo que sua plataforma de TV possui.
Porém, não é tão mágico assim, voce precisa dizer a ele.
Como? Sua aplicação nativa deve executar um conteúdo Web Hosted da seguinte forma: `http://{dominio}/{plataform}`. Sendo que `plataform` deve ter um dos seguintes valores: 

| plataform | Plataforma |
| ------ | ------ |
| tizen | Samsung Tizen |
| webos | LG WebOS |
| netcast | LG NetCast |
| sony | Sony |
| panasonic | Panasonic |
| pc | PC * |
| mac | Mac * |

* Usados para testes rápidos em Browsers. PC e Mac são tratados diferentes pois possuem teclas diferentes.

Após isso, voce precisa montar sua navegação...

### Navigation
Como disse, sua instancia de `Plataform` possui uma propriedade `navigation` da classe `Navigation`.
Ela tem como propriedade `controls` com mapeamento dos controles remotos `(left, right, up, down, return, exit, etc...)`. Voce não sabe qual código do `left` para LG e nem da Samsung, mas voce precisa saber? Não, só precisa saber que ele clicou `left` ;)

Toda tela tem sua navegação, logo, ao ser montada sua tela, voce deve chamar o `set`, passando métodos de `onReturn` e `onExit`, métodos que serão chamados caso usuário clique no botão voltar ou sair, respectivamente, do controle remoto.

Além disso, sua tela que será responsavél em montar sua estrutura de navegação, chamando o `setType`, passando um tipo `Track` ou `Mosaic`. Falarei logo mais sobre eles.

Quando a tela tem os elementos referenciados, voce os passa chamando o método `update`.
O que são "elementos"? É a referencia pura do DOM do elemento, por exemplo: `<a/>` ou `<button/>`. (Aviso: `<div/>` não é navegável).

Construída a estrutura, a tela adiciona um listerner `keydown`, que chama o método `move`, passando o `keycode` do `event`. O módulo saberá o que fazer com o foco na tela, seguindo a estrutura de navegação que voce construiu.

####  Trilhos
É um tipo de navegação, chamada `Track`. Pode ser horizontal e vertical, ambas tem a mesma lógica, basicamente a diferença é que ação do `left` de um é o `up` do outro.

Como ela funciona? Aplicações para SmartTVs seguem muito o esquema de trilhos, para listar vídeos, imagens ou outros contéudos.
Uma navegação desse tipo possui um `index` e vários grupos, sendo cada um com seu `index`, ou seja, um `Track` do tipo horizontal, que vai para cima ou para baixo, muda o `index` do `Track`, que representa qual grupo que o foco está. Quando vai para esquerda ou para direita, muda o `index` do grupo, que representa o elemento em si.

Tecnicamente falando, ao instanciar um `Track`, voce passa qual o `index` inicial (default é 0), se é `vertical` (true ou false), e qual `index` dentro do grupo atual (default é 0, esse é mais usado para assegurar o último estado da navegação).

Os elementos devem ser passados dessa forma: `[[<a/>,<a/>,<a/>], [<a/>,<a/>,<a/>], ...]`.

####  Mosaico
É um tipo de navegação, chamada `Mosaic`.

Como ela funciona? É uma estrutura parecida com `Track`, porém, ela se assemelha com comportamento de uma matriz.
Uma navegação desse tipo possui um `x` e um `y`. Ao ir para cima ou para baixa, muda o x. Ao ir para esquerda ou para direita, muda o y.

Tecnicamente falando, ao instanciar um `Mosaic`, voce passa qual o `x` (default é 0) e qual é o `y` (default é 0).

Os elementos devem ser passados dessa forma: `[[<a/>,<a/>,<a/>], [<a/>,<a/>,<a/>], ...]`.





