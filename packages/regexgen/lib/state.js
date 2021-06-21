"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const tslib_1 = require("tslib");
const map_1 = tslib_1.__importDefault(require("./map"));
/**
 * Represents a state in a DFA.
 */
class State {
    constructor() {
        this.accepting = false;
        this.transitions = new map_1.default(k => new State);
    }
    /**
     * A generator that yields all states in the subtree
     * starting with this state.
     */
    *visit(visited = new Set()) {
        if (visited.has(this))
            return;
        visited.add(this);
        yield this;
        for (let state of this.transitions.values()) {
            yield* state.visit(visited);
        }
    }
}
exports.State = State;
exports.default = State;
//# sourceMappingURL=state.js.map