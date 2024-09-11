
# in-orbit

O [in-orbit API](https://github.com/rafinhaa/in-orbit-backend) disponibiliza uma API RESTful que permite o acesso ao sistema.

## Métodos

Requisições para a API devem seguir os padrões:

| Método   | Descrição                                             |
| -------- | ----------------------------------------------------- |
| `GET`    | Retorna informações de um ou mais registros.          |
| `POST`   | Utilizado para criar um novo registro.                |
| `PUT`    | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema.                        |

# Rotas

## Metas [/goals]

### Cria nova meta [/]

Criar novo usuário

- Method `POST`

- Request (application/json)

  - Body

  ```json
  {
    "title": "Fazer corrida",
    "desiredWeeklyFrequency": 1
  }
  ```

  - Response example

  Status Code: 200
  ```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | Criado com sucesso.                                                               |
| `500`  | Erro no servidor.                                                                 |

### Metas pendentes [/pending-goals]

Obtém as lista de metas pendentes

- Method `GET`

- Request (empty)

- Response example

  ```json
  {
    "pendingGoals": [
        {
            {
                "id": "rteuycrmcjiflrrdmz5jcila",
                "title": "Fazer corrida",
                "desiredWeeklyFrequency": 1,
                "completionCount": 0
            },  
        }
    ]
  }
  ```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | Resposta obtida com sucesso.                                                      |
| `500`  | Erro no servidor.                                                                 |


### Resumo semanal [/get-week-summary]

Obtém a resumo das metas semanais

- Method `GET`

- Request (empty)

- Response example

  ```json
  {
    "summary": [
      {
        "completed": 1,
        "total": 1,
        "goalsPerDay": {
          "2024-09-08": [
            {
              "id": "nhohcd7m4x52vtt80i1di4cg",
              "title": "Acordar cedo",
              "completedAt": "2024-09-08T00:00:00+00:00"
            }
          ]
        }
      }
    ]
  }
  ```

- Response codes

| Código | Descrição                                                                         |
| ------ | --------------------------------------------------------------------------------- |
| `200`  | Resposta obtida com sucesso.                                                      |
| `500`  | Erro no servidor.                                                                 |