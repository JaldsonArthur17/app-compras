# AppCompras (projeto da disciplina de desenvolvimento mobile)
Projeto de aplicação mobile desenvolvida com React Native e Expo que, segundo a atividade, deve consumir API pública [DummyJSON](https://dummyjson.com/products) para exibir uma lista de produtos. Foi feita a separação de responsabilidades para melhor dinamicidade para obter um padrão mais profissional.

## Tecnologias
1. React Native
2. Expo Go
3. Axios
4. React Navigation

## Funcionalidades
1. Listagem de produtos consumidos via API REST
2. Busca por nome em tempo real
3. Filtro por categoria e ordenação
4. Tela de detalhes do produto
5. Navegação entre telas

## Estrutura
```
hooks/        → lógica de estados e requisições
screens/      → componentes de tela 
styles/       → estilos separados por tela
App.js        → configuração de navegação
```

## Como rodar
```bash
npx expo start
```
Escaneie o QR code com o aplicativo Expo Go.
