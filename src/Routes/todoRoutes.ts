import { Request, ResponseToolkit } from "@hapi/hapi";
import { TaskGenerator, todoTasks } from "../Models/notADatabase"
import { OneDumbDatabase } from "../Repositories/TodoRepository";

const Joi = require('joi');

//Below are the hacky creations of a few tasks to be hard coded into the routes... for now
const dummyDatabase = new OneDumbDatabase(todoTasks);
const date = new Date();
const userTodo = 'Making my way downtown';

var data = {
    "name": userTodo,
    "createdAt": date,
    "dueDate": new Date(2022, 4, 15, 13, 30, 0),
    "completedStatus": false
}

var bummyDummy = {
    "name": 'Buy little baby Cynthia those small booties that her mom wanted',
    "createdAt": date,
    "dueDate": new Date(2022, 6, 5, 18, 0, 0),
    "completedStatus": false
}

export const routes = [

    //Create a new task to be added to the task array
    {
        method: 'POST',
        path: '/todos',
        handler: (request: Request, h: ResponseToolkit) => {
            var newTask = new TaskGenerator(bummyDummy.name, bummyDummy.createdAt, bummyDummy.dueDate, bummyDummy.completedStatus)

            //after initializing a new task dictionary, this function pushes it to the list
            dummyDatabase.add(newTask)

            return todoTasks
        },
    },

    //Fetch full list of tasks (in the order they were pushed to the array)
    {
        method: 'GET',
        path: '/todos',
        handler: (request: Request, h: ResponseToolkit) => {
            return dummyDatabase.getAll()
        }
    },

    //finds a specific task based on unique id
    {
        method: 'GET',
        path: '/todos/{id}',
        handler: (request: Request, h: ResponseToolkit) => {
            //first fetch all url parameters then search through task array for id match
            const urlParams = request.params
            const requestedTask = todoTasks.find(x => x.id === urlParams['id']);
            var task = new TaskGenerator(requestedTask.name, requestedTask.createdAt, requestedTask.dueDate, requestedTask.completedStatus)

            dummyDatabase.getById(task)

            return requestedTask;
        }
    },

    //finds a specific task based on whether a task is complete
    {
        method: 'GET',
        path: '/todos/completed',
        handler: (request: Request, h: ResponseToolkit) => {
            //first fetch all url parameters then search through task array for status match
            const urlParams = request.params

            return dummyDatabase.getByCompletionStatus(true)
        }
    },
    {
        method: 'GET',
        path: '/todos/incomplete',
        handler: (request: Request, h: ResponseToolkit) => {
            //first fetch all url parameters then search through task array for status match
            const urlParams = request.params
            
            return dummyDatabase.getByCompletionStatus(false)
        }
    },

    //Can update information per task
    {
        method: 'PUT',
        path: '/todos/{id}',
        handler: (request: Request, h: ResponseToolkit) => {
            //first fetch all url parameters then search through task array for id match
            const urlParams = request.params
            const requestedTask = todoTasks.find(x => x.id === urlParams['id']);
            console.log(requestedTask)

            return dummyDatabase.update(requestedTask)
        }
    },

    //Remove a task given the parameter id from the task array
    {
        method: 'DELETE',
        path: '/todos/{id}',
        handler: (request: Request, h: ResponseToolkit) => {
            //first fetch all url parameters then search through task array for id match
            const urlParams = request.params
            const requestedTask = todoTasks.find(x => x.id === urlParams['id']);

            return dummyDatabase.remove(requestedTask)
        }
    }
]