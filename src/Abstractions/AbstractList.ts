import { AbstractCollection } from "@/Abstractions/AbstractCollection";
import { NotImplementedError } from "@/NotImplementedError";

import type { Collection, List } from "@/Interfaces";
import { CallbackFunction } from "@/Types";

export abstract class AbstractList<T> extends AbstractCollection<T> implements List<T> {

    contains(value: T): boolean {
        return this.has(value);
    }

    forEach(callbackfn: CallbackFunction<T, number, List<T>>, thisArg?: any): void {
        for (let i = 0; i < this.size; i++) {
            callbackfn.call(thisArg, this.get(i)!, i, this,);
        }
    }

    get(idx: Number): T | undefined {
        throw new NotImplementedError();
    }

    indexOf(value: T): number {
        throw new NotImplementedError();
    }

    insert(value: T, idx: number): boolean {
        throw new NotImplementedError();
    }

    remove(value: T): boolean {
        let idx = this.indexOf(value);
        if (idx >= 0) {
            this.removeFrom(idx);
            return true;
        }
        return false
    }

    removeFrom(idx: number): T | undefined {
        throw new NotImplementedError();
    }

}