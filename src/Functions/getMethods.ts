export function getMethods( obj:any ):string[] {
    const props = new Set<string>();
    let proto:object = obj;
    do {
        Object.getOwnPropertyNames( proto ).forEach( label => ( typeof obj[label] )==="function" && props.add( label ) );
    } while( proto = Object.getPrototypeOf( proto ) );
    return [ ... props ];
}