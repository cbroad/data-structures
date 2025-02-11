import { AbstractCollection } from ".";
import { MyMap, MySet } from "../Interfaces";
import { CollectionParameters, OrderedCollectionParameters } from "../Types";

export type MapBasedSetParameters<T> = CollectionParameters<T> & { map:MyMap<T,undefined> };
export type OrderedMapBasedSetParameters<T> = OrderedCollectionParameters<T> & { map:MyMap<T,undefined> }

export abstract class AbstractMapBasedSet<T> extends AbstractCollection<T> implements MySet<T> {
    
    #map:MyMap<T,undefined>;
    
    constructor( params:MapBasedSetParameters<T> ) {
        super( params );
        this.#map = params.map;
    }

    get size():number { return this.#map.size; }


    [Symbol.iterator](): Iterator<T> {
        return this.#map.keys();
    }

    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):this|boolean {
        const result = this.#map.has( value ) || !!this.#map.set( value, undefined );
        if( confirm ) { return result; }
        else { return this; }
    }

    clear():void {
        this.#map.clear();
    }

    contains(value: T): boolean {
        return this.#map.has( value );
    }

    remove(value: T): boolean {
        return this.#map.delete( value );
    }

}