import { RandomUUIDOptions } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { todoTasks } from "../Models/tempDataStore"

//definition for each task (todo) object
export interface Todo {
    id: string
    name: string
    createdAt: Date
    dueDate: string
    completedStatus: boolean
}

//interface to implement repository pattern
export interface RepositoryPI<T> {
    add(objectToAdd: T);
    getAll();
    getById(objectID: string);
    getByCompletionStatus(completedStatus: boolean);
    remove(objectToDelete: string);
    update(objectToChange: string);
}

/** 
 * The Todo Repository class implements all the standard repository pattern functions per the interface above
 * It will create a task array which contains the full list of todo tasks
 * should handle all the logic internally so the routes are abstracted to the basics of what it needs to know 
 * **/
export class TodoRepository implements RepositoryPI<Todo> {
    private taskArray: Todo[] = [];

    constructor() {
    }

    public add(task: Todo) {
        //creates the task object then adds it to all tasks
        this.taskArray.push(task)
        return this.taskArray
    }

    public getAll() {
        return this.taskArray;
    }

    public getById(todoID: string) {
        const requestedTask = this.taskArray.filter(x => x.id === todoID);

        return requestedTask[0];
    }

    public getByCompletionStatus(completedStatus: boolean): Todo[] {
        //first fetch all url parameters then search through task array for status match
        const filteredList = this.taskArray.filter(todo => todo.completedStatus == completedStatus);

        return filteredList;
    }

    public remove(todoID: string) {
        /** 
        * search array for matching id value and then creates a new array with all other elements; 
        * as task array grows to dozens or hundreds of tasks, may want to consider how else to
        * remove a specific element without having to create new array
        **/

        const filteredTodos = this.taskArray.filter(todo => todo.id === todoID)
        const todoToBeDeleted = filteredTodos[0]
        const position = filteredTodos.indexOf(todoToBeDeleted)

        this.taskArray.splice(position, 1)
        return todoToBeDeleted
    }

    public update(todoID: string) {
        /**
             * Currently implementing hard coded update for 'Marrying the queen' task
             * But if id is changed, will update whatever task that was, regardless
             **/
         const requestedTask = this.taskArray.filter(x => x.id === todoID);

         requestedTask[0].name = 'Divorce the queen'
         requestedTask[0].dueDate = (new Date(2023, 6, 5, 18, 0, 0)).toString()
         requestedTask[0].completedStatus = true

         console.log(requestedTask)
         return requestedTask;
    }
}

export const todosRepo = new TodoRepository()