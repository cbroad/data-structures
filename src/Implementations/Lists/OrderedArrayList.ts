import { defaults as DefaultFunctions } from "../../Functions";
import { CompareFunction, OrderedCollectionParameters } from "../../Types";
import { AsyncPriorityQueue, PriorityQueue } from "../../Interfaces";
import { ArrayList } from "./ArrayList";

export class OrderedArrayList<T> extends ArrayList<T> implements AsyncPriorityQueue<T>, PriorityQueue<T> {

    protected compare:CompareFunction<T>;

    constructor();
    constructor( params:OrderedCollectionParameters<T> );
    constructor( params:OrderedCollectionParameters<T> = {} ) {
        super( params );
        this.compare = params.compare ?? DefaultFunctions.compare;
    }

    get [Symbol.toStringTag](): string { return "ArrayPriorityQueue"; }

    #indexOf( value:T ):number {
        let l = 0;
        let r = this._data.length;
        while( l<=r ) {
            const m = ( (l+r)/2 )|0;
            const comp = this.compare( value, this._data[m] );
            if( comp < 0 ) { r = m-1; }
            else if( comp > 0 ) { l = m+1; }
            else { return m; }
        }
        return -l;
    }
    
    #insertionIndex( value:T ):number {
        return Math.abs( this.#indexOf( value ) );
    }

    async *[Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
        let cleared:boolean = false;
        const onAbort = () => cleared=true;
        this._abortController.signal.addEventListener( "abort", onAbort );
        let value:T|undefined;
        while( cleared===false && ( value = await this.pollAsync() )!==undefined ) { yield value; }
        this._abortController.signal.removeEventListener( "abort", onAbort );
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        for( const value of this._data ) { yield value; }
    }

    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):this|boolean {
        this._data.splice( this.#insertionIndex( value ), 0, value );
        const result = true;
        if( result===true && this._mutex.waiting ) { this._mutex.release(); }
        return confirm ? true : this;
    }

    has( value:T ):boolean {
        return this.#indexOf( value )>=0;
    }

    poll(): T | undefined {
        return this.removeFrom( 0 );
    }
    
    async pollAsync():Promise<T|undefined> {
        try {
            while( this.empty ) { await this._mutex.acquire( { signal:this._abortController.signal } ); }
            return this.poll();
        } catch( e ) {
            console.log( e );
            return undefined;
        }
    }

    remove( value:T ):boolean {
        const idx = this.#indexOf( value );
        if( idx<0 ) { return false; }
        this._data.splice(idx, 1 );
        return true;
    }
}