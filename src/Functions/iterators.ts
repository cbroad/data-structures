export function *iteratorTransformer<U,V>( iterator:Iterator<U, any, undefined>, transformFunction:((val:U)=>V) ): Iterator<V,any,undefined> {
    let current:IteratorResult<U>;
    while( ( current = iterator.next() ).done===false ) { yield transformFunction( current.value ); }
}

export function makeIterable<T>( iterator:Iterator<T, any, undefined> ):Iterable<T> {
    return { [Symbol.iterator]():Iterator<T,any,undefined> { return iterator; } }
}