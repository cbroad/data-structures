import { HashMapBucket, HashMapEntry } from "../../../../Abstractions";

class LinkedListHashMapEntry<K,V> extends HashMapEntry<K,V> {

    sibling:LinkedListHashMapEntry<K,V>|undefined;

    constructor( key:K, value:V );
    constructor( key:K, value:V, sibling:LinkedListHashMapEntry<K,V>|undefined );
    constructor( key:K, value:V, sibling?:LinkedListHashMapEntry<K,V>|undefined ) {
        super( key, value );
        this.sibling = sibling;
    }

    static llify<K,V>( entry:HashMapEntry<K,V> ):LinkedListHashMapEntry<K,V> {
        if( entry.hasOwnProperty( "next" ) ) {
            return entry as LinkedListHashMapEntry<K,V>;
        }
        return new LinkedListHashMapEntry( entry.key, entry.value );
    }

}

export class LinkedListHashMapBucket<K,V> extends HashMapBucket<K,V> {

    #root:LinkedListHashMapEntry<K,V>|undefined;

    #size:number = 0;

    get size():number { return this.#size };

    *[Symbol.iterator](): Iterator<LinkedListHashMapEntry<K, V>, any, undefined> {
        for( let entry=this.#root ; entry ; entry=entry.sibling ) { yield entry };
    }

    #find( entry:HashMapEntry<K,unknown>):[ LinkedListHashMapEntry<K,V>|undefined, LinkedListHashMapEntry<K,V>|undefined] {
        let prev:LinkedListHashMapEntry<K,V>|undefined = undefined;
        for( let cur = this.#root ; cur ; prev=cur, cur=cur.sibling ) {
            if( entry.key===cur.key ) {
                return [prev, cur];
            }
        }
        return [undefined, undefined];
    }
    
    
    protected createEntry( key:K, value?:V ):HashMapEntry<K,V> { return new LinkedListHashMapEntry(key, value! ); }

    getByEntry(entry: HashMapEntry<K, unknown>): LinkedListHashMapEntry<K,V> | undefined {
        const [ prev, target ] = this.#find( entry );
        if( target===undefined) { return undefined;}
        return target;
    }

    removeByEntry(entry: HashMapEntry<K, unknown>): LinkedListHashMapEntry<K,V> | undefined {
        const [ prev, target ] = this.#find( entry );
        if( target===undefined) { return undefined;}
        if( prev===undefined ) {
            this.#root = target.sibling;
        } else {
            prev.sibling = target.sibling;
        }
        this.#size--;
        return target;
    }

    setByEntry(entry: HashMapEntry<K, V>): boolean {
        const [ prev, target ] = this.#find( entry );
        if( target!==undefined ) {
            target.value = entry.value;
            return false;
        }
        const llEntry = LinkedListHashMapEntry.llify( entry );
        llEntry.sibling = this.#root;
        this.#root = llEntry;
        this.#size++;
        return true;
    }

}