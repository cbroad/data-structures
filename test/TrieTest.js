const FS = require( "fs" );
const { Trie } = require( "../js/Playground/Trie");

const DICTIONARY_PATH = "/usr/share/dict/words";

( async function main() {
    const dict = await generateTrie();
    console.log( dict.toArray() );
    const testStrings = [ "Abel", "Abeli", "Abelia", "Abelian", "Abeliano" ];
    for( const str of testStrings ) {
        console.log( "dict.isPrefix(%j) => %j", str, dict.isPrefix( str ) );
        console.log( "dict.isisWord(%j) => %j", str, dict.isWord( str ) );
    }
    console.log( "dict.startsWith(%j) => %j", testStrings[0], dict.startsWith( testStrings[0] ) );

    console.log( "dict.startsWith(%j) => ", "", dict.startsWith( "" ) )
    await new Promise( resolve => setTimeout( resolve, 30000 ) );
} )();

async function generateTrie() {
    let lines = await readLines();
    const dict = new Trie();
    lines.reverse().forEach( dict.add.bind(dict) );
    return dict;
}

async function readLines() {
    const fileContents = await FS.promises.readFile( DICTIONARY_PATH );
    return String(fileContents).split(/[\r\n]/).filter( s => s!=="" );
}


