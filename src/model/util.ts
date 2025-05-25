import { Task } from "./TaskClass";
export type TaskKey = string;
export type TaskStorage = Task[];

export interface DB {
    [key: TaskKey]: TaskStorage;
}