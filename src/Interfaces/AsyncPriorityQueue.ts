import { AsyncCollection } from "@/Interfaces/AsyncCollection";
import { PriorityQueue } from "@/Interfaces/PriorityQueue";

export interface AsyncPriorityQueue<T> extends AsyncCollection<T>, AsyncIterable<T>, PriorityQueue<T> {
    pollAsync(): Promise<T | undefined>;
}