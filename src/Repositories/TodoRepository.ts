const Connection = require("../DatabaseConfig/sequelizeConnection")

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
 * It will create a task array which contains the full list of todo tasks
 * should handle all the logic internally so the routes are abstracted to the basics of what it needs to know 
 * **/
 export class TodoRepository implements RepositoryPI<Todo> {

    constructor() {
    }

    async add(todoToAdd: Todo) {
        const addedTodo = Connection.addToDatabase(todoToAdd);
        return addedTodo
    }

    async getAll() { 
        const allTodos = Connection.getTodos();
        return allTodos
    }

    async getById(todoID: string) {
        const todoOfID = Connection.getTodoOfID(todoID)
        return todoOfID
    } 

    async getByCompletionStatus(completedStatus: boolean) {
        const todosOfCompletionStatusOf = Connection.getTodosOfCompletionState(completedStatus)
        return todosOfCompletionStatusOf
    }

    async update(todoID: string, todoToChange: Todo) {
        const updatedTodo = Connection.updateTodo(todoID, todoToChange)
        return updatedTodo
    }

    async remove(todoID: string) {
        const postTodoRemovalList = Connection.deleteTodo(todoID)
        return postTodoRemovalList
    }
    
}
export const todosRepo = new TodoRepository()