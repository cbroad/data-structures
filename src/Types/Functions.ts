export type CallbackFunction<U,V,C> = ( val1:U, val2:V, collection:C ) => any;
export type CompareFunction<T> = ( val1:T, val2:T) => number;
export type ConstructorFunction<T={}> = new (...args:any[])=>T;
export type FilterFunction<T> = ( val:T ) => boolean;
export type TransformFunction<U,V> = ( val:U ) => V;
