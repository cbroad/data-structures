import { Collection } from "./Collection";

export interface Queue<T> extends Collection<T> {
    get first():T|undefined;

    dequeue():T|undefined;
    enqueue( value:T ):boolean;
    peek():T|undefined;
}