import { Task } from './TaskClass';
import { LocalDB } from './LocalDB';
import * as fs from "fs";

export async function addTask(Ask: (q: string) => Promise<string>): Promise<void> {
    const taskDescription = await Ask("Enter the description of your task? >");
    
    let newTask : Task = new Task(taskDescription);

    const myDb = LocalDB.instance;

    myDb.AddTask(newTask);

    console.log("You Have Successfuly Added A Task!!")

}

export async function viewTasks(): Promise<void>{
    console.log(LocalDB.instance.toString());
}

export async function saveToJson(): Promise<void>{

    const data = LocalDB.instance;
    fs.writeFile("data.json", data.toString(), (error) => {
        if (error) {
          console.error(error);
          throw error;
        }
        console.log("data.json written correctly");
    });

    

}