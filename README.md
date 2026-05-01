# Documentação de Entrega  Desenvolvimento CITI

No início do projeto, instalei a aplicação a partir do arquivo zip disponibilizado e movi a pasta pro meu diretório local de projetos no GitHub, em paralelo criei um novo repositório e conectei ele ao projeto pelo terminal do VS Code, criei o arquivo .env na pasta server com as credenciais do banco, garantindo que ele ficasse de fora do versionamento por questões de segurança, com o repositório configurado fui instalando as dependências, percebi que o projeto aceitava tanto yarn quanto npm, optei pelo yarn e gerei o arquivo yarn.lock, como decidi padronizar com o yarn apaguei o arquivo package-lock.json. Para evitar qualquer conflito de gerenciamento de pacotes na hora que o Docker fosse rodar a aplicação, depois fui olhar o schema do Prisma e vi que a variável de preço do calçado estava tipada como int, isso causaria problema se o valor chegasse com casas decimais, tipo 32.80, já que inteiro não comporta esse formato.

Para resolver adicionei uma constante no Controller que converte o valor recebido em centavos antes de qualquer operação no banco, a conversão foi aplicada dentro do método POST, depois de criar a rota no arquivo de rotas apareceu um erro de conexão entre o yarn e o Docker, resolvi rodando docker compose down seguido de docker compose up --build, o que restabeleceu a conexão com o banco, com isso testei o endpoint no Thunder Client e confirmei que o POST estava funcionando.

Com o POST validado parti pro restante do CRUD, no PATCH a lógica foi pegar o ID pelos parâmetros da URL e os dados novos pelo body, adicionei uma verificação para garantir que se o usuário mandar um preço novo esse valor também passe pela conversão pra centavos antes de chegar no prisma.calcado.update, já o DELETE foi mais direto, só pegar o ID da URL e acionar o método de exclusão do Prisma.

Pro desafio extra implementei as três funcionalidades solicitadas usando o padrão Repository pra não deixar o acesso ao banco direto no Controller, percebi que o esqueleto do projeto trazia uma pasta chamada repositorie com um arquivo de exemplo de usuário UserRepositorie.ts, ambos fora do padrão de nomenclatura e do escopo do PDF, para manter as boas práticas e seguir as instruções da documentação excluí essa pasta e criei o diretório correto chamado repositories, seguindo essa mesma lógica também excluí o UserController.ts, garantindo que o código ficasse limpo e focado no domínio da aplicação.

No diretório novo criei o arquivo CalcadosRepository.ts com as três funções separadas: buscarPorTamanho, buscarPorMarca configurada com mode insensitive para não diferenciar maiúsculas e minúsculas na busca, e contarEstoqueTotal, pra contagem de estoque usei o método aggregate do Prisma para somar a coluna quantidade_em_estoque direto no banco, finalizei ajustando o Controller do GET para repassar as query params pra essas funções e criei a rota específica /calcados/estoque para trazer o resultado da soma.

Por fim, adicionei comentários para melhor legibilidade do código, finalizando assim o projeto de desenvolvimento CITI.

## Uso de Inteligência Artificial

Usei IA no desenvolvimento, consultei pra lembrar de algumas funções específicas do Prisma e do Docker, como sintaxe de certas cláusulas e comandos de compose, o raciocínio e as decisões de implementação foram minhas, a IA serviu só pra confirmar detalhes que eu não tinha na cabeça na hora.


