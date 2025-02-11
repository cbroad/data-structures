import * as Util from "util";

import { getType, isObject } from "./types";

export type StringifyOptions = {
    includeFunctions:boolean;
    includeSymbols:boolean;
};


export function stringify( val:any ):string;
export function stringify( val:any, options:StringifyOptions ):string
export function stringify( val:any, options:StringifyOptions = { includeFunctions:false, includeSymbols:false } ):string {
    if( val===undefined ) { return "undefined"; }
    if( val===null ) { return "null"; }
    const arrays:Uint8Array[] = [];
    switch( getType ( val ) ) {
        case "array":
            {
                let result = "[";
                for( let i=0 ; i<val.length ; i++ ) {
                    const e = val[i];
                    if( typeof( e )!=="function" || options.includeFunctions ) {
                        result += stringify( e, options );
                        if( i!==val.length-1 ) {
                            result += ","
                        }
                    }
                }
                result += "]";
                return result;
            }
        case "boolean":
            return val ? "true" : "false";
        case "bigint":
        case "number":
            return Util.format( "%d", val );
        case "Date":
            return Util.format( "%j", val.toISOString() );
        case "symbol":
            const symbolName = val.toString(); 
            const insideParen = symbolName.substring( 7, symbolName.length-1 );
            if( insideParen.startsWith( "Symbol." ) ) {
                return insideParen;
            } else {
                return Util.format( "Symbol(%j)", insideParen );
            }
        case "string":
            return Util.format( "%j", val );
        case "function":
            if( options.includeFunctions===false ) {
                return "undefined";
            }
            return "()=>{}";
        case "object":
        case "Object":
        default:
            {
                let result = "{";
                let keys = [
                    ... Object.getOwnPropertyNames( val ),
                    ... options.includeSymbols ? Object.getOwnPropertySymbols(val) : []
                ];
                for( let i=0 ; i<keys.length ; i++ ) {
                    const key = keys[i];
                    if( typeof( val[key] )!=="function" || options.includeFunctions ) {
                        if( typeof( key )==="symbol" ) { result += "["; }
                        result += stringify( key );
                        if( typeof( key )==="symbol" ) { result += "]"; }
                        result += ":"
                        result += stringify( val[key], options );
                        if( i!==keys.length-1 ) {
                            result += ","
                        }
                    }
                }
                result += "}"
                return result;
            }
    }
}