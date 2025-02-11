import { CallbackFunction, FilterFunction } from "../Types";
export interface Collection<T> extends Iterable<T> {
    get empty():boolean;
    get size():number;

    add( value:T ):this;                                                          // JS Set/Map
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    addAll( values:Iterable<T> ):boolean;
    clear():void;                                                                 // JS Set/Map
    contains( value:T ):boolean;
    containsAll( values:Iterable<T> ):boolean;
    delete( value:T ):boolean;                                                    // JS Set/Map
    equals( other:Collection<T> ):boolean;
    forEach( callbackfn:CallbackFunction<T,T,Collection<T>>, thisArg?:any ):void; // JS Set/Map
    entries():Iterator<[T,T]>;                                                    // JS Set/Map
    has( value:T ):boolean;                                                       // JS Set/Map
    keys():Iterator<T>;                                                           // JS Set/Map
    remove( value:T ):boolean;
    removeAll( values:Iterable<T> ):boolean;
    removeIf( searchFunction:FilterFunction<T> ):boolean;
    retainAll( values:Iterable<T> ):boolean;
    toArray():T[];
    toJSON():string;
    toString():string;
    values():Iterator<T>;                                                         // JS Set/Map
}
