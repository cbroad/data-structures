import { compare as DefaultCompare } from "@/Functions/defaults";
import type { CompareFunction } from "@/Types";

export function reverseCompare<T>(): CompareFunction<T>;
export function reverseCompare<T>(compare: CompareFunction<T>): CompareFunction<T>;
export function reverseCompare<T>(compare: CompareFunction<T> = DefaultCompare<T>): CompareFunction<T> { return (u: T, v: T): number => -compare(u, v); }