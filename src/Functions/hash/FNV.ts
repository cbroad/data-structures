import { stringToUint8Array } from "../stringToUint8Array";
import { stringify } from "../stringify";

export function FNV0Hash( value:any ):number {
    const bytes = stringToUint8Array( typeof( value )==="string" ? value : stringify( value ) );
    let hash = 0x00000000;
    for( const byte of bytes ) {
        // hash *= 0x01000193;
        // hash *= 0b1000000000000000110010011
        hash += (hash<<1) + (hash<<4) + (hash<<7) + (hash<<8) + (hash<<24);
        hash ^= byte;
    }
    return hash>>>0;
}
export function FNV1Hash( value:any ):number {
    const bytes = stringToUint8Array( typeof( value )==="string" ? value : stringify( value ) );
    let hash = 0x811c9dc5;
    for( const byte of bytes ) {
        // hash *= 0x01000193;
        // hash *= 0b1000000000000000110010011
        hash += (hash<<1) + (hash<<4) + (hash<<7) + (hash<<8) + (hash<<24);
        hash ^= byte;
    }
    return hash>>>0;
}

export function FNV1aHash( value:any ):number {
    const bytes = stringToUint8Array( typeof( value )==="string" ? value : stringify( value ) );
    let hash = 0x811c9dc5;
    for( const byte of bytes ) {
        hash ^= byte;
        // hash *= 0x01000193;
        // hash *= 0b1000000000000000110010011
        hash += (hash<<1) + (hash<<4) + (hash<<7) + (hash<<8) + (hash<<24);
    }
    return hash>>>0;
}