import { AsyncCollection } from "./AsyncCollection";
import { Stack } from "./Stack";

export interface AsyncStack<T> extends AsyncCollection<T>, Stack<T> {
    popAsync():Promise<T|undefined>;
}