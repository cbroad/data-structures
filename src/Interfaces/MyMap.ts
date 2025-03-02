import type { CallbackFunction, } from "@/Types";

// export interface MyMap<K, V> extends Map<K, V> {
//     get empty(): boolean;
//     deleteAndReturn(key: K): V | undefined;
//     forEach(callbackfn: (value: V, key: K, map: MyMap<K, V>) => void, thisArg?: any): void;
//     set(key: K, value: V): MyMap<K, V>;
//     setAndConfirm(key: K, value: V): boolean;
// };


export interface MyMap<K, V> extends Iterable<[K, V]> {
    /**
     * @type {boolean}
     * @description
     * true if collection contains no items, else false.
     */
    get empty(): boolean;

    /**
     * @type {number}
     * @description
     * the number of items in the collection
     */
    get size(): number;

    /**
     * @type {Map<K,V>}
     * @description
     * a copy of this Map, cast to the type of a native JavaScript Map. 
     */
    get JSMap(): Map<K, V>;

    /**
     * Removes all entries from map.
     */
    clear(): void;

    /**
     * Deletes entry with given key from map.
     * @param {K} key - key to delete
     * @returns {boolean} true if the entry was deleted, else false
     */
    delete(key: K): boolean;

    /**
     * Deletes entry with given key from map. returns deleted value.
     * @param {K} key - key to delete
     * @returns {boolean} if entry was deleted, returns deleted value, else undefined
     */
    deleteAndReturn(key: K): V | undefined;

    /**
     * Retrives an iterator of key, value pairs of map entries.
     * @returns {Iterator<[K,V]>} iterator of key, value pairs
     */
    entries(): Iterator<[K, V]>;

    /**
     * Iterates through map entries, executing callback for every entry.
     * @param {(k: V, key: K, map: MyMap<K,V>)=>void} callbackfn - function to call
     * @param {any} [thisArg] - this scope for callback function
     */
    forEach(callbackfn: CallbackFunction<V, K, MyMap<K, V>>, thisArg?: any): void;

    /**
     * Retrieve the value for the given key in the Map.
     * @param {K} key - key
     * @returns {V|undefined} value at for given key, or undefined if no value.
     */
    get(key: K): V | undefined;

    /**
     * Tests if the given key exists in the Map.
     * @param {K} key - key
     * @returns {boolean} true if key exists, else false
     */
    has(key: K): boolean;

    /**
     * Retrives an iterator of keys for the map.
     * @returns {Iterator<K>} iterator of keys
     */
    keys(): Iterator<K>;

    /**
     * Sets a key value pair in the map.
     * @param {K} key
     * @param {V} value 
     * @returns {Map<K,V>} reference to the map
     */
    set(key: K, value: V): MyMap<K, V>;

    /**
     * Sets a key value pair in the map, returns false if a new entry is created.
     * @param {K} key
     * @param {V} value 
     * @returns {boolean} true if a new entry is created, false if an entry exists and was modified or is unchanged
     */
    setAndConfirm(key: K, value: V): boolean;

    /**
     * Retrives an iterator of values for the map.
     * @returns {Iterator<V>} iterator of values
     */
    values(): Iterator<V>;
};