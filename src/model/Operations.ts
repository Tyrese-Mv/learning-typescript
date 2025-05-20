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


export async function deleteTasks(Ask: (q: string) => Promise<string>): Promise<void>{
    let count = 0;
    const keys = LocalDB.instance.GetDBKeys();
    for (const key in keys) {
        console.log(`${count}: ${key}`);
        count++;
    }
    const taskDate = await Ask("Enter the date when you created the task? >");

    try{
        const listOfTasks = LocalDB.instance.GetTasks(taskDate);
        console.log(`These are the list of tasks on ${taskDate}\n"Select the ID of the task you want to delete`)
        for(let i = 0; i < listOfTasks.length; i++){
            console.log(`${i+1}: ${listOfTasks[i]}`)
        }        
        
        const taskId = await Ask("Enter The selected ID: ")


    }
    catch {
        console.log("You have entered an incorrect id, or the task doesn't exist");
    }
    
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