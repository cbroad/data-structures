import { AbstractHashMap, HashMapBucket } from "../../../Abstractions";
import { LinkedListHashMapBucket } from "./Buckets";

export class LinkedListHashMap<K,V> extends AbstractHashMap<K,V> {
    get [Symbol.toStringTag](): string { return "LinkedListHashMap"; }
    createBucket(): HashMapBucket<K, V> { return new LinkedListHashMapBucket(); }
}