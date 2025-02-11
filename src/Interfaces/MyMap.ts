import { CallbackFunction, } from "../Types";

export interface MyMap<K,V> extends Iterable<[K,V]> {
    
    get empty():boolean;
    get size():number;

    clear():void;
    delete( key:K ):boolean;
    deleteAndReturn( key:K ):V|undefined;
    entries(): Iterator<[K,V]>;
    forEach( callbackfn:CallbackFunction<V,K,MyMap<K,V>>, thisArg?:any ):void;
    get( key:K ):V|undefined;
    has( key:K ):boolean;
    keys(): Iterator<K>;
    set( key:K, value:V ): MyMap<K, V>;
    setAndConfirm( key:K, value:V ):boolean;
    values(): Iterator<V>;

};