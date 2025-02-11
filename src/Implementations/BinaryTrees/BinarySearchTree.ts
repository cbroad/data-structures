import { Mutex } from "semasync";
import { AbstractOrderedCollection } from "../../Abstractions";
import { AsyncPriorityQueue, BinaryTree, PriorityQueue, Queue } from "../../Interfaces";
import { BinaryTreeParameters } from "../../Types";
import { BinaryTreeNode } from "./BinaryTreeNode";

export class BinarySearchTree<T> extends AbstractOrderedCollection<T> implements AsyncPriorityQueue<T>, BinaryTree<T>, PriorityQueue<T> /*, Queue<T>*/ {

    protected allowDupes:boolean = true;
    protected overWriteDupes:boolean = false;

    _abortController:AbortController = new AbortController();
    _mutex:Mutex = new Mutex();
    protected _size:number = 0;

    protected root:BinaryTreeNode<T|undefined>;

    get [Symbol.toStringTag](): string { return "BinarySearchTree"; }

    get depth():number { return this.root.depth; }

    get empty():boolean { return this.root.value===undefined; }

    get first():T|undefined { return this.root.getLeftMostChild().value; }

    get last():T|undefined { return this.root.getRightMostChild().value; }

    get size():number { return this._size; }

    constructor();
    constructor( parameters:BinaryTreeParameters<T> );
    constructor( parameters:BinaryTreeParameters<T> = {} ) {
        super( { ...parameters, fromArray:undefined } );
        this.resetAsync();
        this.root = this.createNode();
        this.allowDupes = !!( parameters.allowDupes ?? true );
        this.overWriteDupes = !!( parameters.overWriteDupes ?? false );
        parameters.fromArray?.forEach( this.add.bind(this) );
    }

    async *[Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
        let cleared:boolean = false;
        const onAbort = () => cleared=true;
        this._abortController.signal.addEventListener( "abort", onAbort );
        let value:T|undefined;
        while( cleared===false && ( value = await this.pollAsync() )!==undefined ) { yield value; }
        this._abortController.signal.removeEventListener( "abort", onAbort );
    }

    *[ Symbol.iterator ]() : Iterator<T,any, undefined> {
        yield* this.root as BinaryTreeNode<T>;
    }

    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):this|boolean  {
        const node = this.addNode( value );
        if( node ) {
            this._size++;
        }
        const result = node!==undefined;
        if( result===true && this._mutex.waiting ) { this._mutex.release(); }
        return confirm ? result : this;
    }

    protected addNode( value:T ) : BinaryTreeNode<T>|undefined {
        let node = this.root;
        while( node.value!==undefined ) {
            const comparison = this.compare( value, node.value );
            node = comparison<0 ? node.left! : node.right!;
            if( this.allowDupes===false && comparison===0 ) {
                if( this.overWriteDupes ) {
                    node.value = value;
                }
                return undefined;
            }
        }
        node.value = value;
        return node as BinaryTreeNode<T>;
    }

    break():void {
        this._abortController.abort();
    }

    clear(): void {
        this.root = this.createNode();
        this._size = 0;
        this.break();
    }

    has( value:T ):boolean {
        let node = this.root;
        while( node.value !== undefined ) {
            const comp = this.compare( value, node.value );
            if( comp < 0 ) node = node.left!;
            else if( comp > 0 ) node = node.right!;
            else return true;
        }
        return false;
    }

    protected createNode() : BinaryTreeNode<undefined>;
    protected createNode( value:T ) : BinaryTreeNode<T>;
    protected createNode( value?:T ) : BinaryTreeNode<T|undefined> {
        return new BinaryTreeNode( value );
    }

    get( value:T ):T|undefined {
        return this.getNode( value )?.value;
    }

    getNode( value:T ) : BinaryTreeNode<T>|undefined {
        let node = this.root;
        let comp = 1;
        while( node.value!==undefined && comp ) {
            if( comp = this.compare( value, node.value ) ) {
                node = comp<0 ? node.left! : node.right!;
            }
        }
        if( node.value===undefined ) { return undefined; }
        return node as BinaryTreeNode<T>;
    }

    poll(): T | undefined { return this.removeFirst(); }
    
    async pollAsync():Promise<T|undefined> {
        try {
            while( this.empty ) { await this._mutex.acquire( { signal:this._abortController.signal } ); }
            return this.poll();
        } catch( e ) {
            console.log( e );
            return undefined;
        }
    }

    remove( value:T ):boolean {
        const node = this.getNode( value );
        let exists = node!==undefined;
        if( exists ) {
            this.removeNodeReturnValue( node! );
        }
        return exists;
    }

    removeAndReturn( value:T ):T|undefined {
        const node = this.getNode( value );
        if( node===undefined ) { return undefined; }
        return this.removeNodeReturnValue( node! );
    }

    removeFirst():T|undefined {
        return this.removeNodeReturnValue( this.root.getLeftMostChild() );
    }

    removeLast():T|undefined {
        return this.removeNodeReturnValue( this.root.getRightMostChild() );
    }


    removeNode( node:BinaryTreeNode<T> ) : boolean {
        if( node === undefined ) {
            return false;
        }
        if( node.left!.value!==undefined && node.right!.value!==undefined ) { // Has both left and right values
            const replacement = node.right?.getLeftMostChild() as BinaryTreeNode<T>;
            node.value = replacement.value;
            replacement.value = undefined;
        } else if( node.left!.value!==undefined ) { // only has left values
            let temp = node.left!;
            node.value = temp.value
            node.left = temp.left;
            node.right = temp.right;
        } else if( node.right!.value!==undefined ) { // only has right values
            let temp = node.right!;
            node.value = temp.value
            node.left = temp.left;
            node.right = temp.right;
        } else {
            node.value = undefined;
        }
        return true;
    }

    protected removeNodeReturnValue( node:BinaryTreeNode<T|undefined> ):T|undefined {
        let value = node.value;
        if( value !== undefined ) {
            this.removeNode( node as BinaryTreeNode<T> );
            this._size--;
        }
        return value;
    }

    resetAsync():void {
        if( this._abortController.signal.aborted ) { this._abortController = new AbortController(); }
        this._abortController.signal.addEventListener( "abort", this.resetAsync.bind(this) );
        while( this._mutex.waiting ) { this._mutex.release(); }
        this._mutex.acquire()
    }

    toJSON():string {
        return this.root.toJSON();
    }

}