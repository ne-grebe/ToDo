# ToDo API
This is a proposal for probably a stellar API just you wait

## End points
---


### Create ToDo (POST)
Attempt to create a ToDo

`POST /toDo`

Request Body: 
```
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool
    }
```

Response Code: 201 Created
Response Body: 
```
    {
        "id": GUID,
        "name": String,
        "createDate": Datetime,        
        "dueDate": Date,
        "completeStatus": Bool
    }
```

Response Code: 400 Bad Request
Response Body:
```
    { "errorMessage": String }
```

Response Code: 401 Unauthorized
Response Body:
```
    { "errorMessage": String }
```

--- 

### Fetch ToDo (GET)
`GET /toDo/{id}`

Response Code: 200 OK
Response Body:
```
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    }
```

Response Code: 401 Unauthorized
Response Body:
```
    { "errorMessage": String }
```

Response Code: 404 Not Found
Response Body:
```
    { "errorMessage": String }
```



### Update ToDo (PUT)
`PUT /toDo/{id}`

Request Body:
```
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool
        "id": GUID
    }
```

Response Code: 200 OK
Response Body:
```
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    }
```

Response Code: 400 Bad Request
Response Body:
```
    { "errorMessage": String }
```

Response Code: 401 Unauthorized
Response Body:
```
    { "errorMessage": String }
```

Response Code: 404 Not Found
Response Body:
```
    { "errorMessage": String }
```



### Delete ToDo (DELETE)
`DELETE /toDo/{id}`

Response Code: 200 OK
Response Body:
```
```

Response Code: 401 Unauthorized
Response Body:
```
    { "errorMessage": String }
```

Response Code: 404 Not Found
Response Body:
```
    { "errorMessage": String }
```



### Fetch All
`GET /toDo`

Response Code: 200 OK
Response Body:
```
[
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    },
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    },
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    },
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    },
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    }
]
```

Response Code: 401 Unauthorized
Response Body:
```
    { "errorMessage": String }
```

Response Code: 404 Not Found
Response Body:
```
    { "errorMessage": String }
```


### Fetch Finished ToDo (GET)
`GET /toDo/{id}`

parameters:
```
      completeStatus: true
      sort_by: dueDate 
      order_by: asc
```

Response Code: 200 OK
Response Body:
```
[
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    },
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    }
]
```

Response Code: 401 Unauthorized
Response Body:
```
    { "errorMessage": String }
```

Response Code: 404 Not Found
Response Body:
```
    { "errorMessage": String }
```

### Fetch Incomplete ToDo (GET)
`GET /toDo/{id}`

parameters:
```
      completeStatus: false
      sort_by: dueDate 
      order_by: desc
```

Response Body:
```
[
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    },
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    },
    {
        "name": String,
        "createDate": Datetime,
        "dueDate": Date,
        "completeStatus": Bool,
        "id": GUID
    }
]
```

Response Code: 401 Unauthorized
Response Body:
```
    { "errorMessage": String }
```

Response Code: 404 Not Found
Response Body:
```
    { "errorMessage": String }
```
