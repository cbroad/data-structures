import type { AsyncCollection } from "@/Interfaces/AsyncCollection";
import type { Stack } from "@/Interfaces/Stack";

export interface AsyncStack<T> extends AsyncCollection<T>, Stack<T> {
    popAsync(): Promise<T | undefined>;
}