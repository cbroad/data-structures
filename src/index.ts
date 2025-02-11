export * as Functions from "./Functions";
export * from "./Interfaces";
export * from "./Implementations";
import * as Implementations from "./Implementations";


// Multiple avenues to look up implementations, depending on
// what you're looking for.

export namespace Structures {
    export namespace Async {
        export const PriorityQueue = Implementations.BinaryHeap;
        export const PriorityQueues = Structures.AsyncPriorityQueues;
        export const Queue = Implementations.ArrayList;
        export const Queues = Structures.AsyncQueues;
        export const Stack = Implementations.ArrayListAsyncStack;
        export const Stacks = Structures.AsyncStacks;
    };
    export const AsyncPriorityQueue = Implementations.BinaryHeap;
    export namespace AsyncPriorityQueues {
        export const {
            OrderedArrayList,
            BinaryHeap,
            BinarySearchTree,
            MaxBinaryHeap,
            MinBinaryHeap,
            RedBlackTree,
        } = Implementations;
    };
    export const AsyncQueue = Implementations.ArrayList;
    export namespace AsyncQueues {
        export const {
            ArrayList,
            LinkedList,
        } = Implementations;
    };
    export const AsyncStack = Implementations.ArrayListAsyncStack;
    export namespace AsyncStacks {
        export const ArrayList = Implementations.ArrayListAsyncStack;
        export const LinkedList = Implementations.LinkedListAsyncStack;
    };
    export const Deque = Implementations.ArrayList;
    export namespace Deques {
        export const {
            ArrayList,
            BinarySearchTree,
            LinkedList,
            RedBlackTree,
        } = Implementations;
    };
    export const BinaryHeap = Implementations.BinaryHeap;
    export namespace BinaryHeaps {
        export const {
            BinaryHeap,
            MaxBinaryHeap,
            MinBinaryHeap,
        } = Implementations;
    };
    export const List = Implementations.ArrayList;
    export namespace Lists {
        export const {
            ArrayList,
            LinkedList,
        } = Implementations
    };
    export namespace Maps {
        export const {
            LinkedHashMap,
            TreeMap,
        } = Implementations;
        export const HashMap = Implementations.HybridHashMap;
        export namespace HashMaps {
            export const {
                ArrayHashMap,
                HybridHashMap,
                LinkedListHashMap,
                TreeHashMap,
            } = Implementations;
        };
    };
    export const PriorityQueue = Implementations.BinaryHeap;
    export namespace PriorityQueues {
        export const {
            OrderedArrayList,
            BinaryHeap,
            BinarySearchTree,
            MaxBinaryHeap,
            MinBinaryHeap,
            RedBlackTree,
        } = Implementations;
    };
    export const Queue = Implementations.ArrayList;
    export namespace Queues {
        export const {
            ArrayList,
            LinkedList,
        } = Implementations;
    };
    export namespace Sets {
        export const {
            HashSet,
            LinkedHashSet,
            TreeSet,
        } = Implementations;
    };
    export const Stack = Implementations.ArrayList;
    export namespace Stacks {
        export const {
            ArrayList,
            LinkedList,
        } = Implementations;
    };
    export const BinaryTree = Implementations.RedBlackTree;
    export namespace BinaryTrees {
        export const {
            BinarySearchTree,
            RedBlackTree,
        } = Implementations;
    };
};

export const AsyncQueue = Structures.AsyncQueues.ArrayList;
export const AsyncPriorityQueue = Structures.AsyncPriorityQueues.BinaryHeap;
export const PriorityQueue = Structures.PriorityQueues.BinaryHeap;