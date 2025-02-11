export function stringToUint8Array( str:string ):Uint8Array {
    const arr:number[] = [];
    for( let i=0 ; i<str.length ; i++ ) {
        const sub:number[] = [];
        for( let n=str.codePointAt( i )! ; n>0 ; n=n>>>8 ) {
            sub.unshift( n & 0xff );
        }
        sub.forEach( n => arr.push( n ) );
    }
    return new Uint8Array( arr );
}
