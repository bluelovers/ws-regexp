import { DefaultMap as Map } from './map';

/**
 * Represents a state in a DFA.
 */
export class State
{
	accepting: boolean
	transitions: Map<any, State>

	constructor()
	{
		this.accepting = false;
		this.transitions = new Map(k => new State);
	}

	/**
	 * A generator that yields all states in the subtree
	 * starting with this state.
	 */
	* visit(visited: Set<State> = new Set<State>()): Generator<State, void, unknown>
	{
		if (visited.has(this)) return;
		visited.add(this);

		yield this;
		for (let state of this.transitions.values())
		{
			yield* state.visit(visited);
		}
	}
}

export default State;
