import { Collection } from "@/Interfaces/Collection";

export interface AsyncCollection<T> extends AsyncIterable<T>, Collection<T> {
    break(): void;
    resetAsync(): void;
}