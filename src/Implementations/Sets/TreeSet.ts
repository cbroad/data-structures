import { AbstractCollection } from "../../Abstractions";
import { CallbackFunction, OrderedCollectionParameters } from "../../Types";
import { iteratorTransformer } from "../../Functions";
import { BinaryTree, MySet } from "../../Interfaces";
import { RedBlackTree } from "../BinaryTrees";

export class TreeSet<T> extends AbstractCollection<T> implements MySet<T> {
    #tree:BinaryTree<T>;

    constructor();
    constructor( params:OrderedCollectionParameters<T> );
    constructor( params:OrderedCollectionParameters<T> = {} ) {
        super( params );
        this.#tree = new RedBlackTree( { ...params, allowDupes: false, overWriteDupes:false } );
    }

    get [Symbol.toStringTag](): string { return "TreeSet"; }

    get size():number { return this.#tree.size };

    [Symbol.iterator](): Iterator<T,any,undefined> {
        return this.values();
    }

    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):this|boolean  {
        const result = this.#tree.add( value, confirm );
        return confirm ? result as boolean : this;
    }

    clear(): void {
        return this.#tree.clear();
    }

    remove(value: T): boolean {
        return this.#tree.remove( value );
    }

    forEach(callbackfn: CallbackFunction<T,T,TreeSet<T>>, thisArg?: any): void {
        for( const value of  this.#tree ) {
            callbackfn.call( thisArg, value, value, this );
        }
    }

    has(value: T): boolean {
        return this.#tree.contains( value );
    }

    entries(): Iterator<[T, T], any, undefined> {
        return iteratorTransformer( this.#tree[Symbol.iterator](), ((val:T)=>([val,val])) );
    }

    *keys(): Iterator<T, any, undefined> { yield* this.#tree; }

    *values(): Iterator<T, any, undefined> { yield* this.#tree; }
}