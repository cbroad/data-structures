const DataStructures = require( ".." );
const COUNT = 100;

const { HashSet, LinkedHashSet, TreeSet } = DataStructures.Structures.Sets;

const hashSet = new HashSet();
const orderedSet = new LinkedHashSet();
const sortedSet = new TreeSet();

// let set = hashSet;
// const set = orderedSet;
let set = sortedSet;

const sets = [
    hashSet,
    orderedSet,
    sortedSet
];

for( let i=0 ; i<COUNT ; i++ ) {
    if( Math.round( Math.random() ) ) {
        // let n = Math.floor( Math.random()*COUNT );
        let n = COUNT-i;
        console.log( "adding %j", n );
        sets.forEach( set => set.add( n ) );
        set.add( n );
    } else {
        if( set.empty===false ) {
            let arr = set.toArray();
            let n = arr[ set.size * Math.random() | 0 ];
            console.log( "removing %j", n );
            sets.forEach( set => set.remove( n ) );
            set.remove( n );
        }
    }

    console.log( "size:%j", set.size );
    console.log( set.toArray() );
}


// console.log( "%s", set ); // JSON representation.
console.log( set.toArray() );
console.log( set.size );

sets.forEach( set => console.log( "Size:%d", set.size ) || console.log( set.toArray() ) );