
import { Mutex } from "semasync";
import { AbstractDeque } from "../../Abstractions";
import { AsyncQueue, AsyncStack, List } from "../../Interfaces";
import { CollectionParameters } from "../../Types";

export class ArrayList<T> extends AbstractDeque<T> implements AsyncQueue<T>, AsyncStack<T>, List<T> {
    
    protected _abortController:AbortController = new AbortController();
    protected _data:T[] = [];
    protected _mutex:Mutex = new Mutex();
    
    get [Symbol.toStringTag](): string { return "ArrayList"; }
    get first():T|undefined { return this._data[0]; }
    get last():T|undefined { return this._data[this._data.length-1]; }
    get size():number { return this._data.length; }

    constructor();
    constructor( params:CollectionParameters<T> );
    constructor( params:CollectionParameters<T>={} ) {
        super( params );
        this.resetAsync();
    }
    
    async *[Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
        let cleared:boolean = false;
        const onAbort = () => cleared=true;
        this._abortController.signal.addEventListener( "abort", onAbort );
        let value:T|undefined;
        while( cleared===false && ( value = await this.dequeueAsync() )!==undefined ) { yield value; }
        this._abortController.signal.removeEventListener( "abort", onAbort );
    }

    *[Symbol.iterator]():Iterator<T, any, undefined> {
        yield* this._data;
    }

    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):boolean|this {
        const result = this._data.push( value )>0;
        if( result===true && this._mutex.available===0 ) { this._mutex.release(); }
        return confirm ? result : this;
    }

    break():void {
        this._abortController.abort();
    }

    clear(): void {
        this._data = [];  
        this.break();      
    }

    dequeue():T|undefined {
        return this._data.shift();
    }
    
    async dequeueAsync():Promise<T|undefined> {
        try {
            while( this.empty ) { await this._mutex.acquire( { signal:this._abortController.signal } ); }
            return this.dequeue();
        } catch( e ) {
            console.log( e );
            return undefined;
        }
    }

    get( idx:number ):T|undefined {
        return this._data[idx];
    }

    has( value:T ):boolean {
        return this._data.includes( value );
    }

    indexOf(value: T): number {
        return this._data.indexOf( value );
    }

    insert(value: T, idx: number): boolean {
        if( idx<0 || idx > this.size ) { return false; }
        const result = this._data.splice( idx, 0, value )!==undefined;
        if( result===true && this._mutex.waiting ) { this._mutex.release(); }
        return result;
    }

    pop(): T | undefined { return this._data.pop(); }   
 
    async popAsync():Promise<T|undefined> {
        try {
            while( this.empty ) { await this._mutex.acquire( { signal:this._abortController.signal } ); }
            return this.pop();
        } catch( e ) {
            return undefined;
        }
    }
    
    removeFrom(idx: number): T|undefined {
        if( idx<0 || idx >= this.size ) { return undefined; }
        return this._data.splice( idx, 1 )[0];
    }

    resetAsync():void {
        if( this._abortController.signal.aborted ) { this._abortController = new AbortController(); }
        this._abortController.signal.addEventListener( "abort", this.resetAsync.bind(this) );
        while( this._mutex.waiting ) { this._mutex.release(); }
        this._mutex.acquire()
    }

    shift(): T | undefined { return this._data.shift(); }

    toJSON():string { return JSON.stringify( this._data ); }

    unshift(value: T): boolean {
        this._data.unshift( value );
        const result = true;
        if( result===true && this._mutex.waiting ) { this._mutex.release(); }
        return result;
    }
    
}