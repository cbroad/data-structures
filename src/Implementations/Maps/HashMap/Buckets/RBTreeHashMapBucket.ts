import { HashMapBucket, HashMapEntry, MapEntryCompareFunction } from "../../../../Abstractions";
import { RedBlackTree } from "../../../BinaryTrees";

export class RBTreeHashMapBucket<K,V> extends HashMapBucket<K,V> {
    #tree = new RedBlackTree<HashMapEntry<K,V>>( { allowDupes: false, overWriteDupes:true, compare:MapEntryCompareFunction, } )
    get size(): number { return this.#tree.size; }
    
    *[Symbol.iterator](): Iterator<HashMapEntry<K, V>, any, undefined> {
        yield* this.#tree;
    }

    getByEntry( entry: HashMapEntry<K, unknown> ): HashMapEntry<K,V> | undefined {
        return this.#tree.get( entry as HashMapEntry<K,V> );
    }

    removeByEntry(entry: HashMapEntry<K, unknown>): HashMapEntry<K,V> | undefined {
        return this.#tree.removeAndReturn( entry as HashMapEntry<K,V> );
    }

    setByEntry(entry: HashMapEntry<K, V>): boolean {
        return this.#tree.add( entry, true );
    }
}