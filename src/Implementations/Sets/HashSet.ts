import { CollectionParameters } from "../../Types";
import { AbstractMapBasedSet } from "../../Abstractions";
import { HashMap } from "../Maps";

export class HashSet<T> extends AbstractMapBasedSet<T> {

    constructor();
    constructor( params:CollectionParameters<T> );
    constructor( params:CollectionParameters<T> = {} ) {
        super( { ...params, map: new HashMap<T, undefined>(), } );
    }

    get [Symbol.toStringTag](): string { return "HashSet"; }
}