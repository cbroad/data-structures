// map;
function run() {
    DataStructures = require( "." );

    // const Map = DataStructures.Structures.Maps.HashMap;
    // const Map = DataStructures.Structures.Maps.HashMaps.ArrayHashMap;
    // const Map = DataStructures.Structures.Maps.HashMaps.HybridHashMap;
    // const Map = DataStructures.Structures.Maps.HashMaps.LinkedListHashMap;
    // const Map = DataStructures.Structures.Maps.HashMaps.TreeHashMap;
    const Map = DataStructures.Structures.Maps.LinkedHashMap;
    // const Map = DataStructures.Structures.Maps.TreeMap;

    COUNT = 1000;
    map = new Map();
    // map = new DataStructures.Maps.HashMaps.LinkedHashMap();
    // map = new DataStructures.Maps.HashMaps.LLHashMap();
    // map = new DataStructures.Maps.HashMaps.RBHashMap();
    // map = new DataStructures.Maps.HashMaps.HybridHashMap();
    console.log( new Date() ); 
    for( let i=0 ; i<COUNT ; i+=2 ) {
        map.set( i, String(i) );
    }
    console.log( new Date() );
    for( let i=0 ; i<COUNT ; i+=2 ) {
        if( (i%4)*(i%6)===0 ) {
            map.delete( i );
        }
    }

    // for( let i=2 ; i<COUNT ; i+=2 ) {
    //     // if( (i%4)*(i%6)===0 ) {
            // map.delete( i );
    //     // }
    // }
    console.log( new Date() ); 
    for( let i=0 ; i<COUNT ; i++ ) {
        // console.log("%d\t%j", i, map.get(i) ); 
    }
    // console.log( new Date() ); 
}

function printBuckets() {
    for( let i=0 ; i<map.data.length ; i++ ) {
        const bucket = map.data[i];
        if( bucket ) {
            console.log( "%d:", i, bucket.bucket );
        }
    }
}
