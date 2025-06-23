export const myMockResponse = {
    data: {
      clientes: [
        {
          info: {
            nomeCompleto: "Ana Beatriz",
            detalhes: {
              email: "ana.b@example.com",
              nascimento: "1992-05-01",
            },
          },
          estatisticas: {
            vendas: [
              { data: "2024-01-01", valor: 150 },
              { data: "2024-01-02", valor: 50 },
              { data: "2024-01-05", valor: 100 },
            ],
          },
        },
        {
          info: {
            nomeCompleto: "Carlos Eduardo",
            detalhes: {
              email: "cadu@example.com",
              nascimento: "1987-08-15",
            },
          },
          duplicado: {
            nomeCompleto: "Carlos Eduardo",
          },
          estatisticas: {
            vendas: [{ data: "2024-01-03", valor: 300 }],
          },
        },
        {
          info: {
            nomeCompleto: "Fernanda Souza",
            detalhes: {
              email: "fernanda.souza@example.com",
              nascimento: "1990-12-11",
            },
          },
          estatisticas: {
            vendas: [
              { data: "2024-01-01", valor: 80 },
              { data: "2024-01-02", valor: 120 },
              { data: "2024-01-03", valor: 60 },
              { data: "2024-01-05", valor: 90 },
            ],
          },
          redundante: {
            detalhes: "sem valor relevante",
          },
        },
        {
          info: {
            nomeCompleto: "Bruno Lima",
            detalhes: {
              email: "bruno.lima@example.com",
              nascimento: "1985-03-23",
            },
          },
          duplicado: {
            nomeCompleto: "Bruno Lima",
          },
          estatisticas: {
            vendas: [
              { data: "2024-01-01", valor: 200 },
              { data: "2024-01-02", valor: 150 },
            ],
          },
        },
        {
          info: {
            nomeCompleto: "Juliana Pereira",
            detalhes: {
              email: "juliana.p@example.com",
              nascimento: "1995-07-07",
            },
          },
          estatisticas: {
            vendas: [
              { data: "2024-01-01", valor: 500 },
              { data: "2024-01-04", valor: 250 },
              { data: "2024-01-05", valor: 100 },
            ],
          },
          redundante: {
            statusExtra: "ativo",
          },
        },
      ],
    },
    meta: {
      registroTotal: 5,
      pagina: 1,
    },
    redundante: {
      status: "ok",
      observacao: "sem uso",
    },
  };
  