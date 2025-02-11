const DataStructures = require( ".." );
const COUNT = 1000;

// const List =  DataStructures.Structures.Lists.LinkedList;
const List =  DataStructures.Structures.Lists.ArrayList;

const list = new List();
console.log( "list.empty:%j", list.empty );

for( let i=0 ; i<COUNT ; i++ ) {
    list.add( Math.floor( Math.random()*1000 ) );
}
console.log( list.toArray() );

console.log( list );
console.log( "%s", list );

console.log( "list.size:%j", list.size );