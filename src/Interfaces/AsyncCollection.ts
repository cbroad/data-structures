import { Collection } from "@/Interfaces/Collection";

/**
 * @description
 * A Collection that is also AsyncIterable.  
 * Includes functions to help control Asynchronisity
 */
export interface AsyncCollection<T> extends AsyncIterable<T>, Collection<T> {

    /**
     * @description
     * Causes any current AsyncIterator to stop. 
     */
    break(): void;

    /**
     * @description
     * Resets AbortController, if aborted.  
     * Rejects all promises waiting on this AsyncCollection.  
     * Resets AsyncCollection for new AsyncIterator.
     */
    resetAsync(): void;
}