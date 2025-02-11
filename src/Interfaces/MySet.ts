import { CallbackFunction } from "../Types";

export interface MySet<T> {
    get size():number;

    [Symbol.iterator]():Iterator<T,any,undefined>;

    add( value:T ):this;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:true ):boolean;
    clear():void;
    delete( value:T ):boolean;
    entries():Iterator<[T,T],any,undefined>;
    forEach( callbackfn:CallbackFunction<T,T,MySet<T>>, thisArg?:any ):void;
    has( value:T ):boolean;
    keys():Iterator<T,any,undefined>;
    values():Iterator<T,any,undefined>;

    // difference<V>( other:MySet<V> ):MySet<T>;
    // intersection<V>( other:MySet<V> ):MySet<T|V>;
    // symmetricDifference<V>( other:MySet<V> ):MySet<T|V>;
    // symmetricDifference<V>( other:MySet<V> ):MySet<T|V>;

    // isDisjointFrom<V>( other:MySet<V> ):boolean;
    // isSubsetOf<V>( other:MySet<V> ):boolean;
    // isSupersetOf<V>( other:MySet<V> ):boolean;

}