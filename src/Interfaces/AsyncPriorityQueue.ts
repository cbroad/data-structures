import { AsyncCollection } from "./AsyncCollection";
import { PriorityQueue } from "./PriorityQueue";

export interface AsyncPriorityQueue<T> extends AsyncCollection<T>, AsyncIterable<T>, PriorityQueue<T> {
    pollAsync():Promise<T|undefined>;
}