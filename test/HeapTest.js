const DataStructures = require( ".." );
const COUNT = 100;

const BinaryHeap = DataStructures.Structures.BinaryHeaps.BinaryHeap;
// const BinaryHeap = DataStructures.Structures.BinaryHeaps.MaxBinaryHeap;
// const BinaryHeap = DataStructures.Structures.BinaryHeaps.MinBinaryHeap;

const heap = new BinaryHeap();

for( let i=0 ; i<COUNT ; i++ ) {
    if( Math.round( Math.random() ) ) {
        let n = Math.floor( COUNT * Math.random() );
        console.log( "adding %j", n );
        heap.add( n );
    } else {
        if( heap.size>0 ) {
            // let n = heap.toArray()[ Math.floor( heap.size * Math.random() ) ];
            // console.log( "removing %j", n );
            // console.log( heap.remove( n ) );
            console.log( "removing %j", heap.removeFirst() );
        }
    }
    // console.log( "%s", heap );

    // console.log( "size:%j", tree.size );
    // console.log( "depth:%j", tree.depth );
    // console.log( "maxDepth:%j", 2 * Math.log2( tree.length+1 ) );

    // console.log( tree.toJSON() );
    console.log( heap.toArray() );
    // console.log( tree.length );
}


console.log( "%s", heap ); // JSON representation.
console.log( "size:", heap.size );
console.log( heap.toArray() );
// console.log( tree.toArray() );
// {
//     let value;
//     while( value = heap.removeNext() ) {
//         console.log( value );
//     }
// }


// console.log( tree );
// console.log( "%s", tree );

// let i = 0;
// for( let n of tree ) {
//     console.log( n );
// }

// console.log( "tree.size:%j", tree.size );