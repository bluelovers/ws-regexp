import { State } from './state';
/**
 * This class extends the native ES6 Set class with some additional methods
 */
export declare class ExtendedSet<V = State> extends Set<V> {
    filter(fn: (value: V) => boolean): ExtendedSet<V>;
    difference(b: ExtendedSet<V>): ExtendedSet<V>;
    intersection(b: ExtendedSet<V>): ExtendedSet<V>;
    equals(b: ExtendedSet<V>): boolean;
    find(fn: (value: V) => boolean): V;
    first(): V;
    shift(): V;
    replace(search: V, ...replacements: V[]): void;
    addAll(items: V[]): void;
}
export default ExtendedSet;
