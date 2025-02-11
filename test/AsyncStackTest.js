const  { Functions, Structures, } = require( "../types" );
const COUNT = 100;

const {
        ArrayList,
        LinkedList,
    } = Structures.AsyncStack;
const {
        BinaryHeap,
        BinarySearchTree,
        MaxBinaryHeap,
        MinBinaryHeap,
        OrderedArrayList,
        RedBlackTree,
    } = Structures.AsyncPriorityQueues;
 const { getType, sleep }  = Functions;

const queue = new ArrayList();
const queues = [
    new ArrayList(),
    new LinkedList(),
    new OrderedArrayList(),
    new RedBlackTree(),
    new BinaryHeap(),
    new MaxBinaryHeap(),
];

const asynchronous = true;

( async function main() {
    const constructors = [
        ...Object.values( Structures.AsyncQueues ),
        ...Object.values( Structures.AsyncPriorityQueues ),
    ].sort( (a,b) => {
        return Object.prototype.toString.call( a ).slice( 8, -1).localeCompare(Object.prototype.toString.call( b ).slice( 8, -1));
    } );
    for( const constructor of constructors ) {
        await testFor( constructor );
    }

} )();

async function testFor( asyncQueue ) {
    const queue = new asyncQueue();
    console.log("Testing for %s", queue[Symbol.toStringTag] );

    let done = false;
    ( async () => {
        await sleep( 100 );
        for( let i=0 ; i<COUNT ; i++ ) {
            let val = 1000 * Math.random() | 0;
            queue.add( val );
            console.log( "add( %j ) %j", val, queue.size );
            if( asynchronous ) {
                await sleep( 50 * Math.random() | 0 );
            }
        }
        console.log( "done adding" );
        done = true;
    } )();


    if( asynchronous ) {
        const interval = setInterval( queue.break.bind(queue), 25*COUNT );
        console.log( "starting" );
        while( done === false || queue.size>0 ) {
            let i=0;
            for await ( const value of queue ) {
                console.log( "rem() [ %j, %j ]", value, queue.size );
                await sleep( ++i * 1.75 * Math.random() | 0 );
                if( done && queue.size===0 ) {
                    queue.break();
                }
            }
            console.log( "queue cleared" );
        }
        console.log( "finishing" );
        clearInterval( interval );
    } else {
        for ( const value of queue ) {
            console.log( "shift", value );
        }
    }

    console.log("Completed for %s", queue[Symbol.toStringTag] );

}

// let done = false;
// ( async () => {
//     await sleep( 100 );
//     for( let i=0 ; i<COUNT ; i++ ) {
//         let val = 1000 * Math.random() | 0;
//         queues.forEach( queue => queue.add( val ) );
//         queue.add( val );
//         console.log( "add( %j ) %j %j", val, queues.map( queue => queue.size ), queue.size );
//         // console.log( "add( %j ) %j", val, queue.size );
//         if( asynchronous ) {
//             // await sleep( 50 );
//             await sleep( 50 * Math.random() | 0 );
//             // await sleep( 500 * Math.random() | 0 );
//         }
//     }
//     console.log( "done adding" );
//     done = true;
// } )();

// ( async () => {
//     if( asynchronous ) {
//         const interval = setInterval( queue.break.bind(queue), 25*COUNT );
//         console.log( "starting" );
//         while( done === false || queue.size>0 ) {
//             for await ( const value of queue ) {
//                 // console.log("size:%d", queue.size );
//                 console.log( "rem() [ %j, %j ] [ %j, %j ]",
//                     await Promise.all( queues.map( queue => queue.pollAsync ? queue.pollAsync() : queue.dequeueAsync() ) ),
//                     queues.map( queue => queue.size ),
//                     value,
//                     queue.size
//                 );
//                 // console.log( "rem() [ %j, %j ]",
//                 //     value,
//                 //     queue.size
//                 // );
//                 await sleep( 75 * Math.random() | 0 );
//                 // await sleep( 500 * Math.random() | 0 );
//                 if( done && queue.size===0 ) {
//                     queue.break();
//                 }
//             }
//             console.log( "queue cleared" );
//         }
//         console.log( "finishing" );
//         clearInterval( interval );
//     } else {
//         for ( const value of queue ) {
//             console.log( "shift", value );
//         }
//     }
// } )();