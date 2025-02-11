import { makeComparable } from "../makeComparable";

export function compare<T>( u:T, v:T ):-1|0|1 { return simpleCompare( makeComparable( u ), makeComparable( v ) ); };
export function simpleCompare<T>( u:T, v:T ):-1|0|1 { return ( -(u<v) || +(u>v) ) as -1|0|1; };