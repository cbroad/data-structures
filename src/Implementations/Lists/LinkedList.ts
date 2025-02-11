import { Mutex } from "semasync";
import { AbstractDeque } from "../../Abstractions";
import { AsyncQueue, AsyncStack, List } from "../../Interfaces";
import { CollectionParameters } from "../../Types/Parameters";

class LinkedListNode<T> {
    value:T;
    next:LinkedListNode<T>|undefined;
    prev:LinkedListNode<T>|undefined;

    constructor( value:T ) {
        this.value = value;
    }

    toJSON():string {
        return `{ "value":${JSON.stringify(this.value)}, "next":${ this.next ? this.next.toJSON() : "undefined" } }`;
    }

    toString():string {
        return this.toJSON();
    }

}

export class LinkedList<T> extends AbstractDeque<T> implements  AsyncQueue<T>, AsyncStack<T>, List<T> {
    
    #head:LinkedListNode<T>|undefined = undefined;
    #tail:LinkedListNode<T>|undefined = undefined;
    #size:number = 0;
    
    protected _abortController:AbortController = new AbortController();
    protected _data:T[] = [];
    protected _mutex:Mutex = new Mutex();

    constructor();
    constructor( params:CollectionParameters<T> );
    constructor( params:CollectionParameters<T> = {} ) {
        super( params );
        this.resetAsync();
    }

    get [Symbol.toStringTag](): string { return "LinkedList"; }
    get last(): T | undefined { return this.#tail?.value; }
    get first(): T | undefined { return this.#head?.value; }
    get size():number { return this.#size; }

    protected get _tail():LinkedListNode<T>|undefined { return this.#tail; }
    
    async *[Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
        let cleared:boolean = false;
        const onAbort = () => cleared=true;
        this._abortController.signal.addEventListener( "abort", onAbort );
        let value:T|undefined;
        while( cleared===false && ( value = await this.dequeueAsync() )!==undefined ) { yield value; }
        this._abortController.signal.removeEventListener( "abort", onAbort );
    }

    *[Symbol.iterator]():Iterator<T, any, undefined> {
        let node = this.#head;
        while( node ) {
            yield node.value;
            node = node.next;
        }
    }
    
    
    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):boolean|this {
        const created = new LinkedListNode( value );
        created.prev = this.#tail;
        if( this.#tail === undefined ) { this.#head = created; }
        else { this.#tail.next = created; }
        this.#tail = created;
        this.#size++;
        const result = true;
        if( result===true && this._mutex.available===0 ) { this._mutex.release(); }
        return confirm ? result : this;
    }

    break():void {
        this._abortController.abort();
    }

    clear(): void {
        this.#head = undefined;
        this.#tail = undefined; 
        this.#size = 0;
        this.break();      
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

    contains(value: T): boolean {
        return this.indexOf( value )>=0;
    }

    get( idx:number ): T|undefined {
        let node = this.#head;
        for( let i=0 ; i<idx && i<this.size ; i++, node = node?.next );
        return node?.value;
    }

    indexOf(value: T): number {
        let node = this.#head;
        for( let i=0 ; node!==undefined ; i++ ) {
            if( node.value===value ) {
                return i;
            }
            node = node.next;
        }
        return -1;
    }

    insert( value:T, idx:number ):boolean {
        if( idx > this.size) { return false; }

        let next: LinkedListNode<T>|undefined;
        let prev: LinkedListNode<T>|undefined;

        if( idx <= this.size/2 ) { // Find insert location from head
            next = this.#head;
            for( let i = 0 ; i<idx ; i++ ) { next = next!.next; }
            prev = next?.prev;
        } else { // Find insert location from tail
            prev = this.#tail ;
            for( let i=this.size ; i>idx ; i-- ) { prev = prev!.prev; }
            next = prev?.next;
        }

        const created = new LinkedListNode( value );
        created.next = next;
        created.prev = prev;
        if( next ) { next.prev = created; }
        else { this.#tail = created; }
        if( prev ) { prev.next = created; }
        else { this.#head = created; }
        this.#size++;
        const result = true;
        if( result===true && this._mutex.waiting ) { this._mutex.release(); }
        return result;
    }

    pop(): T | undefined {
        // return this.removeFrom( this.size-1 );
        if( this.size===0 ) { return undefined; }
        const node = this.#tail!;
        this.#tail = node.prev
        if( this.#tail ) { this.#tail.next = undefined; }
        else { this.#head = undefined; }
        this.#size--;
        return node.value;
    }

    async popAsync():Promise<T|undefined> {
        try {
            while( this.empty ) { await this._mutex.acquire( { signal:this._abortController.signal } ); }
            return this.pop();
        } catch( e ) {
            return undefined;
        }
    }

    remove( value:T ): boolean {
        for(let node = this.#head ; node!==undefined  ; node = node.next ) {
            if( node.value === value ) {
                if( node.prev ) { node.prev.next = node.next; }
                else { this.#head = node.next; }
                if( node.next ) { node.next.prev = node.prev; }
                else { this.#tail = node.prev; }
                this.#size--;
                return true;
            }
        }
        return false;
    }
    
    removeFrom(idx: number): T|undefined {
        if( idx<0 || idx >= this.size ) { return undefined; }

        let node: LinkedListNode<T>;

        if( idx <= this.size/2 ) { // Find insert location from head
            node=this.#head!
            for( let i = 0 ; i<idx ; i++ ) { node = node.next!; }
        } else { // Find insert location from tail
            node=this.#tail!
            for( let i=this.size-1 ; i>idx ; i-- ) { node = node.prev!; }
        }

        if( node.prev ) { node.prev.next = node.next; }
        else { this.#head = node.next; }
        if( node.next ) { node.next.prev = node.prev; }
        else { this.#tail = node.prev; }

        this.#size--;
        return node?.value;
    }

    resetAsync():void {
        if( this._abortController.signal.aborted ) { this._abortController = new AbortController(); }
        this._abortController.signal.addEventListener( "abort", this.resetAsync.bind(this) );
        while( this._mutex.waiting ) { this._mutex.release(); }
        this._mutex.acquire()
    }

    shift(): T | undefined {
        // return this.removeFrom( 0 );
        if( this.size===0 ) { return undefined; }
        const node = this.#head!;
        this.#head = node.next
        if( this.#head ) { this.#head.prev = undefined; }
        else { this.#tail = undefined; }
        this.#size--;
        return node.value;
    }

    toJSON():string {
        return this.#head ? this.#head.toJSON() : "undefined";
    }

    unshift(value: T): boolean {
        // return this.insert( value, 0 );
        const created = new LinkedListNode( value );
        created.next = this.#head;
        if( this.#head === undefined ) { this.#tail = created; }
        else { this.#head.prev = created; }
        this.#head = created;
        this.#size++;
        const result = true;
        if( result===true && this._mutex.waiting ) { this._mutex.release(); }
        return result;
    }
    
}