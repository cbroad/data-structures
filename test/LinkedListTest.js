const DataStructures = require( ".." );
const COUNT = 1000;

// const Deque =  DataStructures.Structures.Deques.ArrayList;
const Deque =  DataStructures.Structures.Deques.LinkedList;

const list = new Deque();
console.log( "list.empty:%j", list.empty );

list.push( 0 );
console.log( list.toArray() );

list.push( 1 );
console.log( list.toArray() );

list.unshift( -1 );
console.log( list.toArray() );

list.insert( -0.5, 1 );
console.log( list.toArray() );

list.insert( 0.5, 3 );
console.log( list.toArray() );

console.log( list.removeFrom( 2 ) );
console.log( list.toArray() );

console.log( list.shift() );
console.log( list.toArray() );

console.log( list.pop() );
console.log( list.toArray() );

console.log( "list.size:%j", list.size );