import { LocalDB } from "./model/LocalDB";
import { addTask, markDone } from "./model/Operations";
import { Task } from "./model/TaskClass"


describe("Testing the Operations Module", () =>{

    let mockDB: LocalDB;
    let mockAsk: jest.Mock<Promise<string>, [string]>;


    beforeEach(()=>{
        mockDB = LocalDB.instance;

        (mockDB as any).database = {};
        mockAsk = jest.fn().mockResolvedValue("Finish homework");
    })


    test("Adding a task on the DB", async () =>{
                
        await addTask(mockAsk);
        console.log(mockDB.toString());

        expect(mockDB.toString()).toContain("Finish homework")
    })

    test("Marking a task done", async () =>{
        const task: Task = new Task("Dummy Test");
        const date: string = task.GetDateAsKey();
        const id: string = task.GetTaskID();
    
        mockDB.AddTask(task);
    
        mockAsk.mockResolvedValueOnce(date).mockResolvedValueOnce(id);
    
        await markDone(mockAsk);
    
        const tasks = mockDB.GetTasks(date);
        expect(tasks[0].GetTaskCompletion()).toBe(true);
        


    })

    test("Removes a task by ID", () => {
        const task = new Task("To be removed");
        const date = task.GetDateAsKey();
        const id = task.GetTaskID();
    
        mockDB.AddTask(task);
        expect(mockDB.GetTasks(date).length).toBe(1);
    
        mockDB.RemoveTaskById(date, id);
        expect(mockDB.GetTasks(date).length).toBe(0);
    });
})