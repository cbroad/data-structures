import { AsyncCollection } from "./AsyncCollection";
import { Queue } from "./Queue";

export interface AsyncQueue<T> extends AsyncCollection<T>, Queue<T>{
    dequeueAsync():Promise<T|undefined>;
}