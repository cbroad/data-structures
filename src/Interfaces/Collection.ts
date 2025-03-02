import type { CallbackFunction, FilterFunction } from "@/Types";

/**
 * Root interface of collections. Defines basic functionality required of this library.
 */
export interface Collection<T> extends Iterable<T> {
    /**
     * @type {boolean}
     * @description
     * true if Collection contains no items, else false.
     */
    get empty(): boolean;
    /**
     * @type {number}
     * @description
     * the number of items in the Collection
     */
    get size(): number;

    /**
     * @description
     * Adds a value to the Collection, returning the Collection.
     * 
     * @param {T} value - value to be added
     * @param {true} [confirm] - if true, function returns a boolean value indicating if the operation was successful.
     * @returns {boolean|Collection} If confirm was set to true, returns true if the value was added, and false if it was not.  
     *                               Otherwise, returns this collection
     */
    add(value: T): this; // JS Set/Map
    add(value: T, confirm: true): boolean;
    add(value: T, confirm: boolean): boolean | this;

    /**
     * @description
     * Adds alls values to the collection.
     * 
     * @param {Iterable<T>} values - values to be added
     * @returns {boolean|Collection} true if the collection changed, else false.
     */
    addAll(values: Iterable<T>): boolean;

    /**
     * Removes all values from collection
     */
    clear(): void; // JS Set/Map

    /**
     * Checks if the value exists in the collection.
     * 
     * @param {T} value search value
     * @returns {boolean} true if the value exists in collection, else false
     */
    contains(value: T): boolean;

    /**
     * Checks if the values exists in the collection.
     * 
     * @param {Iterable<T>} values search values
     * @returns {boolean} true if the values all exists in collection, else false
     */
    containsAll(values: Iterable<T>): boolean;

    /**
     * Deletes a value from the collection.
     * @param {T} value - value to delete
     * @returns {boolean} true if the value was deleted, else false
     */
    delete(value: T): boolean; // JS Set/Map

    /**
     * Retrives an iterator of pairs comprised of two of each value in collection.
     * @returns {Iterator<[T,T]>} iterator of pairs of two copies of each value
     */
    entries(): Iterator<[T, T]>; // JS Set/Map    

    /**
     * Compares collections to see if they are equal to each other (i.e. have the same contents).
     * @param {Array<V>|Collection<V>|Iterable<V>|Set<V>} other  other collection
     * @returns {boolean} true if the collections have the same contents, else false
     */
    equals<V>(other: Array<V> | Collection<V> | Iterable<V> | Set<V>): boolean;

    /**
     * Iterates through collection, executing callback for every element.
     * @param {(value: T, _value2: unknown, collection: Collection<T>)=>void} callbackfn - function to call
     * @param {any} [thisArg] - this scope for callback function
     */
    forEach(callbackfn: CallbackFunction<T, unknown, Collection<T>>, thisArg?: any): void; // JS Set/Map                                                 // JS Set/Map

    /**
     * Test if a value exists in the collection.
     * 
     * @param {T} value - value to test
     * @returns {booelan} true if value exists in collection, else false 
     */
    has(value: T): boolean; // JS Set/Map


    /**
     * Retrieves iterator of values in collection.
     * @returns {Iterator<T>} iterator of values in collection.
     */
    keys(): Iterator<T>; // JS Set/Map

    /**
     * Removes value from collection
     * @param {T} value - value to remove
     * @returns {boolean} true if value was removed, else false.
     */
    remove(value: T): boolean;

    /**
     * Removes all values from collection.
     * @param {Iterable<T>} values - Values to remove from collection.
     * @returns {boolean} true if collection changed
     */
    removeAll(values: Iterable<T>): boolean;

    /**
     * Removes values matching filter from collection.
     * @param {(value:T)=>booelan} searchFunction function to test values against
     * @returns {boolean} true if collection changed
     */
    removeIf(searchFunction: FilterFunction<T>): boolean;

    /**
     * Remove values not included in provided iterable.
     * @param {Iterable<T>} values - values to keep.
     * @returns {boolean} true if collection changed
     */
    retainAll(values: Iterable<T>): boolean;


    /**
     * Converts collection to an array.
     * @returns {T[]} Array of items from collection.
     */
    toArray(): T[];

    /**
     * Creates a valid JSON string from collection.
     * @returns {string} Parsable JSON string.
     */
    toJSON(): string;

    /**
     * Creates a string representation from collection.
     * @returns {string} String representation for collection.
     */
    toString(): string;

    /**
     * Gets an iterator of values in collection.
     * @returns {Iterator<T>} iterator of values in collection.
     */
    values(): Iterator<T>; // JS Set/Map
}
