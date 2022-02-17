import { todoTasks } from "../Models/tempDataStore";
import { Todo, TodoRepository, todosRepo } from "../Repositories/TodoRepository";

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
    const [results, metadata] = await connection.query(
        `
        SELECT * 
        FROM Todos
        `)
    return results
}

module.exports.getTodoOfID = async function(todoID) {
    const [results, metadata] = await connection.query(
        `
        SELECT * 
        FROM Todos 
        WHERE todo_id = "${todoID}"
        `)
    return results
}

module.exports.getTodosOfCompletionState = async function(completedStatus) {
    var placeholderBool

    if (completedStatus) {
        placeholderBool = 1
    }
    else {
        placeholderBool = 0
    }
    
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
    const [requestedTask, taskMetadata] = await connection.query(
        `
        SELECT * 
        FROM Todos 
        WHERE todo_id = "${todoID}"
        `)

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

    if (updatedTask.completedStatus) {
        placeholderBool = 1
    }
    else {
        placeholderBool = 0
    }

    const [results, metadata] = await connection.query(
        `
        UPDATE Todos 
        SET 
        todo_name = "${updatedTask.name}", 
        todo_due_date = "${updatedTask.dueDate}",
        todo_completed_status = ${placeholderBool} 
        WHERE Todos.todo_id = '${todoID}'
        ;`)
    console.log(updatedTask)
    return updatedTask
}

module.exports.deleteTodo = async function(todoID) {
    const [results, metadata] = await connection.query(
        `
        DELETE FROM Todos 
        WHERE Todos.todo_id = '${todoID}'
        `)

    const [remainingTodos, allMetadata] = await connection.query(
        `
        SELECT * 
        FROM Todos
        `)
        
    return remainingTodos
}