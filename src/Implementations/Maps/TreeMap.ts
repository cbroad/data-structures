import { AbstractMap, MapEntry } from "../../Abstractions";
import { OrderedMapParameters } from "../../Types/Parameters";
import { RedBlackTree, RedBlackTreeNode } from "../BinaryTrees";

export class TreeMap<K,V> extends AbstractMap<K,V>{

    #tree = new RedBlackTree<MapEntry<K,V>>();

    constructor();
    constructor( params:OrderedMapParameters<K,V> );
    constructor( params:OrderedMapParameters<K,V> = {} ) {
        super();
        this.#tree = new RedBlackTree<MapEntry<K,V>>({ ...params,
            allowDupes: false,
            overWriteDupes: true,
            compare : ( entry1:MapEntry<K,V>, entry2:MapEntry<K,V> ) => ( params.compare ?? ( (u:K,v:K)=>u<v?-1:u>v?1:0 ) )( entry1.key, entry2.key ),
            fromArray: params.fromArray && MapEntry.convertPairsArray( params.fromArray ),
        } );
    }

    get [Symbol.toStringTag](): string { return "TreeMap"; }

    get entriesArray(): MapEntry<K, V>[] { return this.#tree.toArray(); }

    deleteAndReturn(key: K): V | undefined {
        let node = this.#tree.getNode( MapEntry.query( key ) ) as RedBlackTreeNode<MapEntry<K,V>>|undefined;
        if( node===undefined ) { return undefined; }
        let result = node.value!.value;
        this.#tree.removeNode( node );
        return result;
    }

    protected *entriesIterator(): Iterator<MapEntry<K, V>> {
        yield* this.#tree;
    }
    

    get( key:K ): V | undefined {
        let node = this.#tree.getNode( MapEntry.query( key ) ) as RedBlackTreeNode<MapEntry<K,V>>|undefined;
        return node?.value!.value as V|undefined;
    }

    has( key:K ): boolean {
        return this.#tree.contains( MapEntry.query( key ) );
    }

    protected createEntry(key: K, value: V): MapEntry<K, V> {
        return new MapEntry( key, value );
    }

    protected setByEntry(newEntry: MapEntry<K, V>): boolean {
        return this.#tree.add( newEntry, true );
    }

}