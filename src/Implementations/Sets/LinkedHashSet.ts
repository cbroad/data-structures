import { AbstractMapBasedSet } from "../../Abstractions";
import { CollectionParameters } from "../../Types";
import { LinkedHashMap } from "../Maps";

export class LinkedHashSet<T> extends AbstractMapBasedSet<T> {

    constructor();
    constructor( params:CollectionParameters<T> );
    constructor( params:CollectionParameters<T> = {} ) {
        super( { ...params, map: new LinkedHashMap<T, undefined>(), } );
    }
    
    get [Symbol.toStringTag](): string { return "LinkedHashSet"; }

}