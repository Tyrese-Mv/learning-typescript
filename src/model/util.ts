import { Task } from "./TaskClass";
type TaskKey = string;
type TaskStorage = Task[];

export interface DB {
    [key: TaskKey]: TaskStorage;
}