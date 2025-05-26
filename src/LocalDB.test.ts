import { LocalDB } from './model/LocalDB';
import { Task } from './model/TaskClass';
import { DB ,TaskKey, TaskStorage} from './model/util';

describe('LocalDB', () => {
    let db: LocalDB;
    let task1: Task;
    let task2: Task;


    beforeEach(() => {
        db = LocalDB.instance;

    
        (db as any).database = {};

        task1 = new Task('Test task 1');
        task2 = new Task('Test task 2');
    });

    test('should add tasks and retrieve them by date key', () => {
        db.AddTask(task1);
        const key = task1.GetDateAsKey();
        expect(db.GetDBKeys()).toContain(key);
        expect(db.GetTasks(key)).toEqual([task1]);
    });

    test('should remove a task by id', () => {
        db.AddTask(task1);
        db.AddTask(task2);
        const key = task1.GetDateAsKey();


        db.RemoveTaskById(key, task1.GetTaskID());
        const tasks = db.GetTasks(key);
        expect(tasks).not.toContain(task1);
        expect(tasks).toContain(task2);
    });

    test('should update task completion', () => {
        db.AddTask(task1);
        const key = task1.GetDateAsKey();

        expect(task1.ToString()).toContain('Incomplete');


        db.CompleteTask(key, task1.GetTaskID());
        expect(task1.ToString()).toContain('Done');
    });

    test('toString should return a valid JSON representation of the database', () => {
        db.AddTask(task1);
        const jsonOutput = db.toString();
        expect(jsonOutput).toContain(task1.GetTaskID());
        expect(jsonOutput).toContain(task1.GetTaskDescription());
    });
});
