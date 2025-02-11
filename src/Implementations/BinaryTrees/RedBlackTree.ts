import { BinaryTreeParameters } from "../../Types/Parameters";
import { ParentLinkedBinarySearchTree, ParentLinkedBinaryTreeNode } from "./ParentLinkedBinarySearchTree";

type Color = boolean;
const Color = { Black:false, Red: true, };

const REPLACE_WITH_NEXT_LARGEST:boolean = true;


// type RotateFunction<T> = (node:ParentLinkedBinaryTreeNode<T>)=>void;

export class RedBlackTreeNode<T> extends ParentLinkedBinaryTreeNode<T> {

    color:boolean = Color.Black;

    constructor();
    constructor( value:T );
    constructor( value?:T ) {
        super( value! );
        this.color = Color.Black;
    }

    get left(): RedBlackTreeNode<T|undefined> { return super.left as RedBlackTreeNode<T|undefined>; }
    set left( node:RedBlackTreeNode<T|undefined> ) { super.left = node; }

    get grandparent():RedBlackTreeNode<T>|undefined { return this.parent?.parent as RedBlackTreeNode<T>|undefined; }

    get parent():RedBlackTreeNode<T>|undefined { return super.parent as RedBlackTreeNode<T>|undefined; }
    set parent( node:RedBlackTreeNode<T>|undefined ) { super.parent = node; }

    get right(): RedBlackTreeNode<T|undefined> { return super.right as RedBlackTreeNode<T|undefined>; }
    set right( node:RedBlackTreeNode<T|undefined> ) { super.right = node; }

    get sibling():RedBlackTreeNode<T|undefined>|undefined { return super.sibling as RedBlackTreeNode<T|undefined>|undefined; }

    get uncle():RedBlackTreeNode<T|undefined>|undefined { return super.uncle as RedBlackTreeNode<T|undefined>|undefined; }

    get value():T|undefined { return super.value; }
    set value( value:T|undefined ) {
        super.value = value;
        this.color = value!==undefined;
    }

    toJSON():string {
        if( this.value===undefined ) { return "undefined"; }
        return `{ "value": ${JSON.stringify(this.value)}, "color":${this.color?'"Red"':'"Black"'}, "left": ${this.left!.toJSON()}, "right": ${this.right!.toJSON()} }`;
    }
}

export class RedBlackTree<T> extends ParentLinkedBinarySearchTree<T> {

    constructor();
    constructor( parameters:BinaryTreeParameters<T> );
    constructor( parameters:BinaryTreeParameters<T> = {} ) {
        super( { ...parameters, fromArray:undefined } );
        parameters.fromArray?.forEach( this.add.bind(this) )
    }

    get [Symbol.toStringTag](): string { return "RedBlackTree"; }

    protected addNode( value:T ) : RedBlackTreeNode<T> {
        const node = super.addNode( value ) as RedBlackTreeNode<T>
        if( node ) {
            // REBALANCE
            this.#fixDoubleRed( node );
            ( this.root as RedBlackTreeNode<T> ).color = Color.Black;
        }
        return node;
    }

    removeNode( node:RedBlackTreeNode<T>):boolean {
        while( true ) {
            let originalColor = node.color;
            const parent = node.parent;
            if( node.left.value===undefined && node.right.value===undefined ) {
                if( node.color===Color.Black ) {
                    this.#fixDoubleBlack( node );
                }
                node.value = undefined;
                break;
            } else if( node.left.value===undefined || node.right.value===undefined ) {
                let childNode = ( node.left.value!==undefined ? node.left : node.right ) as RedBlackTreeNode<T>;
                node.value = childNode.value;
                node.right = childNode.right;
                node.left = childNode.left;
                node.color = childNode.color;

                if( node.color===Color.Red || originalColor===Color.Red ) {
                    node.color = Color.Black;
                } else {
                    this.#fixDoubleBlack( childNode );
                }
                break;
            } else {
                const replacement = REPLACE_WITH_NEXT_LARGEST
                    ? node.right!.getLeftMostChild() as RedBlackTreeNode<T>
                    : node.left!.getRightMostChild() as RedBlackTreeNode<T>
                ;
                const temp = node.value;
                node.value = replacement.value;
                replacement.value = temp;
                node = replacement;
                if( originalColor===Color.Black ) {
                    this.#fixDoubleBlack( node );
                }
            }
        }
        ( this.root as RedBlackTreeNode<T|undefined> ).color = Color.Black;
        return false;
    }

    #fixDoubleBlack( node: RedBlackTreeNode<T> ):void {
        let parent:RedBlackTreeNode<T>|undefined;
        while( ( parent = node.parent )!==undefined ) {
            const sibling = node.sibling!;
            if( sibling.value===undefined ) {
                node = parent;
            } else {
                if( sibling.color===Color.Red ) {
                    if( parent.right===sibling ) {
                        this.rotateLeft( parent );
                    } else {
                        this.rotateRight( parent );
                    }
                    parent.color = Color.Red;
                    sibling.color = Color.Black;
                } else if ( sibling.color===Color.Black && sibling.left.color===Color.Black && sibling.right.color===Color.Black ) {
                    sibling.color = Color.Red;
                    if( parent.color === Color.Red ) {
                        parent.color = Color.Black;
                        break;
                    }
                    node = parent;
                } else {
                    const redNephew = ( sibling.left.color===Color.Red ? sibling.left : sibling.right ) as RedBlackTreeNode<T>;
                    if( sibling===parent.right ) {
                        if( redNephew===sibling.left ) {
                            this.rotateRight( sibling as RedBlackTreeNode<T> );
                            redNephew.color = parent.color;
                        } else {
                            redNephew.color = Color.Black;
                            sibling.color = parent.color;
                        }
                        this.rotateLeft( parent );
                    } else {
                        if( redNephew===sibling.left ) {
                            redNephew.color = Color.Black;
                            sibling.color = parent.color;
                        } else {
                            this.rotateLeft( sibling as RedBlackTreeNode<T> );
                            redNephew.color = parent.color
                        }
                        this.rotateRight( parent );
                    }
                    parent.color = Color.Black;
                    break;
                }
            }
        }


    }

    #fixDoubleRed( node: RedBlackTreeNode<T> ):void {
        let parent:RedBlackTreeNode<T>|undefined;
        while( node.color===Color.Red && (parent=node.parent) && parent.color===Color.Red ) { // IF PARENT IS RED

            const grandparent = parent.parent!;
            const uncle = parent.sibling;

            if( uncle && uncle.color === Color.Red ) { // IF UNCLE IS ALSO RED
                parent.color = Color.Black;
                uncle.color = Color.Black;
                grandparent.color = Color.Red;
                node = grandparent!;
            } else {
                if( parent && parent===grandparent!.left ) { // IF PARENT IS LEFT CHILD
                    if( node === parent.right ) {
                        this.rotateLeft( parent );
                        node.color = Color.Black;
                    } else {
                        parent.color = Color.Black;
                    }
                    grandparent.color = Color.Red;
                    this.rotateRight( grandparent );
                } else { // If PARENT IS RIGHT CHILD
                    if( node === parent.left ) {
                        this.rotateRight( parent );
                        node.color = Color.Black;
                    } else {
                        parent.color = Color.Black;
                    }
                    grandparent.color = Color.Red;
                    this.rotateLeft( grandparent );
                }
            }
        }
        if( node.parent===undefined ) {
            this.root = node;
        }
    }

    protected createNode() : RedBlackTreeNode<undefined>;
    protected createNode( value:T ) : RedBlackTreeNode<T>;
    protected createNode( value?:T ) : RedBlackTreeNode<T|undefined> {
        return new RedBlackTreeNode( value );
    }

}