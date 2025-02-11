import { Mutex } from "semasync";
import { AbstractOrderedCollection } from "../Abstractions";
import { defaults as DefaultFunctions, reverseCompare } from "../Functions";
import { AsyncPriorityQueue, PriorityQueue } from "../Interfaces";
import { OrderedCollectionParameters } from "../Types";

const IN_ORDER_ITERATION = false;

class BinaryHeapElement<T> {
    #data:T[];
    #index:number;

    static fromIndex<T>( heapData:T[], index:number ):BinaryHeapElement<T>|undefined {
        if( index < 0 || index > heapData.length ) { return undefined; }
        return new BinaryHeapElement( heapData, index );
    }

    constructor( heapData:T[], index:number ) {
        this.#data = heapData;
        this.#index = index;
    }
    
    set value( value:T) { this.#data[ this.#index ] = value; }
    get value():T { return this.#data[ this.#index ]; }

    get left():BinaryHeapElement<T>|undefined { return this.#fromIndex( 2*this.#index+1 ); }
    get parent():BinaryHeapElement<T>|undefined { return this.#index===0 ? undefined : this.#fromIndex( Math.floor( ( this.#index - 1 ) / 2 ) ); }
    get right():BinaryHeapElement<T>|undefined { return this.#fromIndex( 2*this.#index+2 ); }

    #fromIndex( index:number ):BinaryHeapElement<T>|undefined { return BinaryHeapElement.fromIndex( this.#data, index ); }

    protected toObject():any {
        if( this.value===undefined ) {
            return undefined;
        } else {
            return { left: this.left?.toObject(), right: this.right?.toObject(), value:this.value };
        }
    }

    toJSON() {
        return JSON.stringify( this.toObject() );
    }

    toString() {
        return this.toJSON();
    }
}

export class BinaryHeap<T> extends AbstractOrderedCollection<T> implements AsyncPriorityQueue<T>, PriorityQueue<T> {

    #data:T[] = [];
    
    _mutex:Mutex = new Mutex();
    _abortController:AbortController = new AbortController();

    constructor();
    constructor( parameters:OrderedCollectionParameters<T> );
    constructor( parameters:OrderedCollectionParameters<T> = {} ) {
        super( parameters );
        this.resetAsync();
    }
    
    get [Symbol.toStringTag](): string { return "BinaryHeap"; }
    protected get data():T[] { return this.#data.slice(); }
    protected set data( value:T[] ) { this.#data = value; }
    get first(): T | undefined { return this.#first?.value; }
    get size():number { return this.#data.length; }

    async *[Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
        let cleared:boolean = false;
        const onAbort = () => cleared=true;
        this._abortController.signal.addEventListener( "abort", onAbort );
        let value:T|undefined;
        while( cleared===false && ( value = await this.pollAsync() )!==undefined ) { yield value; }
        this._abortController.signal.removeEventListener( "abort", onAbort );
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        if( IN_ORDER_ITERATION ) {
            const heap = new BinaryHeap<T>( { compare: this.compare } );
            heap.data = this.data;
            while( heap.size ) {
                yield heap.removeFirst()!;
            }
        } else {
            yield* this.#data
        }
    }

    get #first():BinaryHeapElement<T>|undefined {
        return BinaryHeapElement.fromIndex( this.#data, 0 );
    }

    get #last():BinaryHeapElement<T>|undefined {
        return BinaryHeapElement.fromIndex( this.#data, this.#data.length-1 );
    }

    get next():T|undefined {
        return this.#first?.value;
    }

    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):this|boolean {
        this.#data.push( value );
        this.#heapUp( this.#data.length-1 );
        const result = true;
        if( result===true && this._mutex.waiting ) { this._mutex.release(); }
        return confirm ? result : this;
    }

    break():void {
        this._abortController.abort();
    }

    clear():void {
        this.#data = [];
        this.break;
    }

    poll(): T | undefined { return this.removeFirst(); }
    
    async pollAsync():Promise<T|undefined> {
        try {
            while( this.empty ) { await this._mutex.acquire( { signal:this._abortController.signal } ); }
            return this.poll();
        } catch( e ) {
            console.log( e );
            return undefined;
        }
    }

    #removeAt( idx:number):T|undefined {
        const result:T = this.#data[ idx ];
        const temp = this.#data.pop()!;
        if( this.size > 0 ) {
            this.#data[ idx ] = temp;
        }
        if( this.size > 1 ) {
            let element = BinaryHeapElement.fromIndex( this.#data, idx )!;
            if( element.parent && this.compare( element.value, element.parent!.value ) < 0 ) {
                this.#heapUp( idx );
            } else {
                this.#heapDown( idx );
            }
            /** Fix Heap */
        }
        return result;
    }

    #heapUp( idx:number ):void {
        let element:BinaryHeapElement<T> = BinaryHeapElement.fromIndex( this.#data, idx )!;
        const value = element.value;
        let parent: BinaryHeapElement<T>|undefined;
        while( ( parent = element.parent )!==undefined && this.compare( value, parent.value ) < 0 ) {
            element.value = parent.value;
            element = parent!;
            parent = element.parent;
        }
        element.value = value;
    }

    #heapDown( idx:number ):void {
        let element:BinaryHeapElement<T> = BinaryHeapElement.fromIndex( this.#data, idx )!;
        let child:BinaryHeapElement<T> = element;
        do {
            const temp = element.value;
            element.value = child.value;
            child.value = temp;
            element = child;
            child = element;
            if( element.left && this.compare( element.left.value, child.value ) < 0 ) {
                child = element.left;
            }
            if( element.right && this.compare( element.right.value, child.value ) < 0 ) {
                child = element.right;
            }
        } while( element!==child );
    }

    peek(): T | undefined {
        return this.first;
    }

    removeFirst():T|undefined {
        return this.#removeAt( 0 );
    }

    remove( value:T ):boolean {
        let idx = this.#data.findIndex( (v) => this.compare( v, value )===0 );
        if( idx<0 ) { return false; }
        return this.#removeAt( idx )!==undefined;
    }

    resetAsync():void {
        if( this._abortController.signal.aborted ) { this._abortController = new AbortController(); }
        this._abortController.signal.addEventListener( "abort", this.resetAsync.bind(this) );
        while( this._mutex.waiting ) { this._mutex.release(); }
        this._mutex.acquire()
    }

    toArray(): T[] {
        return this.#data.slice();
    }

    toJSON():string {
        return BinaryHeapElement.fromIndex( this.#data, 0 )?.toJSON() ?? "undefined";
    }

}

export const MinBinaryHeap = BinaryHeap;

export class MaxBinaryHeap<T> extends BinaryHeap<T> {

    constructor();
    constructor( parameters:OrderedCollectionParameters<T> );
    constructor( parameters:OrderedCollectionParameters<T> = {} ) {
        super( { ...parameters, compare: reverseCompare( parameters.compare ?? DefaultFunctions.compare ) } );
    }

    get [Symbol.toStringTag](): string { return "MaxBinaryHeap"; }
}