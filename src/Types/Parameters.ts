import { CompareFunction } from "./Functions";

export type CollectionParameters<T> = {
    fromArray?:T[];
};

export type OrderedCollectionParameters<T> = CollectionParameters<T> & {
    compare?:CompareFunction<T>;
};

export type BinaryTreeParameters<T> = OrderedCollectionParameters<T> & {
    allowDupes?: boolean;
    overWriteDupes?: boolean;
};

export type MapParameters<K,V> = {
    fromArray?:[K,V][]|{key:K,value:V}[];
};

export type OrderedMapParameters<K,V> = MapParameters<K,V> & {
    compare?:CompareFunction<K>;
}; 
