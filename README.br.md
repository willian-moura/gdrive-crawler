[🇺🇸 English version](README.md)

# Downloader de Arquivos do Google Drive

Este script é utilizado para baixar arquivos do Google Drive com base em links fornecidos através de um arquivo de texto ou de um arquivo JSON array. Ele requer credenciais da API do Google para autenticação e autorização.

## Pré-requisitos

1. **Node.js**: Certifique-se de ter o Node.js instalado.
2. **Credenciais da API do Google**: Você precisa criar um arquivo `credentials.json` para autenticar o script com a API do Google Drive.

### Configurando Credenciais da API do Google

Para usar este script, você precisa criar um arquivo `credentials.json` a partir do Console do Desenvolvedor do Google:

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto ou selecione um projeto existente.
3. Navegue até `APIs & Services` > `Credentials`.
4. Clique em `Create Credentials` e escolha `OAuth 2.0 Client IDs`.
5. Baixe o arquivo de credenciais gerado e salve-o como `credentials.json` na pasta raiz do projeto.

## Uso

Este script pode ser executado em dois modos diferentes, dependendo da fonte dos links do Google Drive:

1. **Modo de Descoberta** (`-d`): O script vai analisar um arquivo de texto para encontrar links do Google Drive usando uma expressão regular.
2. **Modo Array** (`-a`): O script vai ler um arquivo JSON contendo um array de links do Google Drive.

### Argumentos da Linha de Comando

- `-d <caminho_do_arquivo>`: Use esta flag para especificar o caminho para um arquivo de texto. O script buscará links do Google Drive dentro deste arquivo usando regex e fará o download deles.

    ```bash
    node download.js -d /caminho/para/arquivo.txt
    ```

- `-a <caminho_do_arquivo>`: Use esta flag para especificar o caminho para um arquivo JSON array. O script lerá o array JSON deste arquivo e fará o download de cada link do Google Drive.

    ```bash
    node download.js -a /caminho/para/arquivo.json
    ```

### Exemplo

1. **Exemplo do Modo de Descoberta**:

    Se você tiver um arquivo de texto chamado `links.txt` que contém vários links do Google Drive, você pode executar:

    ```bash
    node download.js -d links.txt
    ```

2. **Exemplo do Modo Array**:

    Se você tiver um arquivo JSON chamado `links.json` com um array JSON de links do Google Drive, você pode executar:

    ```bash
    node download.js -a links.json
    ```

## Nota

Certifique-se de que o seu arquivo `credentials.json` esteja presente no mesmo diretório que o seu script antes de executar os comandos. Este arquivo é necessário para autenticar suas solicitações à API do Google Drive.

## Licença

Este projeto está licenciado sob a Licença MIT.
