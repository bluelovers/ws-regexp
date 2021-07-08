"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minimize = void 0;
const tslib_1 = require("tslib");
const map_1 = (0, tslib_1.__importDefault)(require("./map"));
const set_1 = (0, tslib_1.__importDefault)(require("./set"));
const state_1 = (0, tslib_1.__importDefault)(require("./state"));
/**
 * Implements Hopcroft's DFA minimization algorithm.
 * https://en.wikipedia.org/wiki/DFA_minimization#Hopcroft.27s_algorithm
 *
 * @param {State} root - the initial state of the DFA
 * @return {State} - the new initial state
 */
function minimize(root) {
    let states = new set_1.default(root.visit());
    let finalStates = states.filter(s => s.accepting);
    // Create a map of incoming transitions to each state, grouped by character.
    let transitions = new map_1.default(k => new map_1.default(k => new set_1.default));
    for (let s of states) {
        for (let [t, st] of s.transitions) {
            transitions.get(st).get(t).add(s);
        }
    }
    let P = new set_1.default([finalStates, states.difference(finalStates)]);
    let W = new set_1.default(P);
    while (W.size > 0) {
        let A = W.shift();
        // Collect states that have transitions leading to states in A, grouped by character.
        let t = new map_1.default(k => new set_1.default);
        for (let s of A) {
            for (let [T, X] of transitions.get(s)) {
                // @ts-ignore
                t.get(T).addAll(X);
            }
        }
        for (let X of t.values()) {
            for (let Y of P) {
                let i = X.intersection(Y);
                if (i.size === 0) {
                    continue;
                }
                let d = Y.difference(X);
                if (d.size === 0) {
                    continue;
                }
                P.replace(Y, i, d);
                let y = W.find(v => v.equals(Y));
                if (y) {
                    W.replace(y, i, d);
                }
                else if (i.size <= d.size) {
                    // @ts-ignore
                    W.add(i);
                }
                else {
                    W.add(d);
                }
            }
        }
    }
    // Each set S in P now represents a state in the minimized DFA.
    // Build the new states and transitions.
    let newStates = new map_1.default(k => new state_1.default);
    let initial = null;
    for (let S of P) {
        let first = S.first();
        let s = newStates.get(S);
        for (let [c, old] of first.transitions) {
            s.transitions.set(c, newStates.get(P.find(v => v.has(old))));
        }
        s.accepting = first.accepting;
        if (S.has(root)) {
            initial = s;
        }
    }
    return initial;
}
exports.minimize = minimize;
exports.default = minimize;
//# sourceMappingURL=minimize.js.map