import type { Collection } from "@/Interfaces/Collection";
import { CallbackFunction } from "@/Types";

export interface List<T> extends Collection<T> {
    /**
     * Iterates through collection, executing callback for every element.
     * @param {(value: T, index: number, collection: List<T>)=>void} callbackfn - function to call
     * @param {any} [thisArg] - this scope for callback function
     */
    forEach(callbackfn: CallbackFunction<T, number, Collection<T>>, thisArg?: any): void;

    /**
     * Retrieve the value from the given index in the List.
     * @param {number} idx - index of value in list
     * @returns {T|undefined} value at index in list, or undefined if no value.
     */
    get(idx: number): T | undefined;

    /**
     * Gets the index of the first instance of the value in List.
     * @param {T} value - value to find in list
     * @returns {number} first index of value in list, -1 if not found.
     */
    indexOf(value: T): number;

    /**
     * Inserts value at given index in List.
     * @param {T} value - value to insert
     * @param {number} idx - index at which to insert value
     * @return {boolean} true if value was inserted, else false.
     */
    insert(value: T, idx: number): boolean;

    /**
     * Remove and return value at given index.
     * @param {number} idx - index of value in List.
     * @returns {T|undefined} value at give index in List, undefined if no value exists.
     */
    removeFrom(idx: number): T | undefined;
}