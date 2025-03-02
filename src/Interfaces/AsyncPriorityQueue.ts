import type { AsyncCollection } from "@/Interfaces/AsyncCollection";
import type { PriorityQueue } from "@/Interfaces/PriorityQueue";

/**
 * @description
 * An Asynchronous Priority queue.  Similar to {@link PriorityQueue},
 * but is AsyncIterable and has an asynchronous polling function.
 */
export interface AsyncPriorityQueue<T> extends AsyncCollection<T>, AsyncIterable<T>, PriorityQueue<T> {
    /**
     * @description
     * Asynchronous polling function, like a standard {@link PriorityQueue.poll} function,
     * except a Promise is returned.  The Promise the first value in the AsyncPriorityQueue  
     * or the next value to be added if the queue is empty.  If break or resetAsync is called  
     * on the AsyncPriorityQueue, the Promise will resolve to undefined.
     * @returns {Promise<T|undefined>} Promise resolving to next value in AsyncPriorityQueue.
     */
    pollAsync(): Promise<T | undefined>;
}