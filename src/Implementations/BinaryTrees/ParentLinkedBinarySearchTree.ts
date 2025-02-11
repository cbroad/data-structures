import { BinarySearchTree } from "./BinarySearchTree";
import { BinaryTreeNode } from "./BinaryTreeNode";


export class ParentLinkedBinaryTreeNode<T> extends BinaryTreeNode<T> {

    #parent:ParentLinkedBinaryTreeNode<T>|undefined;

    get left():ParentLinkedBinaryTreeNode<T|undefined>|undefined { return super.left as ParentLinkedBinaryTreeNode<T|undefined>|undefined; }
    set left( node:ParentLinkedBinaryTreeNode<T|undefined>|undefined ) {
        if( this.left?.parent===this ) this.left.parent = undefined; // IS NECESSARY?
        if( node ) node.parent = this;
        super.left = node;
    }

    get parent():ParentLinkedBinaryTreeNode<T>|undefined { return this.#parent; };
    set parent( node:ParentLinkedBinaryTreeNode<T>|undefined ) { this.#parent = node; }

    get grandparent():ParentLinkedBinaryTreeNode<T>|undefined { return this.parent?.parent as ParentLinkedBinaryTreeNode<T>|undefined; }

    get right():ParentLinkedBinaryTreeNode<T|undefined>|undefined { return super.right as ParentLinkedBinaryTreeNode<T|undefined>|undefined; }
    set right( node:ParentLinkedBinaryTreeNode<T|undefined>|undefined ) {
        if( this.right?.parent===this ) this.right.parent = undefined; // IS NECESSARY?
        if( node ) node.parent = this;
        super.right = node;
    }

    get sibling():ParentLinkedBinaryTreeNode<T|undefined>|undefined {
        if( this.parent!==undefined ) {
            if( this === this.parent.left ) {
                return this.parent.right;
            } else {
                return this.parent.left;
            }
        }
        return undefined;
    }

    get uncle():ParentLinkedBinaryTreeNode<T|undefined>|undefined {
        return this.parent?.sibling;
    }

};

export class ParentLinkedBinarySearchTree<T> extends BinarySearchTree<T> {

    protected rotateLeft( node:ParentLinkedBinaryTreeNode<T> ):void {
        const temp = node.right as ParentLinkedBinaryTreeNode<T|undefined>;
        node.right = temp.left;
        if( node.parent ) {
            if( node.parent.left===node ) {
                node.parent.left = temp;
            } else {
                node.parent.right = temp;
            }
        } else {
            temp.parent = undefined
            this.root = temp;
        }
        temp.left = node;
    }

    protected rotateRight( node:ParentLinkedBinaryTreeNode<T> ):void {
        const temp = node.left as ParentLinkedBinaryTreeNode<T|undefined>;
        node.left = temp.right;
        if( node.parent ) {
            if( node.parent.left===node ) {
                node.parent.left = temp;
            } else {
                node.parent.right = temp;
            }
        } else {
            temp.parent = undefined
            this.root = temp;
        }
        temp.right = node;
    }

}