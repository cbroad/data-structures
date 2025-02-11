import { AbstractHashMap, HashMapBucket, HashMapEntry } from "../../Abstractions";
import { HybridHashMapBucket } from "./HashMap/Buckets";
import { HashMap } from "./HashMap";

class LinkedHashMapEntry<K,V> extends HashMapEntry<K,V> {
    next:LinkedHashMapEntry<K,V>|undefined;
    prev:LinkedHashMapEntry<K,V>|undefined;
}

export class LinkedHashMap<K,V> extends HashMap<K,V> {
    #firstEntry:LinkedHashMapEntry<K,V>|undefined;
    #lastEntry:LinkedHashMapEntry<K,V>|undefined;

    get [Symbol.toStringTag](): string { return "LinkedHashMap"; }

    protected *entriesIterator():Iterator<HashMapEntry<K,V>> {
        let entry = this.#firstEntry;
        while( entry!==undefined ) {
            yield entry;
            entry = entry.next;
        }
    }

    clear():void;
    clear( tableSize:number ):void
    clear( tableSize:number = AbstractHashMap.MinimumTableSize ):void {
        super.clear( tableSize );
        this.#firstEntry = undefined;
        this.#lastEntry = undefined;
    }

    createBucket(): HashMapBucket<K, V> { return new HybridHashMapBucket(); }
    
    protected postDelete( deletedEntry:LinkedHashMapEntry<K,V> ): void {
        if( deletedEntry!==undefined ) {
            if( deletedEntry.next!==undefined ) { deletedEntry.next.prev = deletedEntry.prev; } else { this.#lastEntry  = deletedEntry.prev; }
            if( deletedEntry.prev!==undefined ) { deletedEntry.prev.next = deletedEntry.next; } else { this.#firstEntry = deletedEntry.next; }
            deletedEntry.next = deletedEntry.prev = undefined;
        };
        super.postDelete( deletedEntry );
    }
    
    protected setByEntry( newEntry:LinkedHashMapEntry<K,V> ):boolean
    protected setByEntry( newEntry:LinkedHashMapEntry<K,V>, addToList:boolean ):boolean
    protected setByEntry( newEntry:LinkedHashMapEntry<K,V>, addToList:boolean = true ):boolean {
        let success = super.setByEntry( newEntry );
        if( success===true && addToList===true ) {
            if( this.#firstEntry===undefined ) { this.#firstEntry     = newEntry; }
            if( this.#lastEntry !==undefined ) { this.#lastEntry.next = newEntry; }
            newEntry.prev   = this.#lastEntry;
            this.#lastEntry = newEntry;
        }
        return success;
    }

}