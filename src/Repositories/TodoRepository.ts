const Sequelize = require('sequelize');

//creates a connection to the 'mysql' database with the root user and password 'supersecretpass'
export const connection = new Sequelize('mysql', 'root', 'supersecretpass', {
    host: 'localhost',
    port: 13306,
    dialect: 'mysql'
})

connection.authenticate().then(() => {
    console.log("Connected!");
}).catch(() => {
    console.log("Not connected yet.")
})

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
        const [results, metadata] = await connection.query(
            `
            INSERT INTO 
                Todos 
            VALUES (
                "${todoToAdd.id}", 
                "${todoToAdd.createdAt}", 
                "${todoToAdd.name}", 
                "${todoToAdd.dueDate}", 
                "0"
            )`)
        return results
    }

    async getAll() { 
        //Return all todo tasks from the 'Todos' table
        const [results, metadata] = await connection.query(
            `
            SELECT * 
            FROM Todos
            `)
        return results
    }

    async getById(todoID: string) {
        //Return a specific todo of id todoID from the 'Todos' table
        const [results, metadata] = await connection.query(
            `
            SELECT * 
            FROM Todos 
            WHERE todo_id = "${todoID}"
            `)
        return results
    } 

    async getByCompletionStatus(completedStatus: boolean) {
        //to follow the bit convention in mysql, will determine either 1(true) or 0(false)
        var placeholderBool

        if (completedStatus) {
            placeholderBool = 1
        }
        else {
            placeholderBool = 0
        }
        
        //will find and return all todos with the same bit value as determined above
        const [results, metadata] = await connection.query(
            `
            SELECT * 
            FROM Todos 
            WHERE todo_completed_status = ${placeholderBool}
            `)
        return results
    }

    async update(todoID: string, todoToChange: Todo) {
        var placeholderBool
        // find the singular todo to be updated
        const [requestedTask, taskMetadata] = await connection.query(
            `
            SELECT * 
            FROM Todos 
            WHERE todo_id = "${todoID}"
            `)

        /** 
         * as the syntax of the sql columns are different than the todo keys,
         * here, the sql row that was found above lays a blueprint to make
         * a new todo so that the updated todo task created has no superfluous keys
         */
        let oldTodoKeys: Todo = {
            id: todoID,
            name: requestedTask[0].todo_name,
            createdAt: requestedTask[0].todo_created_at,
            dueDate: requestedTask[0].todo_due_date,
            completedStatus: requestedTask[0].todo_completed_status
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

        //finally, the actual update query
        const [results, metadata] = await connection.query(
            `
            UPDATE Todos 
            SET 
            todo_name = "${updatedTask.name}", 
            todo_due_date = "${updatedTask.dueDate}",
            todo_completed_status = ${placeholderBool} 
            WHERE Todos.todo_id = '${todoID}'
            ;`)
        //unlike other queries, instead of results here, we want the updated todo
        return updatedTask
    }

    async remove(todoID: string) {
        //query to remove the row with the primary key of todoID
        const [results, metadata] = await connection.query(
            `
            DELETE FROM Todos 
            WHERE Todos.todo_id = '${todoID}'
            `)

        //fetch the remaining todos, excluding the one deleted above
        const [remainingTodos, allMetadata] = await connection.query(
            `
            SELECT * 
            FROM Todos
            `)
        return remainingTodos
    }
}
export const todosRepo = new TodoRepository()