import type { Queue } from "@/Interfaces/Queue";
import type { Stack } from "@/Interfaces/Stack";

export interface Deque<T> extends Queue<T>, Stack<T> {
    /**
     * @type {T|undefined}
     * @description
     * Last value in Deque, undefined if empty.
     */
    get last(): T | undefined;

    /**
     * Remove value from the front of the Deque.
     * @returns {T|undefined}
     */
    shift(): T | undefined;

    /**
     * Adds value to the front of the Deque.
     * @param {T|undefined} value - value to add to end of Deque
     */
    unshift(value: T): boolean;
}