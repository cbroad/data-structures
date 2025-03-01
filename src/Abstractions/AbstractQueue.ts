import { AbstractCollection } from "@/Abstractions/AbstractCollection";
import { NotImplementedError } from "@/NotImplementedError";

import type { Queue } from "@/Interfaces";

export abstract class AbstractQueue<T> extends AbstractCollection<T> implements Queue<T> {

    get first(): T | undefined { throw new NotImplementedError(); }

    dequeue(): T | undefined { throw new NotImplementedError(); }

    enqueue(value: T): boolean { return this.add(value, true); }

    peek(): T | undefined { return this.first; }

}