import { Request, ResponseToolkit } from "@hapi/hapi";
import { todoTasks, OneDumbDatabase } from "../Models/notADatabase"

const Joi = require('joi');

//Below are the hacky creations of a few tasks to be hard coded into the routes... for now
const date = new Date();
const userTodo = 'Making my way downtown';

var data = {
    "name": userTodo,
    "createdAt": date,
    "dueDate": new Date(2022, 4, 15, 13, 30, 0),
    "completeStatus": false
}

var bummyDummy = {
    "name": 'Buy little baby Cynthia those small booties that her mom wanted',
    "createdAt": date,
    "dueDate": new Date(2022, 6, 5, 18, 0, 0),
    "completeStatus": false
}

export const routes = [

    //Create a new task to be added to the task array
    {
        method: 'POST',
        path: '/todos',
        handler: (request: Request, h: ResponseToolkit) => {
            var newTask = new OneDumbDatabase(bummyDummy.name, bummyDummy.createdAt, bummyDummy.dueDate, bummyDummy.completeStatus)

            //after initializing a new task dictionary, this function pushes it to the list
            newTask.addToTasks()

            return todoTasks
        },
    },

    //Fetch full list of tasks (in the order they were pushed to the array)
    {
        method: 'GET',
        path: '/todos',
        handler: (request: Request, h: ResponseToolkit) => {
            return todoTasks;
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
            const filteredList = todoTasks.filter(function(value, index, arr) {
                //checks per item in array that it matches the status to add tasks in new array
                return value.completedStatus == true;
            });

            return filteredList;
        }
    },
    {
        method: 'GET',
        path: '/todos/incomplete',
        handler: (request: Request, h: ResponseToolkit) => {
            //first fetch all url parameters then search through task array for status match
            const urlParams = request.params
            const filteredList = todoTasks.filter(function(value, index, arr) {
                //checks per item in array that it matches the status to add tasks in new array
                return value.completedStatus != true;
            });

            return filteredList;
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

            /**
             * Currently implementing hard coded update for 'Marrying the queen' task
             * But if id is changed, will update whatever task that was, regardless
             **/
            requestedTask.name = 'Divorce the queen'
            requestedTask.dueDate = (new Date(2023, 6, 5, 18, 0, 0)).toString()
            requestedTask.completedStatus = true

            console.log(requestedTask)
            return requestedTask;
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

            /** 
             * search array for matching id value and then creates a new array with all other elements; 
             * as task array grows to dozens or hundreds of tasks, may want to consider how else to
             * remove a specific element without having to create new array
             **/
            const filteredList = todoTasks.filter(function(value, index, arr) {
                console.log(value)
                return value != requestedTask;
            });

            return filteredList;
        }
    }
]