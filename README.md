# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Descrição do desafio

# Objetivo: Avaliar domínio de stack, boas práticas, raciocínio lógico e estruturação
# Para front-end: Crie uma aplicação que:
- Permita adicionar clientes com nome, e-mail e data de nascimento
- Liste os campos conforme achar pertinente
- Adicione autenticação simples
- Consuma a API de estatísticas para:
- Exibir um gráfico com o total de vendas por dia
- Destacar visualmente:
    - O cliente com maior volume de vendas
    - O cliente com maior média de valor por venda
    - O cliente com maior frequência de compras
    - Adicione um campo visual que indique, para cada cliente, a primeira letra do alfabeto que ainda não apareceu no nome completo do cliente. Se todas as letras de a-z estiverem presentes, exibir '-'.
- Ao consumir a API de listagem de clientes, considere que o endpoint pode retornar uma estrutura desorganizada ou com dados redundantes (ex: múltiplos campos aninhados, duplicações, ou propriedades desnecessárias). Faça o tratamento e normalização desses dados no front-end antes de renderizá-los na interface. Abaixo está o JSON que será retornado pela API de listagem de clientes. Esse é o formato exato com o qual o candidato deverá trabalhar:
{
"data": {
"clientes": [
{
"info": {
"nomeCompleto": "Ana Beatriz",
"detalhes": {
"email": "ana.b@example.com",
"nascimento": "1992-05-01"
}
},
"estatisticas": {
"vendas": [
{ "data": "2024-01-01", "valor": 150 },
{ "data": "2024-01-02", "valor": 50 }
]
}
},
{
"info": {
"nomeCompleto": "Carlos Eduardo",
"detalhes": {
"email": "cadu@example.com",
"nascimento": "1987-08-15"
}
},
"duplicado": {
"nomeCompleto": "Carlos Eduardo"
},
"estatisticas": {
"vendas": []
}
}
]
},
"meta": {
"registroTotal": 2,
"pagina": 1
},
"redundante": {
"status": "ok"
}
}
O candidato deve extrair corretamente os dados relevantes e ignorar as informações desnecessárias ou duplicadas.

Requisitos:
Front pode consumir API real ou mockada via ferramenta

