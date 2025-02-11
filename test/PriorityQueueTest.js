const DataStructures = require("..");
const COUNT = 100;

const {
    LinkedList,
    ArrayList,
} = DataStructures.Structures.Queues;
const {
    BinaryHeap,
    BinarySearchTree,
    MinBinaryHeap,
    MaxBinaryHeap,
    OrderedArrayList,
    RedBlackTree,
} = DataStructures.Structures.PriorityQueues;

const numbers = [];
for (let i = 0; i < COUNT; i++) {
    numbers.push(COUNT * Math.random() | 0);
}

const queue = new MaxBinaryHeap();

let start;
let stop;
start = new Date();
for (let n of numbers) {
    queue.add(n);
    console.log(queue.toArray());
}
stop = new Date();
// console.log( "%j", queue.toArray() );
// queue.clear();
console.log(stop - start);

// const treeQueue = new BinarySearchTree( {allowDupes:false} );
// start = new Date();
// // for( let i=0 ; i<COUNT ; i++ ) {
// for( let n of numbers ) {
//     treeQueue.enqueue( n );
//     console.log( treeQueue.toArray() );
// }
// stop = new Date();
// // console.log( "%j", treeQueue.toArray() );
// // treeQueue.clear();
// console.log( stop - start );
// console.log( treeQueue.depth );




// console.log( queue.toArray() );
// console.log( queue.toArray().filter( n=>n%2===1 ) );
// queue.removeIf( n=>n%2===1 );
// console.log( queue.toArray() );
