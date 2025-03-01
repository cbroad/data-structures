import { AbstractHashMap, HashMapBucket } from "@/Abstractions";
import { HybridHashMapBucket } from "@/Implementations/Maps/HashMap/Buckets";

export class HybridHashMap<K, V> extends AbstractHashMap<K, V> {
    get [Symbol.toStringTag](): string { return "HybridHashMap"; }
    createBucket(): HashMapBucket<K, V> { return new HybridHashMapBucket(); }
}