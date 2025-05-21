import { DB } from "./util";
import { Task } from "./TaskClass";

export class LocalDB{
    static #instance: LocalDB;
    private database: DB = {};

    private constructor() {
    }

    public static get instance(): LocalDB {
        if (!LocalDB.#instance) {
            LocalDB.#instance = new LocalDB();
        }

        return LocalDB.#instance;
    }

    public AddTask(userTask : Task): void{
        const taskKey = userTask.GetDateAsKey();

        if (!this.database[taskKey]) {
            this.database[taskKey] = [];
        }
    
        this.database[taskKey].push(userTask);
    }

    public GetDBKeys(): string[]{
        return Object.keys(this.database)
    }

    public GetTasks(date: string): Task[]{
        return this.database[date];
    }

    public RemoveTaskById(date: string, id: string): void{
        this.database[date] = this.database[date].filter((element) => element.GetTaskID() !== id);
    }

    public CompleteTask(date: string, id: string): void{
        const taskList = this.database[date];
        for (let task of taskList) {
            if (id === task.GetTaskID()) {
                task.SetCompletion(true);
                break;
            }
        }
    }

    public toString(): string {
        return JSON.stringify(this.database, null, 2);
    }
}