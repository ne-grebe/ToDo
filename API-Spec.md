# ToDo API
This is a proposal for ~~

## End points
---


### Create ToDo (POST)
`POST /ToDo`

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
`GET /ToDo/{id}`

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
`PUT /ToDo/{id}`

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
`DELETE /ToDo/{id}`

Response Body:
```
Response Code: 200 OK
```



### Fetch All
`GET /ToDo/{id}`

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
