import { v4 as uuidv4 } from 'uuid';
import { TaskGenerator, todoTasks } from "../Models/notADatabase"
import { RepositoryPI } from './RepositoryPatternInterface';

export class OneDumbDatabase implements RepositoryPI<TaskGenerator> {
    taskArray: TaskGenerator[] = [];
    // name: string;
    // createdAt: Date;
    // dueDate: Date;
    // completedStatus: boolean;

    constructor(taskArray) {
        // this.name = name
        // this.createdAt = createdAt
        // this.dueDate = dueDate
        // this.completedStatus = completedStatus
        this.taskArray = taskArray;
    }

    /**
     * creates the task object then adds it to all tasks
     */
    public add(task: any) {
        // let task = {
        //     "id": (uuidv4()).toString(),
        //     "name": (this.name).toString(),
        //     "createdAt": (this.createdAt).toString(),
        //     "dueDate": (this.dueDate).toString(),
        //     "completedStatus": this.completedStatus,
        // }
        this.taskArray.push(task)
        return this.taskArray
    }

    public getAll() {
        return this.taskArray;
    }

    public getById(requestedTask: any) {
        return requestedTask;
    }

    public getByCompletionStatus(completedStatus: boolean) {
        //first fetch all url parameters then search through task array for status match
        const filteredList = this.taskArray.filter(function(value, index, arr) {
            //checks per item in array that it matches the status to add tasks in new array
            return value.completedStatus == completedStatus;
        });

        return filteredList;
    }

    public remove(requestedTask: any) {
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

    public update(requestedTask: any) {
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
}