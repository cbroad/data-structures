import { AsyncCollection } from "@/Interfaces/AsyncCollection";
import { Queue } from "@/Interfaces/Queue";

export interface AsyncQueue<T> extends AsyncCollection<T>, Queue<T> {
    dequeueAsync(): Promise<T | undefined>;
}