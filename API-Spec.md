# ToDo API
This is a proposal for probably a stellar API just you wait

## End points
---

### Create ToDo (POST)
Attempt to create a ToDo

`POST /todos`

Request Body: 
```
    {
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    }
```

Response Code: 200 Created
Response Body: 
```
    {
        "id": "GUID",
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    }
```

Response Code: 4XX
Response Body:
```
    { "errorMessage": "String" }
```

--- 

### Fetch ToDo (GET)
`GET /todos/{id}`

Response Code: 200 OK
Response Body:
```
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    }
```

Response Code: 4XX
Response Body:
```
    { "errorMessage": "String" }
```

### Update ToDo (PUT)
`PUT /todos/{id}`

Request Body:
```
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    }
```

Response Code: 200 OK
Response Body:
```
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    }
```

Response Code: 4XX
Response Body:
```
    { "errorMessage": "String" }
```

### Delete ToDo (DELETE)
`DELETE /todos/{id}`

Response Code: 200 OK
Response Body:
```
```

Response Code: 4XX
Response Body:
```
    { "errorMessage": "String" }
```

### Fetch All
`GET /todos`

Response Code: 200 OK
Response Body:
```
[
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    }
]
```

Response Code: 4XX 
Response Body:
```
    { "errorMessage": "String" }
```

### Fetch Finished ToDo (GET)
`GET /todos/completed`

parameters:
```
      sort_by: dueDate 
        Optional
      order_by: asc
        Optional
```

Response Code: 200 OK
Response Body:
```
[
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    }
]
```

Response Code: 4XX 
Response Body:
```
    { "errorMessage": "String" }
```

### Fetch Incomplete ToDo (GET)
`GET /todos/incomplete`

parameters:
```
      sort_by: dueDate 
        Optional
      order_by: desc
        Optional
```

Response Body:
```
[
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": String,
        "createdAt": "DateTime",
        "dueDate": "Date",
        "completedStatus": Bool
    }
]
```

Response Code: 4XX 
Response Body:
```
    { "errorMessage": "String" }
```
