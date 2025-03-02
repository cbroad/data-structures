import type { Collection } from "@/Interfaces/Collection";

export interface MySet<T> extends Collection<T> {
    /**
     * @type {Set<T>}
     * @description
     * a copy of this Set, cast to the type of a native JavaScript Set. 
     */
    get JSSet(): Set<T>;

    /**
     * Creates set of values exclisive to this set, and not part of other set.
     * @param {MySet<V>|Set<V>} other - set to compare with
     * @returns {MySet<T>} values of difference
     */
    difference<V>(other: MySet<V> | Set<V>): MySet<T>;

    /**
     * Creates new set of values in both this set and the other set.
     * @param {MySet<V>|Set<V>} other - set to compare with
     * @returns {MySet<T|V>} values of intersection
     */
    intersection<V>(other: MySet<V> | Set<V>): MySet<T | V>;

    /**
     * Tests if this set has any elements in common with other set.
     * @param {MySet<V>|Set<V>} other - set to compare with
     * @returns {boolean} true if there are no common elements, else false.
     */
    isDisjointFrom<V>(other: MySet<V> | Set<V>): boolean;

    /**
     * Tests if this set is a subset of the other set.
     * @param {MySet<V>|Set<V>} other - set to compare with
     * @returns {boolean} true if every value in this set exists in other set, else false.
     */
    isSubsetOf<V>(other: MySet<V> | Set<V>): boolean;

    /**
     * Tests if this set is a superset of the other set.
     * @param {MySet<V>|Set<V>} other - set to compare with
     * @returns {boolean} true if every value in other set exists in this set, else false.
     */
    isSupersetOf<V>(other: MySet<V> | Set<V>): boolean;

    /**
     * Creates a new set with values that are mutually exclusive between this set
     * and the other set.
     * @param {MySet<V>|Set<V>} other - set to compare with
     * @returns {MySet<T|V>} set of values Mutually exclusive to the two sets
     */
    symmetricDifference<V>(other: MySet<V> | Set<V>): MySet<T | V>;

    /**
     * Creates a new set which is a union of this set and the other set.
     * @param {MySet<V>|Set<V>} other -  set to union with
     * @returns {MySet<T|V>} union set
     */
    union<V>(other: MySet<V> | Set<V>): MySet<T | V>;
}