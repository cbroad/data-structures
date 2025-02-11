import { AbstractHashMap, HashMapBucket } from "../../../Abstractions";
import { HybridHashMapBucket } from "./Buckets";

export class HybridHashMap<K,V> extends AbstractHashMap<K,V> {
    get [Symbol.toStringTag](): string { return "HybridHashMap"; }
    createBucket(): HashMapBucket<K, V> { return new HybridHashMapBucket(); }
}