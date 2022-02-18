import { todoTasks } from "../Models/tempDataStore";
import { Todo} from "../Repositories/TodoRepository";

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

module.exports.addToDatabase = async function(todoToAdd) {
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

module.exports.getTodos = async function() {
    //Return all todo tasks from the 'Todos' table
    const [results, metadata] = await connection.query(
        `
        SELECT * 
        FROM Todos
        `)
    return results
}

module.exports.getTodoOfID = async function(todoID) {
    //Return a specific todo of id todoID from the 'Todos' table
    const [results, metadata] = await connection.query(
        `
        SELECT * 
        FROM Todos 
        WHERE todo_id = "${todoID}"
        `)
    return results
}

module.exports.getTodosOfCompletionState = async function(completedStatus) {
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

module.exports.updateTodo = async function(todoID, todoToChange) {
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

module.exports.deleteTodo = async function(todoID) {
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