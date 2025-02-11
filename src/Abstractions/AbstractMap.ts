import { NotImplementedError } from "../NotImplementedError";
import { CallbackFunction, MapParameters } from "../Types";
import { defaults as DefaultFunctions, iteratorTransformer, makeIterable } from "../Functions";
import { MyMap } from "../Interfaces";


export function MapEntryCompareFunction<K,V>( u:{key:K,value:V}, v:{key:K,value:V} ):-1|0|1  { return DefaultFunctions.compare( u.key, v.key ); }

export class MapEntry<K,V> {

    key:K;
    value:V;

    constructor( key:K, value:V ) {
        this.key = key;
        this.value = value;
    }

    toArray():[K,V] {
        return [ this.key, this.value ];
    }

    static create<K,V>( key:K, value:V ):MapEntry<K,V> {
        return new MapEntry( key, value! );
    }

    static convertPairsArray<K,V>( arr:[K,V][]|{key:K,value:V}[]|MapEntry<K,V>[] ): MapEntry<K,V>[] {
        return Array.isArray( arr ) && Array.isArray( arr[0] ) && ( arr as [K,V][] ).map( entry => new MapEntry(entry[0], entry[1] ) ) || arr as MapEntry<K,V>[];
    }

    static query<K,V>( key:K ):MapEntry<K,V>
    static query<K,V>( key:K, value:V|undefined = undefined ):MapEntry<K,V> {
        return new MapEntry( key, value! );
    }
}

export abstract class AbstractMap<K,V> implements MyMap<K,V>, Iterable<[K,V]> {

    constructor();
    constructor( params:MapParameters<K,V> );
    constructor( params:MapParameters<K,V> = {} ) {
        params.fromArray?.forEach( entry => Array.isArray( entry ) ? this.set( entry[0], entry[1] ) : this.set( entry.key, entry.value! ) );
    }

    get empty():boolean { return this.size===0; }
    
    get entriesArray():MapEntry<K,V>[] {
        const arr = [];
        for( const entry of makeIterable( this.entriesIterator() ) ) { arr.push( entry ); }
        return arr;
    }

    get keysArray():K[] { return this.entriesArray.map( entry => entry.key ); }
    get size():number { return this.entriesArray.length; }
    get valuesArray():V[] { return this.entriesArray.map( entry => entry.value! ); }

    [Symbol.iterator](): Iterator<[K,V], any, undefined> {
        return iteratorTransformer( this.entriesIterator(), (entry:MapEntry<K,V>) => entry.toArray() );
    }

    protected entriesIterator():Iterator<MapEntry<K,V>> { throw new NotImplementedError(); }
    
    clear():void { this.forEach( ( ( _value, key ) => this.delete( key ) ) ); }

    delete( key:K ):boolean { return this.deleteAndReturn( key )!==undefined; }

    deleteAndReturn( key:K ):V|undefined { throw new NotImplementedError(); }

    *entries(): Iterator<[K,V]> { yield* this; }

    forEach( callbackfn:CallbackFunction<V,K,MyMap<K,V>>, thisArg?:any ):void {
        for( const entry of this ) { callbackfn.call( thisArg, entry[1], entry[0], this ); }
    }

    get( key:K ):V|undefined { throw new NotImplementedError(); }

    keys(): Iterator<K> { return iteratorTransformer( this.entriesIterator(), (entry:MapEntry<K,V>) => entry.key ); }

    has( key:K ):boolean { return this.keysArray.includes( key ); }

    set( key:K, value:V ):MyMap<K,V> { this.setAndConfirm( key, value ); return this; }

    setAndConfirm( key:K, value:V ):boolean { return this.setByEntry( this.createEntry( key, value ) ); }

    values(): Iterator<V> { return iteratorTransformer( this.entriesIterator(), (entry:MapEntry<K,V>) => entry.value ); }

    protected createEntry( key:K, value:V ):MapEntry<K,V> { throw new NotImplementedError(); }

    protected setByEntry( newEntry:MapEntry<K,V> ):boolean { throw new NotImplementedError(); }

    protected mapEntryToArray( entry:MapEntry<K,V>|undefined):[K,V]|undefined {
        return entry===undefined
            ? undefined
            : [entry.key, entry.value]
        ;
    }
};