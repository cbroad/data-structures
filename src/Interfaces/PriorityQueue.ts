import type { Collection } from "@/Interfaces/Collection";

/**
 * @description
 * A queue where elements are ordered.
 */
export interface PriorityQueue<T> extends Collection<T> {
    /**
     * @description
     * Element at front of queue.
     */
    get first(): T | undefined;

    /**
     * @description
     * Removes and returns element from front of queue.
     * @returns {T|undefined} value from front of queue, undefined if empty.
     */
    poll(): T | undefined;
}