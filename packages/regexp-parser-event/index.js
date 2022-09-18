"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserEventEmitter = exports.ParserEventEmitterEventList = exports.ParserEventEmitterEvent = void 0;
//import * as regexpp from 'regexpp2';
const events_1 = require("events");
const array_hyper_unique_1 = require("array-hyper-unique");
const regexp_parser_literal_1 = require("regexp-parser-literal");
var ParserEventEmitterEvent;
(function (ParserEventEmitterEvent) {
    ParserEventEmitterEvent["default"] = "default";
    ParserEventEmitterEvent["class"] = "class";
    ParserEventEmitterEvent["other"] = "other";
    ParserEventEmitterEvent["uniset"] = "uniset";
    ParserEventEmitterEvent["class_default"] = "class_default";
    ParserEventEmitterEvent["class_range"] = "class_range";
    ParserEventEmitterEvent["class_other"] = "class_other";
    ParserEventEmitterEvent["class_uniset"] = "class_uniset";
    ParserEventEmitterEvent["change"] = "change";
})(ParserEventEmitterEvent = exports.ParserEventEmitterEvent || (exports.ParserEventEmitterEvent = {}));
// @ts-ignore
exports.ParserEventEmitterEventList = Object.freeze((0, array_hyper_unique_1.array_unique)(Object.values(ParserEventEmitterEvent)));
class ParserEventEmitter extends events_1.EventEmitter {
    constructor(inputAst, flags = '') {
        super();
        this.astRegExpLiteral = null;
        const self = this;
        if (typeof inputAst == 'string' || inputAst.type == 'Pattern') {
            inputAst = (0, regexp_parser_literal_1.fakePatternToRegExpLiteral)(inputAst, flags);
        }
        this.astRegExpLiteral = inputAst;
        this.on("change" /* ParserEventEmitterEvent.change */, function (ast) {
            self._change(ast, true);
            self.changed = true;
        });
        //		console.dir(this.astRegExpLiteral.pattern.elements, {
        //			colors: true,
        //			depth: 3,
        //		});
    }
    static create(inputAst, flags = '') {
        return new this(inputAst, flags);
    }
    resume() {
        const self = this;
        /*
        0 && console.dir(this.astRegExpLiteral.pattern, {
            depth: null,
            colors: true,
        });
        */
        let pattern = this.astRegExpLiteral.pattern;
        // @ts-ignore
        let elems = pattern.alternatives || pattern.elements;
        elems.forEach(function (item) {
            self._lookup_sub(item, self);
        });
        return this;
    }
    /**
     * same as this.emit(ParserEventEmitterEvent.change, ast)
     */
    emitChange(inputAst, ...args) {
        return this.emit("change" /* ParserEventEmitterEvent.change */, inputAst, ...args);
    }
    emit(eventName, inputAst, ...args) {
        return super.emit(eventName, inputAst, eventName, this, ...args);
    }
    on(eventName, listener) {
        return super.on(eventName, listener);
    }
    _change(ast, isFirst) {
        const self = this;
        ast.changed = true;
        if (ast.parent) {
            this._change(ast.parent);
        }
    }
    _lookup_sub(inputAst, myEmitter, parent, eventPrefix = '') {
        const self = this;
        let do_elements;
        let sub_elements;
        let sub_prefix = '';
        let event;
        switch (inputAst.type) {
            case 'Character':
                event = eventPrefix + "default" /* ParserEventEmitterEvent.default */;
                break;
            case 'CharacterClass':
                event = "class" /* ParserEventEmitterEvent.class */;
                do_elements = true;
                sub_prefix = 'class_';
                break;
            case 'CharacterClassRange':
                event = "class_range" /* ParserEventEmitterEvent.class_range */;
                break;
            case 'CharacterSet':
                event = eventPrefix + "uniset" /* ParserEventEmitterEvent.uniset */;
                break;
            case 'Quantifier':
                do_elements = true;
                // @ts-ignore
                sub_elements = [inputAst.element];
                break;
            case 'CapturingGroup':
            case 'Group':
            case 'Assertion':
                do_elements = true;
                break;
            // @ts-ignore
            case 'Alternative':
                // @ts-ignore
                inputAst.elements
                    .forEach(function (items) {
                    self._lookup_sub(items, myEmitter, inputAst, sub_prefix);
                });
                ;
                break;
            // @ts-ignore
            case 'Disjunction':
                // @ts-ignore
                inputAst.alternatives
                    .forEach(function (items) {
                    items.forEach(function (item) {
                        self._lookup_sub(item, myEmitter, inputAst, sub_prefix);
                    });
                });
                break;
            default:
                if (eventPrefix === 'class_') {
                    event = "class_other" /* ParserEventEmitterEvent.class_other */;
                }
                else {
                    event = eventPrefix + "other" /* ParserEventEmitterEvent.other */;
                }
                break;
        }
        if (event) {
            // @ts-ignore
            myEmitter.emit(ParserEventEmitterEvent[event], inputAst);
        }
        if (do_elements && typeof sub_elements == 'undefined') {
            // @ts-ignore
            sub_elements = inputAst.elements;
            if (typeof sub_elements == 'undefined') {
                // @ts-ignore
                sub_elements = inputAst.alternatives;
            }
        }
        if (!inputAst.type) {
            //console.log(inputAst.type, sub_elements && sub_elements.length, inputAst);
        }
        else {
            //console.log(inputAst.type, sub_elements && sub_elements.length);
        }
        // @ts-ignore
        if (do_elements && sub_elements) {
            // @ts-ignore
            sub_elements.forEach(function (item) {
                self._lookup_sub(item, myEmitter, inputAst, sub_prefix);
            });
        }
    }
    getSource(overwrite, options) {
        return (0, regexp_parser_literal_1.astToString)(this.astRegExpLiteral.pattern, {
            ...options,
            // @ts-ignore
            debugChanged: overwrite ? 99 : this.astRegExpLiteral.pattern.changed,
        });
    }
    getFlags(overwrite, options) {
        return (0, regexp_parser_literal_1.astToString)(this.astRegExpLiteral.flags, {
            ...options,
            // @ts-ignore
            debugChanged: overwrite ? 99 : this.astRegExpLiteral.flags.changed,
        });
    }
    // @ts-ignore
    get source() {
        return this.getSource();
    }
    // @ts-ignore
    set source(pattern) {
        pattern = typeof pattern == 'string' ? (0, regexp_parser_literal_1.parsePattern)(pattern, this.astRegExpLiteral.flags.unicode) : pattern;
        pattern.parent = this.astRegExpLiteral;
        this.astRegExpLiteral.pattern = pattern;
        this.changed = false;
    }
    // @ts-ignore
    get flags() {
        return this.getFlags();
    }
    // @ts-ignore
    set flags(flags) {
        flags = typeof flags == 'string' ? (0, regexp_parser_literal_1.parseFlags)(flags) : flags;
        flags.parent = this.astRegExpLiteral;
        this.astRegExpLiteral.flags = flags;
        // @ts-ignore
        this.changed = this.astRegExpLiteral.pattern.changed || false;
    }
    get changed() {
        return this.astRegExpLiteral.changed
            // @ts-ignore
            || this.astRegExpLiteral.pattern.changed
            || typeof this.astRegExpLiteral.changed == 'boolean' ? this.astRegExpLiteral.changed : null;
    }
    set changed(bool) {
        // @ts-ignore
        this.astRegExpLiteral.pattern.changed = this.astRegExpLiteral.changed = bool;
    }
    toString(overwrite, options) {
        return (0, regexp_parser_literal_1.astToString)(this.astRegExpLiteral, {
            ...options,
            debugChanged: overwrite ? 99 : this.changed,
        });
    }
    toRegExp(RegExpClass = RegExp) {
        return new RegExpClass(this.source, this.flags);
    }
    /**
     * this will not update changes
     */
    get astSource() {
        return this.astRegExpLiteral.pattern;
    }
    /**
     * this will not update changes
     */
    get astFlags() {
        return this.astRegExpLiteral.flags;
    }
}
exports.ParserEventEmitter = ParserEventEmitter;
exports.default = ParserEventEmitter;
//# sourceMappingURL=index.js.map