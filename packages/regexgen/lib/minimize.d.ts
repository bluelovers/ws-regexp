import State from './state';
/**
 * Implements Hopcroft's DFA minimization algorithm.
 * https://en.wikipedia.org/wiki/DFA_minimization#Hopcroft.27s_algorithm
 *
 * @param {State} root - the initial state of the DFA
 * @return {State} - the new initial state
 */
export declare function minimize(root: State): State;
export default minimize;
