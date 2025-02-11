export function strcmp( str1:string, str2:string ):-1|0|1 {
    for( let i=0 ; i<Math.min( str1.length, str2.length ) ; i++ ) {
        const n = str1.charCodeAt(i) - str2.charCodeAt(i);
        if( n ) return  n && ( ( n>>31 ) || 1 ) as -1|1;
    }
    const n = str1.length - str2.length;
    return  n && ( ( n>>31 ) || 1 ) as -1|0|1;
}