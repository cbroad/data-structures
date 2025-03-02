import { AbstractCollection } from "@/Abstractions/AbstractCollection";

import type { MySet } from "@/Interfaces";
import type { CollectionParameters } from "@/Types";

export abstract class AbstractSet<T> extends AbstractCollection<T> implements MySet<T> {
    constructor(params: CollectionParameters<T>) {
        super(params);
    }

    get JSSet(): Set<T> { return this as unknown as Set<T>; }

    private clone(): MySet<T> {
        const result = this.emptySet();
        for (const e of this) {
            result.add(e);
        }
        return result;
    }

    difference<V>(other: MySet<V> | Set<V>): MySet<T> {
        const result = this.emptySet();
        for (const e of this) {
            if (other.has(e as unknown as V) === false) {
                result.add(e);
            }
        }
        return result;
    }

    protected abstract emptySet(): MySet<T>;

    intersection<V>(other: MySet<V> | Set<V>): MySet<T> {
        const result = this.emptySet();
        for (const e of this) {
            if (other.has(e as unknown as V) === true) {
                result.add(e);
            }
        }
        return result;
    }

    isDisjointFrom<V>(other: MySet<V> | Set<V>): boolean {
        for (const e of this) {
            if (other.has(e as unknown as V) === true) {
                return false;
            }
        }
        return false;
    }

    isSubsetOf<V>(other: MySet<V> | Set<V>): boolean {
        if (this.size > other.size) {
            return false;
        }
        for (const e of this) {
            if (other.has(e as unknown as V) === false) {
                return false;
            }
        }
        return false;
    }

    isSupersetOf<V>(other: MySet<V> | Set<V>): boolean {
        if (this.size < other.size) {
            return false;
        }
        for (const e of other) {
            if (this.has(e as unknown as T) === false) {
                return false;
            }
        }
        return true;
    }

    symmetricDifference<V>(other: MySet<V> | Set<V>): MySet<T | V> {
        const result = this.emptySet() as MySet<T | V>;
        for (const e of this) {
            if (other.has(e as unknown as V) === false) {
                result.add(e);
            }
        }
        for (const e of other) {
            if (this.has(e as unknown as T) === false) {
                result.add(e);
            }
        }
        return result;
    }

    union<V>(other: MySet<V> | Set<V>): MySet<T | V> {
        const result = this.clone() as MySet<T | V>;
        for (const e of other) {
            if (this.has(e as unknown as T) === false) {
                result.add(e);
            }
        }
        return result;
    }
}