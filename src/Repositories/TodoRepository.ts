const todoModel = require('../Models/Todos')

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
    add(todoToAdd: T);
    getAll();
    getById(todoID: string);
    getByCompletionStatus(completedStatus: boolean);
    remove(todoID: string);
    update(todoID: string, todoToChange: T);
}

/** 
 * The Todo Repository class implements all the standard repository pattern functions per the interface above
 * should handle all the logic internally so the routes are abstracted to the basics of what it needs to know 
 * **/
 export class TodoRepository implements RepositoryPI<Todo> {
     /**
      * This class has a series of functions called in the todoRoutes.
      * Most will invoke the sequelize connection where they each have an 
      * associated function that calls a query or multiple queries 
      * these function will then return a todo or an array of all remaining todos
      */
    constructor() {
    }

    async add(todoToAdd: Todo) {
        /** adds each key to corresponding database columns. 
         * Complete status is always 0 upon creation
         * indicating someone would NOT make a todo if it was already complete
         **/
        const toQueryToTheDatabase = todoModel.mapModel()

        const newTodo = await toQueryToTheDatabase.create({
            todo_id: todoToAdd.id,
            todo_created_at: todoToAdd.createdAt,
            todo_name: todoToAdd.name,
            todo_due_date: todoToAdd.dueDate,
            todo_completed_status: 0
        })

        console.log (newTodo)
        return newTodo
    }

    async getAll() { 
        //Return all todo tasks from the 'Todos' table
        const toQueryToTheDatabase = todoModel.mapModel()
        const allTodos = toQueryToTheDatabase.findAll()

        return allTodos
    }

    async getById(todoID: string) {
        //Return a specific todo of id todoID from the 'Todos' table
        const toQueryToTheDatabase = todoModel.mapModel()
        const requestedTodo = toQueryToTheDatabase.findAll({
            where: {
                todo_id: todoID
            }
        })

        return requestedTodo
    } 

    async getByCompletionStatus(completedStatus: boolean) {
        //Similar to above, checks from all items in the 'Todos' table which are of the complete status input above
        const toQueryToTheDatabase = todoModel.mapModel()
        const filteredTodos = toQueryToTheDatabase.findAll({
            where: {
                todo_completed_status: completedStatus
            }
        })

        return filteredTodos
    }

    async update(todoID: string, todoToChange: Todo) {
        /**
         * Update will first find the todo of the todo id put in above
         * Then transform the keys from 
         */
        var placeholderBool
        const toQueryToTheDatabase = todoModel.mapModel()
        const oldTodo = await this.getById(todoID)

        /** 
         * as the syntax of the sql columns are different than the todo keys,
         * here, the sql row that was found above lays a blueprint to make
         * a new todo so that the updated todo task created has no superfluous keys
         */
        let oldTodoKeys: Todo = {
            id: todoID,
            name: oldTodo[0].todo_name,
            createdAt: oldTodo[0].todo_created_at,
            dueDate: oldTodo[0].todo_due_date,
            completedStatus: oldTodo[0].todo_completed_status
        }
        let updatedTask: Todo = {
            ...oldTodoKeys, ...todoToChange
        }

        //check for sql bit value
        if (updatedTask.completedStatus) {
            placeholderBool = 1
        }
        else {
            placeholderBool = 0
        }

        await toQueryToTheDatabase.update({
            todo_name: updatedTask.name,
            todo_due_date: updatedTask.dueDate,
            todo_completed_status: placeholderBool
        }, {
            where: {
                todo_id: todoID
            }
        })

        return updatedTask
    }

    async remove(todoID: string) {
        const toQueryToTheDatabase = todoModel.mapModel()

        await toQueryToTheDatabase.destroy({
            where: {
                todo_id: todoID
            }
        })

        return this.getAll()
    }
}
export const todosRepo = new TodoRepository()