# ToDo API
This is a proposal for probably a stellar API just you wait

## End points
---

### Create ToDo (POST)
Attempt to create a ToDo

`POST /todo`

Request Body: 
```
    {
        "name": "String",
        "createdAt": "Datetime",
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
        "createdAt": "Datetime",
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
`GET /todo/{id}`

Response Code: 200 OK
Response Body:
```
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "Datetime",
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
`PUT /todo/{id}`

Request Body:
```
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "Datetime",
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
        "createdAt": "Datetime",
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
`DELETE /todo/{id}`

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
`GET /todo`

Response Code: 200 OK
Response Body:
```
[
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "Datetime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "Datetime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "Datetime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "Datetime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "Datetime",
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
`GET /todo/{id}`

parameters:
```
      completedStatus: true
        Required
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
        "createdAt": "Datetime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "Datetime",
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
`GET /todo/{id}`

parameters:
```
      completedStatus: false
        Required
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
        "createdAt": "Datetime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": "String",
        "createdAt": "Datetime",
        "dueDate": "Date",
        "completedStatus": Bool
    },
    {
        "id": "GUID"
        "name": String,
        "createdAt": "Datetime",
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
