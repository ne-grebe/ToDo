# ToDo API
This is a proposal for ~~

## End points
---


### Create ToDo (POST)
`POST /toDo`

Request Body: 
```
    {
        "name": String
        "dueDate": Date
        "completeStatus": Bool
    }
```
Response Body: 
```
Response Code: 201 Created
    {
        "id": Int
        "name": String
        "dueDate": Date
        "completeStatus": Bool
    }
```

--- 

### Fetch ToDo (GET)
`GET /toDo/{id}`

Response Body:
```
Response Code: 200 OK
    {
        "name": String
        "dueDate": Date
        "completeStatus": Bool
    }
```



### Update ToDo (PUT)
`PUT /toDo/{id}`

Request Body:
```
    {
        "name": String
        "dueDate": Date
        "completeStatus": Bool
    }
```

Response Body:
```
Response Code: 200 OK
    {
        "name": String
        "dueDate": Date
        "completeStatus": Bool
    }
```



### Delete ToDo (DELETE)
`DELETE /toDo/{id}`

Response Body:
```
Response Code: 200 OK
```



### Fetch All
`GET /toDo/`

Response Body:
```
Response Code: 200 OK
[
    {
        "name": String
        "dueDate": Date
        "completeStatus": Bool
    },
    {
        "name": String
        "dueDate": Date
        "completeStatus": Bool
    },
    {
        "name": String
        "dueDate": Date
        "completeStatus": Bool
    },
    {
        "name": String
        "dueDate": Date
        "completeStatus": Bool
    }
]
```
