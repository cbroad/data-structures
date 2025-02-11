import { AbstractCollection } from "./AbstractCollection";
import { List } from "../Interfaces";
import { NotImplementedError } from "../NotImplementedError";

export abstract class AbstractList<T> extends AbstractCollection<T> implements List<T> {

    contains(value: T): boolean {
        return this.has( value );
    }

    get( idx:Number ):T|undefined {
        throw new NotImplementedError();
    }

    indexOf( value:T ): number {
        throw new NotImplementedError();
    }

    insert( value:T, idx:number ): boolean {
        throw new NotImplementedError();
    }

    remove( value:T ): boolean {
        let idx = this.indexOf( value );
        if( idx >=0 ) {
            this.removeFrom( idx );
            return true;
        }
        return false
    }

    removeFrom( idx: number ):T|undefined {
        throw new NotImplementedError();
    }

}