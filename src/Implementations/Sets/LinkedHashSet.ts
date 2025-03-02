import { AbstractMapBasedSet } from "@/Abstractions";
import { LinkedHashMap } from "@/Implementations/Maps";

import type { CollectionParameters } from "@/Types";

export class LinkedHashSet<T> extends AbstractMapBasedSet<T> {

    constructor();
    constructor(params: CollectionParameters<T>);
    constructor(params: CollectionParameters<T> = {}) {
        super({ ...params, map: new LinkedHashMap<T, undefined>(), });
    }

    get [Symbol.toStringTag](): string { return "LinkedHashSet"; }

    emptySet(): LinkedHashSet<T> {
        return new LinkedHashSet<T>();
    }

}