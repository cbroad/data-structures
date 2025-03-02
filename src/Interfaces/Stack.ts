import type { Collection } from "@/Interfaces/Collection";

export interface Stack<T> extends Collection<T> {
    /**
     * @type {T|undefined}
     * @description
     * Value at top of stack.
     */
    get top(): T | undefined;

    /**
     * Remove value from the top of the Stack.
     * @returns {T|undefined}
     */
    pop(): T | undefined;

    /**
     * Adds value to the top of the Stack.
     * @param {T|undefined} value - value to add to end of Stack
     * @returns {boolean} true if value was added, else false.
     */
    push(value: T): boolean;
}