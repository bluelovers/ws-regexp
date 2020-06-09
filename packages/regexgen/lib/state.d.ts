import Map from './map';
/**
 * Represents a state in a DFA.
 */
export declare class State {
    accepting: boolean;
    transitions: Map<any, State>;
    constructor();
    /**
     * A generator that yields all states in the subtree
     * starting with this state.
     */
    visit(visited?: Set<State>): Generator<State, void, unknown>;
}
export default State;
