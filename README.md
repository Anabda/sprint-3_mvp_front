# Aparelhos eletrônicos

Esse projeto tem como objetivo permitir um usuário realizar as ações de listar, cadastrar, editar e excluir aparelhos eletrônicos 

---
## Como executar em modo de desenvolvimento

1- Rodar a API localmente de acordo com as instruções da API.

2- Abrir o arquivo index.html no seu browser.

## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t mvp_front .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run --rm -p 8080:80 mvp_front
```

Uma vez executando, para acessar o front-end, basta abrir o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.

## Integração com API externa

### API de exportar excel
A API externa com a qual a integração foi realizada tem como objetivo gerar excel, onde toda a API e documentação estão disponíveis no [link] (https://github.com/SheetJS/sheetjs)
Para usar, não é necessário nenhuma licença de uso nem criação de usuário. A API utiliza licença Apache License 2.0. A classe XLSX do [script](https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js).

### API de anúncios Google
Também inclui um script que gera um anúncio google, integrando com a API de anúncios da google a ser verificado no [script]("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4419637163319530"). Segui a documentação da API do goolge e a requisição está funcionando (ao inspecionar o código da página é possível ver a requisição recebendo 200), mas não aparece, pois para aparecer o anúncio o Google precisa aprovar o site publicado - e eu não possuo um. Para realizar a integração é preciso:
1- Criar uma conta AdSense
2- Logar na conta AdSense
3- Ir em "Anúncios" e depois em "Receber código"
4- Copiar o código e inserir no head da página html
5- Criar um arquivo ads.txt com seu código de cliente
Os anúncios aparecem quando o Google verifica a sua página e aceita a sua requisição

### API de cômodos
Além de se comunicar com os serviços de aparelhos, o front-end também se comunica com uma API de cômodos, em que a listagem de cômodos é carregada no momento do carregamento da página e é usado para auxiliar o usuário a preencher o formulário de inclusão de aparelho sem erros de digitação no cômodo, melhorando a experiência do usuário.
Estou usando a rota get da API de cômodos, que retorna todos os cômodos cadastrados no sistema