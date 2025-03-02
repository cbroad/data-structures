import type { AsyncCollection } from "@/Interfaces/AsyncCollection";
import type { Queue } from "@/Interfaces/Queue";

export interface AsyncQueue<T> extends AsyncCollection<T>, Queue<T> {
    /**
     * Asynchronously dequeues the value at front of the AsyncQueue.  Returns a Promise  
     * which resolves to the first value in the AsyncQueue or the next value to be added  
     * if the queue is empty.  If break or resetAsync is called on the AsyncQueue, the  
     * Promise will resolve to undefined.
     * @returns {Promise<T|undefined>} Promise resolving to next value in AsyncQueue.
     */
    dequeueAsync(): Promise<T | undefined>;
}