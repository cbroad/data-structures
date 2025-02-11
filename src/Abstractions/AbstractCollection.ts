import { EventEmitter } from "events";
import * as Util from "util";
import { NotImplementedError } from "../NotImplementedError";
import { CallbackFunction, CollectionParameters, CompareFunction, FilterFunction, OrderedCollectionParameters } from "../Types";
import { defaults as DefaultFunctions, iteratorTransformer } from "../Functions";
import { Collection } from "../Interfaces";

export abstract class AbstractCollection<T> extends EventEmitter implements Collection<T> {

    constructor();
    constructor( params:CollectionParameters<T> );
    constructor( params:CollectionParameters<T> = {} ) {
        super();
        params.fromArray && this.addAll( params.fromArray );
    }

    get empty():boolean { return this.size===0; }
    get size():number {
        let n = 0;
        for( let x of this ) { n++; }
        return n;
    }


    #starAll( values:Iterable<T>, func:FilterFunction<T> ) {
        let result = true;
        for( const value of values ) {
            result &&= func( value );
        }
        return result;
    }

    [Symbol.iterator](): Iterator<T, any, undefined> { throw new NotImplementedError(); }

    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):this|boolean {
        throw new NotImplementedError();
    }

    addAll( values:Iterable<T> ):boolean { return this.#starAll( values, ( value:T) => this.add( value, true ) ); }

    clear():void { this.removeAll( this.toArray() ); }

    contains( value:T ):boolean { return this.has( value ); }

    containsAll( values:Iterable<T> ):boolean { return this.#starAll( values, this.contains.bind( this ) ); }

    delete( value:T ):boolean { return this.remove( value ); }

    entries(): Iterator<[T,T]> { return iteratorTransformer<T,[T,T]>( this[Symbol.iterator](), ((v:T)=>([v,v])) ); }

    equals( other:Collection<T> ):boolean { throw new NotImplementedError(); }

    forEach( callbackfn:CallbackFunction<T,T,Collection<T>>, thisArg?:any ):void { for( const value of this ) { callbackfn.call( thisArg, value, value, this, ); } }

    has( value:T ):boolean {
        for( const element of this ) {
            if( value===element ) {
                return true;
            }
        }
        return false;
    }

    *keys():Iterator<T> { yield* this; }

    remove( value:T ):boolean { throw new NotImplementedError(); }

    removeAll( values:Iterable<T> ):boolean { return this.#starAll( values, this.remove.bind( this ) ); }

    removeIf( filterFunction:FilterFunction<T> ):boolean { return this.removeAll( this.toArray().filter( filterFunction ) ); }

    retainAll( values:Iterable<T> ):boolean {
        const toRemove:T[] = [];
        for( const value of this ) {
            let removeIt = true;
            for( const other of values ) {
                if( value===other ) {
                    removeIt = false;
                    break;
                }
            }
            if( removeIt ) {
                toRemove.push( value );
            }
        }
        return this.removeAll( toRemove );
    }

    toArray():T[] {
        const result:T[] = [];
        for( const value of this ) {
            result.push( value );
        }
        return result;
    }

    toJSON():string { return Util.format( "%j", {} ); }

    toString():string { return this.toJSON(); }

    *values(): Iterator<T> { yield* this; }
}


export abstract class AbstractOrderedCollection<T> extends AbstractCollection<T> {

    protected compare:CompareFunction<T>;

    constructor();
    constructor( params:OrderedCollectionParameters<T> );
    constructor( params:OrderedCollectionParameters<T> = {} ) {
        super( params );
        this.compare = params.compare ?? DefaultFunctions.compare;
    }
}