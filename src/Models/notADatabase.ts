import { v4 as uuidv4 } from 'uuid';

export class OneDumbDatabase {
    name: string;
    createdAt: Date;
    dueDate: Date;
    completedStatus: boolean;

    constructor(name, createdAt, dueDate, completedStatus) {
        this.name = name
        this.createdAt = createdAt
        this.dueDate = dueDate
        this.completedStatus =  completedStatus
    }

    /**
     * creates the task object then adds it to all tasks
     */
    public addToTasks() {
        let task = {
            "id": (uuidv4()).toString(),
            "name": (this.name).toString(),
            "createdAt": (this.createdAt).toString(),
            "dueDate": (this.dueDate).toString(),
            "completedStatus": this.completedStatus,
        }
        return todoTasks.push(task)
    }
}

export const todoTasks = [
    {
        "id": "974cc50e-dd80-46ec-bfab-d0226eefa294",
        "name": "Buy marmalade",
        "createdAt": "2022-01-29",
        "dueDate": "2022-02-22",
        "completedStatus": false
    },
    {
        "id": "f1631cff-b994-427d-a664-ae681efb9f5a",
        "name": "Refill jet fuel",
        "createdAt": "2022-01-15",
        "dueDate": "2022-04-02",
        "completedStatus": true
    },
    {
        "id": "b19f568a-0bae-4724-bc0f-d93bc66d7278",
        "name": "Marry the queen, any queen",
        "createdAt": "2022-02-01",
        "dueDate": "2033-01-02",
        "completedStatus": false
    },
    {
        "id": "f009f5b1-6993-4625-b0b9-cbd3d2469475",
        "name": "Revolt",
        "createdAt": "2022-02-02",
        "dueDate": "2025-12-25",
        "completedStatus": true
    },
    {
        "id": "0fbbb949-4055-4a02-9c9f-3d50db1ebefc",
        "name": "Find Norbert the frog",
        "createdAt": "2015-07-26",
        "dueDate": "2026-08-11",
        "completedStatus": false
    }
]