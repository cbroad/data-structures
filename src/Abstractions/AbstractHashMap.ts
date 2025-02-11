import { hash } from "../Functions";
import { AbstractMap, MapEntry } from "./AbstractMap";
import { MapParameters } from "../Types";

const MINIMUM_SIZE = 64;
const THRESHOLD = 1.5;
const MULTIPLIER = 2;

const LOG_RESIZING = false;

export class HashMapEntry<K,V> extends MapEntry<K,V> {

    digest:number;

    constructor( key:K, value:V );
    constructor( key:K, value:V, next:HashMapEntry<K,V>|undefined );
    constructor( key:K, value:V, next?:HashMapEntry<K,V>|undefined ) {
        super( key, value );
        this.digest = hash( key );
    }

    static query<K,V>( key:K ):HashMapEntry<K,V>
    static query<K,V>( key:K, value:V|undefined = undefined ):HashMapEntry<K,V> {
        return new HashMapEntry( key, value! );
    }

    hash( upperLimit:number ):number;
    hash( data:any[] ):number;
    hash( upperLimit:number|any[] ):number {
        return this.digest%( (upperLimit as any[]).length ?? upperLimit );
    }
}


export abstract class HashMapBucket<K,V> implements Iterable<HashMapEntry<K,V>> {

    abstract get size():number;
    
    abstract [Symbol.iterator](): Iterator<HashMapEntry<K, V>, any, undefined>;// { throw new NotImplementedError(); }

    protected createEntry( key:K, value?:V ):HashMapEntry<K,V> { return new HashMapEntry(key, value! ); }

    get( key:K ):HashMapEntry<K,V>|undefined { return this.getByEntry( this.createEntry( key ) ); }

    abstract getByEntry( entry:HashMapEntry<K,unknown> ):HashMapEntry<K,V>|undefined;

    remove( key:K ):HashMapEntry<K,V>|undefined { return this.removeByEntry( this.createEntry( key ) ); }

    abstract removeByEntry( entry:HashMapEntry<K,unknown> ):HashMapEntry<K,V>|undefined;
    
    set( key:K, value:V ):boolean { return this.setByEntry( this.createEntry( key, value ) ); }

    abstract setByEntry( entry:HashMapEntry<K,V> ):boolean;


    toArray():Array<HashMapEntry<K,V>> {
        console.log( "toArray()" );
        const arr = [];
        for( const entry of this ) { arr.push( entry ); }
        return arr;
    }

}

export abstract class AbstractHashMap<K,V> extends AbstractMap<K,V> {

    static MinimumTableSize = MINIMUM_SIZE;

    #data = new Array<HashMapBucket<K,V>|undefined>( MINIMUM_SIZE );
    #size = 0;

    constructor();
    constructor( params: MapParameters<K,V> );
    constructor( params: MapParameters<K,V> = {} ) {
        super( params );
    }
    
    get data():Array<HashMapBucket<K,V>|undefined> { return this.#data; }

    get size() { return this.#size; }

    #addToBucket( newEntry:HashMapEntry<K,V> ):boolean {
        const hashValue = newEntry.hash( this.#data );
        return ( this.#data[ hashValue ] || ( this.#data[ hashValue ] = this.createBucket() ) ).setByEntry( newEntry );
    }

    clear():void;
    clear( tableSize:number ):void
    clear( tableSize:number = AbstractHashMap.MinimumTableSize ):void {
        this.#data = new Array<HashMapBucket<K,V>|undefined>( tableSize );
        this.#size = 0;
    }

    abstract createBucket():HashMapBucket<K,V>;

    protected createEntry( key:K, value?:V ):MapEntry<K,V> {
        return new HashMapEntry( key, value! );
    }
    
    deleteAndReturn(key: K): V | undefined {
        const queryEntry = HashMapEntry.query( key );
        const hashValue = queryEntry.hash( this.#data );
        const bucket = this.#data[ hashValue ];
        const resultEntry = bucket?.removeByEntry( queryEntry );
        if( resultEntry!==undefined ) {
            this.postDelete( resultEntry );
            if( bucket!.size===0 ) {
                this.#data[ hashValue ] = undefined;
            }
            this.#size--;
            this.#shrink();
        }
        return resultEntry?.value;
    }

    protected *entriesIterator():Iterator<HashMapEntry<K,V>> {
        for( const bucket of this.#data ) {
            if( bucket ) {
                yield* bucket;
            }
        }
    }

    get( key:K ):V|undefined {
        return this.getEntry( key )?.value;
    }

    
    getEntry( key:K ):HashMapEntry<K,V>|undefined {
        const queryEntry = HashMapEntry.query( key );
        const hashValue = queryEntry.hash( this.#data );
        return this.#data[ hashValue ]?.getByEntry( queryEntry );
    }

    has( key:K ):boolean {
        return this.getEntry( key )!==undefined;
    }

    protected postDelete( deletedEntry:HashMapEntry<K,V> ): void {};

    protected setByEntry( newEntry:HashMapEntry<K,V> ):boolean {
        const addedEntry = this.#addToBucket( newEntry );
        if( addedEntry === true ) {
            this.#size++;
            this.#grow();
        }
        return addedEntry;
    }

    #grow():void {
        if( this.#size < this.#data.length*THRESHOLD ) return;
        const newSize = MULTIPLIER*this.#data.length;
        if( LOG_RESIZING ) { console.log( "#grow(%d)", newSize ); }
        this.#resize( newSize );
        if( LOG_RESIZING ) { console.log( "#grew(%d)", newSize ); }
    }

    #shrink():void {
        if( this.#size > this.#data.length/THRESHOLD ) return;
        if( this.#data.length===MINIMUM_SIZE ) return;
        let newSize = this.#data.length/MULTIPLIER;
        if( LOG_RESIZING ) { console.log( "#shrink(%d)", newSize ); }
        this.#resize( Math.max( newSize ) );
        if( LOG_RESIZING ) { console.log( "#shrunk(%d)", newSize ); }
    }

    #resize( newSize:number ):void {
        const oldEntries = this.entriesArray as HashMapEntry<K,V>[];
        this.#data = new Array<HashMapBucket<K,V>|undefined>( newSize );
        for( const entry of oldEntries ) { this.#addToBucket( entry ); }
    }

}