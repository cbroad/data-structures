import { Deque } from "../Interfaces";
import { NotImplementedError } from "../NotImplementedError";
import { AbstractQueue } from "./AbstractQueue";

export abstract class AbstractDeque<T> extends AbstractQueue<T> implements Deque<T> {
    get last(): T | undefined { throw new NotImplementedError(); }
    get top(): T|undefined { return this.last; }

    dequeue(): T|undefined { return this.shift(); }

    enqueue(value: T): boolean { return this.push( value ); }

    pop(): T | undefined { throw new NotImplementedError(); }

    push(value: T): boolean { return this.add( value, true ); }

    shift(): T | undefined { throw new NotImplementedError(); }
    
    unshift(value: T): boolean { throw new NotImplementedError(); }
}