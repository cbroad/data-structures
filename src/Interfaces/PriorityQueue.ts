import { Collection } from "@/Interfaces/Collection";

export interface PriorityQueue<T> extends Collection<T> {
    get first(): T | undefined;

    poll(): T | undefined;
}