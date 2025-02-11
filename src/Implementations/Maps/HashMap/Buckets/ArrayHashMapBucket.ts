import { HashMapBucket, HashMapEntry } from "../../../../Abstractions";

export class ArrayHashMapBucket<K,V> extends HashMapBucket<K,V> {
    #data = [] as Array<HashMapEntry<K,V>>;
    
    get size():number { return this.#data.length };

    #getIndexOf( entry:HashMapEntry<K,unknown>):number { return this.#data.findIndex( e => e.key===entry.key ); }
    
    *[Symbol.iterator](): Iterator<HashMapEntry<K, V>, any, undefined> { yield* this.#data; }

    getByEntry(entry: HashMapEntry<K, unknown>): HashMapEntry<K,V> | undefined {
        const idx = this.#getIndexOf( entry );
        if( idx < 0 ) return undefined;
        return this.#data[ idx ];
    }

    removeByEntry(entry: HashMapEntry<K, unknown>): HashMapEntry<K,V> | undefined {
        const idx = this.#getIndexOf( entry );
        if( idx < 0 ) return undefined;
        return this.#data.splice( idx, 1 )[0];
    }

    setByEntry(entry: HashMapEntry<K, V>): boolean {
        const idx = this.#getIndexOf( entry );
        if( idx<0 ) {
            this.#data.push( entry );
            return true;
        }
        this.#data[ idx ].value = entry.value;
        return false;
    }

    toArray() { return this.#data; }

}