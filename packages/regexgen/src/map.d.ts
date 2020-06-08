import State from './state';
/**
 * This ES6 Map subclass calls the getter function passed to
 * the constructor to initialize undefined properties when they
 * are first retrieved.
 */
export declare class DefaultMap<K = State, V = State> extends Map<K, V> {
    defaultGetter: (key: K) => V;
    constructor(iterable: (key: K) => V, defaultGetter?: (key: K) => V);
    get(key: any): V;
}
export default DefaultMap;
