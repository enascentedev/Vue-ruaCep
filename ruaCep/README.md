## Consulta de Endereço por CEP

# Descrição

Consulta de Endereço por CEP é uma aplicação web desenvolvida com Vue.js, Tailwind CSS e Pinia que permite aos usuários inserir um número de CEP (Código de Endereçamento Postal) e obter informações detalhadas sobre o endereço correspondente, como rua, bairro, cidade e estado. A aplicação inclui funcionalidades de validação de entrada, formatação de CEP com máscara, mensagens de erro automáticas e suporte para temas claro e escuro.

# Características

Entrada de CEP com Máscara: Formatação automática do CEP no formato XXXXX-XXX.
Validação de Entrada: Verificação do número de caracteres e garantia de que apenas números sejam inseridos.
Busca de Endereço: Integração com a API do ViaCEP para obter informações de endereço.
Mensagens de Erro Temporárias: Exibição de mensagens de erro que desaparecem automaticamente após 3 segundos.
Tema Escuro/Claro: Alternância entre modos de tema escuro e claro com indicação visual.
Limpeza de Campos: Botão para limpar o CEP inserido e os resultados da busca.

# Tecnologias Utilizadas

Vue.js - Framework JavaScript progressivo.
Tailwind CSS - Framework CSS utilitário.
Pinia - Biblioteca de gerenciamento de estado para Vue.js.
Axios - Cliente HTTP para requisições API.

# Instalação

Clone o Repositório:
bash
Copiar código
git clone https://github.com/seu-usuario/consulta-cep.git
cd consulta-cep
Instale as Dependências:

Certifique-se de ter o Node.js instalado.

bash
Copiar código
npm install
Inicie o Servidor de Desenvolvimento:

bash
Copiar código
npm run serve
Acesse a Aplicação:

Abra seu navegador e navegue até http://localhost:8080.

# Uso

Inserir o CEP:

Digite um CEP válido no campo de entrada. O CEP será formatado automaticamente conforme você digita.
Buscar Endereço:

Clique no botão "Buscar CEP" para obter as informações de endereço correspondentes.
Limpar Campos:

Use o botão "Limpar" para remover o CEP inserido e os resultados da busca.
Alternar Tema:

Utilize o toggle no cabeçalho para alternar entre os modos de tema claro e escuro. A etiqueta indicará o estado atual do tema.

# Estrutura do Projeto

arduino
Copiar código
consulta-cep/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Cep.vue
│   ├── stores/
│   │   ├── cepStore.js
│   │   └── themeStore.js
│   ├── App.vue
│   ├── main.js
│   └── assets/
│       └── ... 
├── tailwind.config.js
├── package.json
├── README.md
└── ... 

# Explicação do Código

Componente Principal (Cep.vue)
O componente Cep.vue é o núcleo da aplicação, responsável pela interface do usuário e interação com a store do Pinia. Ele inclui o cabeçalho com o título e o controle de tema, o formulário de entrada para o CEP, botões de ação, e a exibição de resultados ou mensagens de erro.

Principais Funcionalidades:
Cabeçalho (<header>):

Contém o título da aplicação e o controle de tema.
O controle de tema utiliza um checkbox com uma etiqueta dinâmica que exibe "Modo Escuro" ou "Modo Claro" conforme o estado atual.
Formulário de Entrada do CEP:

Campo de input para o usuário digitar o CEP.
Utiliza v-model com uma propriedade computada formattedCep para sincronizar o valor com a store.
Inclui um ícone de mapa para melhorar a estética.
Botões de Ação:

Buscar CEP: Inicia a busca pelo CEP inserido. Desabilitado enquanto uma requisição está em andamento.
Limpar: Limpa o CEP inserido e os resultados da busca. Também desabilitado durante o carregamento.
Mensagens de Erro:

Exibe mensagens de erro geradas pela store.
As mensagens desaparecem automaticamente após 3 segundos.
Exibição do Endereço Encontrado:

Mostra as informações do endereço retornadas pela API do ViaCEP quando um CEP válido é encontrado.
Store do CEP (cepStore.js)
A store cepStore.js gerencia o estado relacionado ao CEP, incluindo o valor inserido, os dados do endereço retornados pela API, mensagens de erro e o estado de carregamento. Utiliza Pinia para gerenciamento de estado reativo.

Principais Funcionalidades:
Estado:

cep: Armazena o CEP inserido pelo usuário, com formatação.
endereco: Guarda os dados do endereço retornados pela API.
error: Mensagem de erro a ser exibida ao usuário.
isLoading: Indica se uma requisição está em andamento.
_errorTimeout: Identificador do timeout para limpar a mensagem de erro após 3 segundos.
Ações:

updateCep(value): Atualiza o CEP no estado, removendo caracteres não numéricos e aplicando a máscara.
setError(message): Define uma mensagem de erro e a limpa após 3 segundos.
validateAndFormatCep(value): Valida e formata o CEP inserido pelo usuário, garantindo que não exceda 8 dígitos.
buscarCep(): Realiza a busca do CEP usando a API do ViaCEP, com validação prévia e tratamento de erros.
limparCampos(): Limpa os campos de CEP e endereço, além de resetar mensagens de erro e estados de carregamento.
Fluxo de Dados:
Formatação e Validação:

Conforme o usuário digita o CEP, a função validateAndFormatCep formata o valor inserido, aplicando a máscara XXXXX-XXX e garantindo que apenas 8 dígitos sejam permitidos.
Erros são definidos apenas quando o CEP excede o comprimento permitido ou durante a tentativa de busca com um CEP inválido.
Busca de Endereço:

Ao clicar em "Buscar CEP", a função buscarCep valida o CEP e faz uma requisição à API do ViaCEP para obter os dados do endereço.
Dependendo da resposta, o endereço é armazenado no estado ou uma mensagem de erro é exibida.
Store de Tema (themeStore.js)
A store themeStore.js gerencia o estado do tema da aplicação, permitindo alternar entre os modos claro e escuro. Também persiste a preferência do usuário usando localStorage.

Principais Funcionalidades:
Estado:

isDarkTheme: Indica se o tema escuro está ativo.
Ações:

initializeTheme(): Inicializa o tema com base na preferência armazenada no localStorage.
toggleTheme(value): Alterna o tema entre escuro e claro, atualizando o estado e persistindo a preferência.
applyTheme(): Aplica ou remove a classe dark no elemento <html> para ativar o tema escuro conforme necessário.
Fluxo de Dados:
Inicialização do Tema:

Ao iniciar a aplicação, a store verifica se há uma preferência de tema armazenada no localStorage e aplica o tema correspondente.
Alternância de Tema:

Quando o usuário interage com o toggle de tema, a store atualiza o estado isDarkTheme, persiste a preferência no localStorage, e aplica a classe dark ao elemento <html> para ativar o tema escuro.
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar este projeto.

Fork o Repositório
Crie uma Branch para sua Feature (git checkout -b feature/nova-feature)
Commit suas Alterações (`git commit -m 'Adiciona nova feature')
Push para a Branch (git push origin feature/nova-feature)
Abra um Pull Request
Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.