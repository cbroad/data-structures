import { Collection } from "./Collection";

export interface List<T> extends Collection<T> {
    get( idx:number ):T|undefined;
    indexOf( value:T ):number;
    insert( value:T, idx:number ):boolean;
    removeFrom( idx:number ):T|undefined;
}