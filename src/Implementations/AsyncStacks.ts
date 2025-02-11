import { LinkedList } from "./Lists";
import { ArrayList } from "./Lists/ArrayList";

export class ArrayListAsyncStack<T> extends ArrayList<T> {
    
    get [Symbol.toStringTag](): string { return "ArrayListAsyncStack"; }

    async *[Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
        let cleared:boolean = false;
        const onAbort = () => cleared=true;
        this._abortController.signal.addEventListener( "abort", onAbort );
        let value:T|undefined;
        while( cleared===false && ( value = await this.popAsync() )!==undefined ) { yield value; }
        this._abortController.signal.removeEventListener( "abort", onAbort );
    }

    *[Symbol.iterator]():Iterator<T, any, undefined> {
        yield* this._data.reverse();
    }

}


export class LinkedListAsyncStack<T> extends LinkedList<T> {
    
    get [Symbol.toStringTag](): string { return "LinkedListAsyncStack"; }

    async *[Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
        let cleared:boolean = false;
        const onAbort = () => cleared=true;
        this._abortController.signal.addEventListener( "abort", onAbort );
        let value:T|undefined;
        while( cleared===false && ( value = await this.popAsync() )!==undefined ) { yield value; }
        this._abortController.signal.removeEventListener( "abort", onAbort );
    }

    *[Symbol.iterator]():Iterator<T, any, undefined> {
        let node = this._tail;
        while( node ) {
            yield node.value;
            node = node.prev;
        }
    }

}