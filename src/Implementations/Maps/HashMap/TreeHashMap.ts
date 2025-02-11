import { AbstractHashMap, HashMapBucket } from "../../../Abstractions";
import { RBTreeHashMapBucket } from "./Buckets";

export class TreeHashMap<K,V> extends AbstractHashMap<K,V> {
    get [Symbol.toStringTag](): string { return "TreeHashMap"; }
    createBucket(): HashMapBucket<K, V> { return new RBTreeHashMapBucket(); }
}