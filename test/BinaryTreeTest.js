const DataStructures = require( ".." );
const COUNT = 100;

// const BinaryTree =  DataStructures.Structures.Trees.BinarySearchTree;
const BinaryTree =  DataStructures.Structures.Trees.RedBlackTree;

// const tree = new BinaryTree( { allowDupes:true, } );
const tree = new BinaryTree( { allowDupes: true } );

for( let i=0 ; i<COUNT ; i++ ) {
    if( Math.round( Math.random() ) ) {
        let n = Math.floor( Math.random()*COUNT );
        console.log( "adding %j", n );
        tree.add( n );
    } else {
        if( tree.size>0 ) {
            // let arr = tree.toArray();
            // let n = arr[ Math.floor( Math.random()*tree.size ) ];
            // console.log( "removing %j", n );
            // tree.remove( n );
        }
    }

    // console.log( "size:%j", tree.size );
    // console.log( "depth:%j", tree.depth );
    // console.log( "maxDepth:%j", 2 * Math.log2( tree.size+1 ) );

    // console.log( tree.toJSON() );
    // console.log( tree.toArray() );
    // console.log( tree.size );
}


for( const v of tree ) {
    console.log( v );
}

console.log( "%s", tree ); // JSON representation.
console.log( tree.toArray() );
console.log( tree.size );
// console.log( tree.toArray() );

// console.log( tree );
// console.log( "%s", tree );

// let i = 0;
// for( let n of tree ) {
//     console.log( n );
// }

// console.log( "tree.size:%j", tree.size );