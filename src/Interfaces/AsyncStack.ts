import { AsyncCollection } from "@/Interfaces/AsyncCollection";
import { Stack } from "@/Interfaces/Stack";

export interface AsyncStack<T> extends AsyncCollection<T>, Stack<T> {
    popAsync(): Promise<T | undefined>;
}