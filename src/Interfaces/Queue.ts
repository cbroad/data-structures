import type { Collection } from "@/Interfaces/Collection";

export interface Queue<T> extends Collection<T> {
    /**
     * @type {T|undefined}
     * @description
     * First value in Queue, undefined if empty.
     */
    get first(): T | undefined;

    /**
     * Remove value from the front of the Queue.
     * @returns {T|undefined}
     */
    dequeue(): T | undefined;

    /**
     * Adds value to the end of the Queue.
     * @param {T|undefined} value - value to add to end of Queue
     */
    enqueue(value: T): boolean;

    /**
     * Get next value to the end of the Queue.
     * @param {T|undefined} value - value at front of Queue
     */
    peek(): T | undefined;
}