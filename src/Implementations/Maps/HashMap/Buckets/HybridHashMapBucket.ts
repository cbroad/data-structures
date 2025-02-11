import { HashMapBucket, HashMapEntry } from "../../../../Abstractions";
import { ArrayHashMapBucket } from "./ArrayHashMapBucket";
import { RBTreeHashMapBucket } from "./RBTreeHashMapBucket";

enum BucketType { 
    Array,
    // LinkedList,
    Tree,
}

export class HybridHashMapBucket<K,V> extends HashMapBucket<K,V> {
    #bucket:HashMapBucket<K,V> = new ArrayHashMapBucket();
    #type:BucketType = BucketType.Array;

    *[Symbol.iterator](): Iterator<HashMapEntry<K, V>, any, undefined> { yield* this.#bucket; }

    get bucket(): HashMapBucket<K,V> { return this.#bucket; } 
    get size(): number { return this.#bucket.size; }

    getByEntry(entry: HashMapEntry<K, unknown>): HashMapEntry<K,V> | undefined { return this.#bucket.getByEntry( entry ); }

    removeByEntry(entry: HashMapEntry<K, unknown>): HashMapEntry<K,V> | undefined {
        const result = this.#bucket.removeByEntry( entry );
        if( result!==undefined ) {
            if( this.#type===BucketType.Tree && this.size===6 ) {
                // console.log( "migrating to array bucket" );
                this.#bucket = transferToNewBucket( this.#bucket, new ArrayHashMapBucket() );
                this.#type = BucketType.Array;
            }
        }
        return result;
    }

    setByEntry(entry: HashMapEntry<K, V>): boolean {
        const result = this.#bucket.setByEntry( entry );
        if( result ) {
            if( this.#type===BucketType.Array && this.size===6 ) {
                // console.log( "migrating to tree bucket" );
                this.#bucket = transferToNewBucket( this.#bucket, new RBTreeHashMapBucket() );
                this.#type = BucketType.Tree;
            }
        }
        return result;
    }
}

function transferToNewBucket<K,V>( oldBucket:HashMapBucket<K,V>, newBucket:HashMapBucket<K,V> ):HashMapBucket<K,V> {
    for( const entry of oldBucket ) { newBucket.setByEntry( entry ); }
    return newBucket;
}
