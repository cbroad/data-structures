import { NotImplementedError } from "../../NotImplementedError";
import { ParentLinkedBinarySearchTree } from "./ParentLinkedBinarySearchTree";

export class AVLTree<T> extends ParentLinkedBinarySearchTree<T> {

    add( value:T ):this;
    add( value:T, confirm:true ):boolean;
    add( value:T, confirm:boolean ):boolean|this;
    add( value:T, confirm:boolean=false ):this|boolean {
        throw new NotImplementedError();
    }

}