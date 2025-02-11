import { stringToUint8Array } from "../stringToUint8Array";
import { stringify } from "../stringify";

export function JenkinsOneAtATimeHash( value:any ):number {
    const bytes = stringToUint8Array( typeof( value )==="string" ? value : stringify( value ) );
    let hash = 0;
    for( let i=0 ; i<bytes.length ; i++ ) {
        const byte = bytes[i];
        hash += byte;
        hash += hash << 10;
        hash ^= hash >>> 6;
    }
    hash += hash << 3;
    hash ^= hash >>> 11;
    hash += hash << 15;
    return hash>>>0;
}