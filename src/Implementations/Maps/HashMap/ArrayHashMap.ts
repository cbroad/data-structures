import { AbstractHashMap, HashMapBucket } from "@/Abstractions";
import { ArrayHashMapBucket } from "@/Implementations/Maps/HashMap/Buckets";

export class ArrayHashMap<K, V> extends AbstractHashMap<K, V> {
    get [Symbol.toStringTag](): string { return "ArrayHashMap"; }
    createBucket(): HashMapBucket<K, V> { return new ArrayHashMapBucket(); }
}