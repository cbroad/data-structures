import { Collection } from "./Collection";

export interface Stack<T> extends Collection<T> {
    get top():T|undefined;

    pop():T|undefined;
    push( value:T ):boolean;
}