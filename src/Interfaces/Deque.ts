import { Queue } from "./Queue";
import { Stack } from "./Stack";

export interface Deque<T> extends Queue<T>, Stack<T> {
    get last():T|undefined;
    get top():T|undefined;

    pop():T|undefined;
    push( value:T ):boolean;
    shift():T|undefined;
    unshift( value:T ):boolean;
}