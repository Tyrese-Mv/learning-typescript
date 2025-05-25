import { v4 as uuid } from 'uuid';

export class Task{
    private id : string;
    private taskDescription: string;
    private taskCreatedTime: string;
    private taskCompletion: boolean;

    public constructor(description : string){
        this.id = uuid();
        this.taskDescription = description;
        this.taskCreatedTime = this.DateTimeParser();
        this.taskCompletion = false;
    }

    private DateTimeParser(): string{
        let CurrentDate: Date = new Date();
        let year = CurrentDate.getFullYear();
        let month = CurrentDate.getMonth();
        let day = CurrentDate.getDate();
        let hours = CurrentDate.getHours();
        let minutes = CurrentDate.getMinutes();

        return `${day}/${month}/${year} - ${hours}:${minutes}`
    }
    

    public GetDateAsKey(): string{
        return this.taskCreatedTime.split(" - ")[0];
    }

    public GetTaskDescription(): string{
        return this.taskDescription;
    }

    public GetTaskID(): string{
        return this.id;
    }

    public GetTaskCompletion(): boolean{
        return this.taskCompletion;
    }

    public ToString(): string{
        return `Task ID: ${this.id}
        Task Description: ${this.taskDescription}
        Task Date: ${this.taskCreatedTime}
        Task Completion: ${(this.taskCompletion)? "Done": "Incomplete"}
        `
    }

    public SetCompletion(completed: boolean): void{
        this.taskCompletion = completed;
    }
}