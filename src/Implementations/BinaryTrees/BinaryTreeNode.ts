export class BinaryTreeNode<T> implements Iterable<T> {

    #left: BinaryTreeNode<T | undefined> | undefined;
    #right: BinaryTreeNode<T | undefined> | undefined;
    #value: T | undefined;

    constructor();
    constructor(value: T);
    constructor(value?: T) {
        this.value = value;
    }

    get depth(): number {
        if (this.value === undefined) {
            return 0;
        }
        return 1 + Math.max(this.left!.depth, this.right!.depth);
    }

    get left() { return this.#left; }
    get right() { return this.#right; }
    get value() { return this.#value; };

    set left(node: BinaryTreeNode<T | undefined> | undefined) { this.#left = node; }
    set right(node: BinaryTreeNode<T | undefined> | undefined) { this.#right = node; }
    set value(value: T | undefined) {
        this.#value = value;
        if (this.#value === undefined) {
            this.left = undefined;
            this.right = undefined;
        } else {
            this.left ??= this.createNode();
            this.right ??= this.createNode();
        }
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        if( this.left ) yield* this.left as BinaryTreeNode<T>;
        if( this.value ) yield this.value;
        if( this.right ) yield* this.right as BinaryTreeNode<T>;
    }

    protected createNode(...args: any[]): BinaryTreeNode<T | undefined> {
        return new (Object.getPrototypeOf(this).constructor.bind.apply(Object.getPrototypeOf(this).constructor, args))();
    }

    getLeftMostChild(): BinaryTreeNode<T> {
        return (this.left?.value === undefined ? this : this.left.getLeftMostChild()) as BinaryTreeNode<T>;
    }

    getRightMostChild(): BinaryTreeNode<T> {
        return (this.right?.value === undefined ? this : this.right.getRightMostChild()) as BinaryTreeNode<T>;
    }

    toJSON(): string {
        if (this.value === undefined) { return "undefined"; }
        return `{ "value": ${JSON.stringify(this.value)}, "left": ${this.left!.toJSON()}, "right": ${this.right!.toJSON()} }`;
    }

    toString(): string {
        return this.toJSON();
    }

}