import { Collection } from "./Collection";

export interface BinaryTree<T> extends Collection<T> {
    get depth():number;
    get first():T|undefined;
    get last():T|undefined;

    get(value: T): T | undefined;
    removeAndReturn( value:T ): T | undefined;
    removeFirst(): T | undefined;
    removeLast(): T | undefined;
}
