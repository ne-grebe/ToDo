import { Request, ResponseToolkit } from "@hapi/hapi";
import { Todo, TodoRepository, todosRepo } from "../Repositories/TodoRepository";
import { v4 as uuidv4 } from 'uuid';

const Joi = require('joi');

export const routes = [

    //Create a new task to be added to the task array
    {
        method: 'POST',
        path: '/todos',
        handler: (request: Request, h: ResponseToolkit) => {
            var payload = request.payload
            console.log(payload)
            const todo: Todo = {
                id: uuidv4(),
                name: payload['name'],
                createdAt: new Date(),
                dueDate: payload['dueDate'],
                completedStatus: false
            }      

            //add todo task to the full list of todos, then return the created todo
            todosRepo.add(todo)
            return todo
        },
    },

    //Fetch full list of tasks (in the order they were pushed to the array)
    {
        method: 'GET',
        path: '/todos',
        handler: (request: Request, h: ResponseToolkit) => {
            return todosRepo.getAll()
        }
    },

    //finds a specific task based on unique id
    {
        method: 'GET',
        path: '/todos/{id}',
        handler: (request: Request, h: ResponseToolkit) => {
            //first fetch all url parameters then search through task array for id match
            const urlParams = request.params
            const todo = todosRepo.getById(urlParams['id'])

            return todo;
        }
    },

    //finds a specific task based on whether a task is complete
    {
        method: 'GET',
        path: '/todos/completed',
        handler: (request: Request, h: ResponseToolkit) => {
            return todosRepo.getByCompletionStatus(true)
        }
    },
    {
        method: 'GET',
        path: '/todos/incomplete',
        handler: (request: Request, h: ResponseToolkit) => {
            return todosRepo.getByCompletionStatus(false)
        }
    },

    //Can update information per task
    {
        method: 'PUT',
        path: '/todos/{id}',
        handler: (request: Request, h: ResponseToolkit) => {
            //first fetch all url parameters then search through task array for id match
            const urlParams = request.params
            const requestedTask = todosRepo.update(urlParams['id']);
            console.log(requestedTask)

            return requestedTask
        }
    },

    //Remove a task given the parameter id from the task array
    {
        method: 'DELETE',
        path: '/todos/{id}',
        handler: (request: Request, h: ResponseToolkit) => {
            //first fetch all url parameters then search through task array for id match
            const urlParams = request.params
            const requestedTask = todosRepo.remove(urlParams['id']);

            return requestedTask
        }
    }
]