import { AsyncQueue } from "../Interfaces";
import { NotImplementedError } from "../NotImplementedError";
import { Mutex } from "semasync";
import { CollectionParameters } from "../Types";
import { AbstractQueue } from "./AbstractQueue";

export abstract class AbstractAsyncQueue<T> extends AbstractQueue<T> implements AsyncQueue<T> {

    _mutex: Mutex = new Mutex();;
    _abortController: AbortController = new AbortController();

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

    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):this|boolean {
        const result = this.addRaw( value );
        console.log( "add=>%J", result );
        if( result===true && this._mutex.waiting ) {
            console.log( "Releasing" );
            this._mutex.release();
        }
        return confirm ? result : this;
    }

    protected addRaw( value:T ):boolean {
        throw new NotImplementedError();
    }

    break():void {
        this._abortController.abort();
    }

    clear():void {
        super.clear();
        this.break();
    }

    dequeue():T|undefined { throw new NotImplementedError(); }

    async dequeueAsync():Promise<T|undefined> {
        try {
            while( this.empty ) {
                console.log( "Acquiring" );
                setTimeout( () => console.log( "Waiting: %j", this._mutex.waiting ), 100)
                await this._mutex.acquire( { signal:this._abortController.signal } );
                console.log( "Acquired" );
            }
            return this.dequeue();
        } catch( e ) {
            console.log( e );
            return undefined;
        }
    }

    peek():T|undefined { return this.first; }

    resetAsync():void {
        console.log( "Resetting" );
        if( this._abortController.signal.aborted ) { this._abortController = new AbortController(); }
        this._abortController.signal.addEventListener( "abort", this.resetAsync.bind(this) );
        while( this._mutex.waiting ) { this._mutex.release(); }
        this._mutex.acquire();
    }

}