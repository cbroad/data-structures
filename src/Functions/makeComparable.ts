import { stringify } from "./stringify";

export function makeComparable<T>( x:T ):T|string {
    switch( typeof( x ) ) {
        case "object": // Comparisons of Objects and Arrays are in
            return stringify( x );
        default:
            return x;
    }
}