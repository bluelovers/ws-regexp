"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
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
exports.ParserEventEmitterEventList = Object.freeze(array_hyper_unique_1.array_unique(Object.values(ParserEventEmitterEvent)));
class ParserEventEmitter extends EventEmitter {
    constructor(inputAst, flags = '') {
        super();
        this.astRegExpLiteral = null;
        const self = this;
        if (typeof inputAst == 'string' || inputAst.type == 'Pattern') {
            inputAst = regexp_parser_literal_1.fakePatternToRegExpLiteral(inputAst, flags);
        }
        this.astRegExpLiteral = inputAst;
        this.on("change" /* change */, function (ast) {
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
        return this.emit("change" /* change */, inputAst, ...args);
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
                event = eventPrefix + "default" /* default */;
                break;
            case 'CharacterClass':
                event = "class" /* class */;
                do_elements = true;
                sub_prefix = 'class_';
                break;
            case 'CharacterClassRange':
                event = "class_range" /* class_range */;
                break;
            case 'CharacterSet':
                event = eventPrefix + "uniset" /* uniset */;
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
                    event = "class_other" /* class_other */;
                }
                else {
                    event = eventPrefix + "other" /* other */;
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
        return regexp_parser_literal_1.astToString(this.astRegExpLiteral.pattern, {
            ...options,
            // @ts-ignore
            debugChanged: overwrite ? 99 : this.astRegExpLiteral.pattern.changed,
        });
    }
    getFlags(overwrite, options) {
        return regexp_parser_literal_1.astToString(this.astRegExpLiteral.flags, {
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
        pattern = typeof pattern == 'string' ? regexp_parser_literal_1.parsePattern(pattern, this.astRegExpLiteral.flags.unicode) : pattern;
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
        flags = typeof flags == 'string' ? regexp_parser_literal_1.parseFlags(flags) : flags;
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
        return regexp_parser_literal_1.astToString(this.astRegExpLiteral, {
            ...options,
            debugChanged: overwrite ? 99 : this.changed,
        });
    }
    toRegExp(RegExpClass = RegExp) {
        return new RegExpClass(this.source, this.flags);
    }
}
exports.ParserEventEmitter = ParserEventEmitter;
exports.default = ParserEventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVDQUF3QztBQUN4QywyREFBa0Q7QUFFbEQsaUVBTytCO0FBSS9CLElBQWtCLHVCQWdCakI7QUFoQkQsV0FBa0IsdUJBQXVCO0lBRXhDLDhDQUFtQixDQUFBO0lBQ25CLDBDQUFlLENBQUE7SUFFZiwwQ0FBZSxDQUFBO0lBRWYsNENBQWlCLENBQUE7SUFFakIsMERBQStCLENBQUE7SUFDL0Isc0RBQTJCLENBQUE7SUFDM0Isc0RBQTJCLENBQUE7SUFFM0Isd0RBQTZCLENBQUE7SUFFN0IsNENBQWlCLENBQUE7QUFDbEIsQ0FBQyxFQWhCaUIsdUJBQXVCLEdBQXZCLCtCQUF1QixLQUF2QiwrQkFBdUIsUUFnQnhDO0FBRUQsYUFBYTtBQUNBLFFBQUEsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQ0FBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUE4QixDQUFDO0FBSTVJLE1BQWEsa0JBQW1CLFNBQVEsWUFBWTtJQUluRCxZQUFZLFFBQWtFLEVBQUUsUUFBNEIsRUFBRTtRQUU3RyxLQUFLLEVBQUUsQ0FBQztRQUpULHFCQUFnQixHQUFrQyxJQUFJLENBQUM7UUFNdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksT0FBTyxRQUFRLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksU0FBUyxFQUM3RDtZQUNDLFFBQVEsR0FBRyxrREFBMEIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBNkIsQ0FBQztRQUV0RCxJQUFJLENBQUMsRUFBRSx3QkFBaUMsVUFBVSxHQUFHO1lBRXBELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElB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QUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQzlFLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBbUIsRUFBRSxPQUE2QjtRQUUxRCxPQUFPLG1DQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBRXpDLEdBQUcsT0FBTztZQUVWLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVEsQ0FBbUIsY0FBNkIsTUFBTTtRQUU3RCxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRDtBQXZVRCxnREF1VUM7QUFZRCxrQkFBZSxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJyZWdleHBwMlwiO1xuaW1wb3J0IHJlZ2V4cHAgPSByZXF1aXJlKCdyZWdleHBwMicpO1xuaW1wb3J0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuaW1wb3J0IHsgYXJyYXlfdW5pcXVlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJztcblxuaW1wb3J0IFBhcnNlciwge1xuXHRhc3RUb1N0cmluZyxcblx0ZmFrZVBhdHRlcm5Ub1JlZ0V4cExpdGVyYWwsXG5cdHBhcnNlRmxhZ3MsXG5cdHBhcnNlUGF0dGVybixcblx0SU5vZGVQbHVzLFxuXHRJQXN0VG9TdHJpbmdPcHRpb25zLFxufSBmcm9tICdyZWdleHAtcGFyc2VyLWxpdGVyYWwnO1xuXG5pbXBvcnQgeyBBcHBlbmRhYmxlTm9kZSB9IGZyb20gJ3JlZ2V4cHAyL3NyYy9wYXJzZXInO1xuXG5leHBvcnQgY29uc3QgZW51bSBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudFxue1xuXHRkZWZhdWx0ID0gJ2RlZmF1bHQnLFxuXHRjbGFzcyA9ICdjbGFzcycsXG5cblx0b3RoZXIgPSAnb3RoZXInLFxuXG5cdHVuaXNldCA9ICd1bmlzZXQnLFxuXG5cdGNsYXNzX2RlZmF1bHQgPSAnY2xhc3NfZGVmYXVsdCcsXG5cdGNsYXNzX3JhbmdlID0gJ2NsYXNzX3JhbmdlJyxcblx0Y2xhc3Nfb3RoZXIgPSAnY2xhc3Nfb3RoZXInLFxuXG5cdGNsYXNzX3VuaXNldCA9ICdjbGFzc191bmlzZXQnLFxuXG5cdGNoYW5nZSA9ICdjaGFuZ2UnLFxufVxuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgY29uc3QgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRMaXN0ID0gT2JqZWN0LmZyZWV6ZShhcnJheV91bmlxdWUoT2JqZWN0LnZhbHVlcyhQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCkpKSBhcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudFtdO1xuXG5leHBvcnQgdHlwZSBJTm9kZUlucHV0ID0gQVNULkVsZW1lbnQgfCBBU1QuQ2hhcmFjdGVyQ2xhc3NFbGVtZW50IHwgQXBwZW5kYWJsZU5vZGU7XG5cbmV4cG9ydCBjbGFzcyBQYXJzZXJFdmVudEVtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbntcblx0YXN0UmVnRXhwTGl0ZXJhbDogQVNULlJlZ0V4cExpdGVyYWwgJiBJTm9kZVBsdXMgPSBudWxsO1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0QXN0OiByZWdleHBwLkFTVC5QYXR0ZXJuIHwgcmVnZXhwcC5BU1QuUmVnRXhwTGl0ZXJhbCB8IHN0cmluZywgZmxhZ3M6IHN0cmluZyB8IEFTVC5GbGFncyA9ICcnKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0aWYgKHR5cGVvZiBpbnB1dEFzdCA9PSAnc3RyaW5nJyB8fCBpbnB1dEFzdC50eXBlID09ICdQYXR0ZXJuJylcblx0XHR7XG5cdFx0XHRpbnB1dEFzdCA9IGZha2VQYXR0ZXJuVG9SZWdFeHBMaXRlcmFsKGlucHV0QXN0LCBmbGFncyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hc3RSZWdFeHBMaXRlcmFsID0gaW5wdXRBc3QgYXMgQVNULlJlZ0V4cExpdGVyYWw7XG5cblx0XHR0aGlzLm9uKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgZnVuY3Rpb24gKGFzdClcblx0XHR7XG5cdFx0XHRzZWxmLl9jaGFuZ2UoYXN0LCB0cnVlKTtcblx0XHRcdHNlbGYuY2hhbmdlZCA9IHRydWU7XG5cdFx0fSk7XG5cbi8vXHRcdGNvbnNvbGUuZGlyKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmVsZW1lbnRzLCB7XG4vL1x0XHRcdGNvbG9yczogdHJ1ZSxcbi8vXHRcdFx0ZGVwdGg6IDMsXG4vL1x0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBjcmVhdGUoaW5wdXRBc3Q6IHJlZ2V4cHAuQVNULlBhdHRlcm4gfCByZWdleHBwLkFTVC5SZWdFeHBMaXRlcmFsIHwgc3RyaW5nLCBmbGFnczogc3RyaW5nIHwgQVNULkZsYWdzID0gJycpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXMoaW5wdXRBc3QsIGZsYWdzKTtcblx0fVxuXG5cdHJlc3VtZSgpXG5cdHtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdC8qXG5cdFx0MCAmJiBjb25zb2xlLmRpcih0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybiwge1xuXHRcdFx0ZGVwdGg6IG51bGwsXG5cdFx0XHRjb2xvcnM6IHRydWUsXG5cdFx0fSk7XG5cdFx0Ki9cblxuXHRcdGxldCBwYXR0ZXJuID0gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm47XG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0bGV0IGVsZW1zID0gcGF0dGVybi5hbHRlcm5hdGl2ZXMgfHwgcGF0dGVybi5lbGVtZW50cztcblxuXHRcdGVsZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pXG5cdFx0e1xuXHRcdFx0c2VsZi5fbG9va3VwX3N1YihpdGVtLCBzZWxmKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIHNhbWUgYXMgdGhpcy5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgYXN0KVxuXHQgKi9cblx0ZW1pdENoYW5nZTxUIGV4dGVuZHMgSU5vZGVJbnB1dD4oaW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsIC4uLmFyZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgaW5wdXRBc3QsIC4uLmFyZ3MpXG5cdH1cblxuXHRlbWl0PFQgZXh0ZW5kcyBJTm9kZUlucHV0PihldmVudE5hbWU6IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LFxuXHRcdGlucHV0QXN0OiBUICYgSU5vZGVQbHVzLFxuXHRcdC4uLmFyZ3Ncblx0KTogYm9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIChzdXBlci5lbWl0IGFzIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lclN1cGVyPFQsIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50PikoZXZlbnROYW1lLCBpbnB1dEFzdCwgZXZlbnROYW1lLCB0aGlzLCAuLi5hcmdzKTtcblx0fVxuXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0PihldmVudE5hbWU6IEUsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyLCBFPixcblx0KTogdGhpc1xuXHRvbjxFIGV4dGVuZHMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3M+KGV2ZW50TmFtZTogRSxcblx0XHRsaXN0ZW5lcjogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXJDbGFzcywgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX2RlZmF1bHQ+KGV2ZW50TmFtZTogRSxcblx0XHRsaXN0ZW5lcjogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXIsIEU+LFxuXHQpOiB0aGlzXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZT4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzUmFuZ2UsIEU+LFxuXHQpOiB0aGlzXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5vdGhlcj4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzRWxlbWVudCwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50PihldmVudE5hbWU6IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkVsZW1lbnQsIEU+LFxuXHQpOiB0aGlzXG5cdG9uKGV2ZW50TmFtZTogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsIGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8YW55LCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudD4pOiB0aGlzXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIub24oZXZlbnROYW1lLCBsaXN0ZW5lcik7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX2NoYW5nZTxUIGV4dGVuZHMgQVNULk5vZGU+KGFzdDogVCAmIElOb2RlUGx1cywgaXNGaXJzdD86IGJvb2xlYW4pXG5cdHtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdGFzdC5jaGFuZ2VkID0gdHJ1ZTtcblxuXHRcdGlmIChhc3QucGFyZW50KVxuXHRcdHtcblx0XHRcdHRoaXMuX2NoYW5nZShhc3QucGFyZW50KVxuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBfbG9va3VwX3N1YjxUIGV4dGVuZHMgSU5vZGVJbnB1dD4oaW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsXG5cdFx0bXlFbWl0dGVyOiBQYXJzZXJFdmVudEVtaXR0ZXIsXG5cdFx0cGFyZW50Pyxcblx0XHRldmVudFByZWZpeDogc3RyaW5nID0gJycsXG5cdClcblx0e1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0bGV0IGRvX2VsZW1lbnRzOiBib29sZWFuO1xuXHRcdGxldCBzdWJfZWxlbWVudHM6IGFueVtdO1xuXHRcdGxldCBzdWJfcHJlZml4OiBzdHJpbmcgPSAnJztcblx0XHRsZXQgZXZlbnQ6IHN0cmluZyB8IGtleW9mIHR5cGVvZiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCB8IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50O1xuXG5cdFx0c3dpdGNoIChpbnB1dEFzdC50eXBlKVxuXHRcdHtcblx0XHRcdGNhc2UgJ0NoYXJhY3Rlcic6XG5cdFx0XHRcdGV2ZW50ID0gZXZlbnRQcmVmaXggKyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0O1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyQ2xhc3MnOlxuXHRcdFx0XHRldmVudCA9IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzO1xuXG5cdFx0XHRcdGRvX2VsZW1lbnRzID0gdHJ1ZTtcblx0XHRcdFx0c3ViX3ByZWZpeCA9ICdjbGFzc18nO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyQ2xhc3NSYW5nZSc6XG5cdFx0XHRcdGV2ZW50ID0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3NfcmFuZ2U7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ0NoYXJhY3RlclNldCc6XG5cdFx0XHRcdGV2ZW50ID0gZXZlbnRQcmVmaXggKyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC51bmlzZXQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ1F1YW50aWZpZXInOlxuXG5cdFx0XHRcdGRvX2VsZW1lbnRzID0gdHJ1ZTtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRzdWJfZWxlbWVudHMgPSBbaW5wdXRBc3QuZWxlbWVudF07XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ0NhcHR1cmluZ0dyb3VwJzpcblx0XHRcdGNhc2UgJ0dyb3VwJzpcblx0XHRcdGNhc2UgJ0Fzc2VydGlvbic6XG5cdFx0XHRcdGRvX2VsZW1lbnRzID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGNhc2UgJ0FsdGVybmF0aXZlJzpcblxuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdChpbnB1dEFzdCBhcyBBU1QuQWx0ZXJuYXRpdmUpLmVsZW1lbnRzXG5cdFx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW1zKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNlbGYuX2xvb2t1cF9zdWIoaXRlbXMsIG15RW1pdHRlciwgaW5wdXRBc3QsIHN1Yl9wcmVmaXgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGNhc2UgJ0Rpc2p1bmN0aW9uJzpcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0KGlucHV0QXN0IGFzIEFTVC5EaXNqdW5jdGlvbikuYWx0ZXJuYXRpdmVzXG5cdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtcylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2VsZi5fbG9va3VwX3N1YihpdGVtLCBteUVtaXR0ZXIsIGlucHV0QXN0LCBzdWJfcHJlZml4KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSlcblx0XHRcdDtcblxuXHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0aWYgKGV2ZW50UHJlZml4ID09PSAnY2xhc3NfJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV2ZW50ID0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3Nfb3RoZXI7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXZlbnQgPSBldmVudFByZWZpeCArIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Lm90aGVyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50KVxuXHRcdHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdG15RW1pdHRlci5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50W2V2ZW50XSwgaW5wdXRBc3QpO1xuXHRcdH1cblxuXHRcdGlmIChkb19lbGVtZW50cyAmJiB0eXBlb2Ygc3ViX2VsZW1lbnRzID09ICd1bmRlZmluZWQnKVxuXHRcdHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHN1Yl9lbGVtZW50cyA9IGlucHV0QXN0LmVsZW1lbnRzO1xuXG5cdFx0XHRpZiAodHlwZW9mIHN1Yl9lbGVtZW50cyA9PSAndW5kZWZpbmVkJylcblx0XHRcdHtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRzdWJfZWxlbWVudHMgPSBpbnB1dEFzdC5hbHRlcm5hdGl2ZXM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFpbnB1dEFzdC50eXBlKVxuXHRcdHtcblx0XHRcdC8vY29uc29sZS5sb2coaW5wdXRBc3QudHlwZSwgc3ViX2VsZW1lbnRzICYmIHN1Yl9lbGVtZW50cy5sZW5ndGgsIGlucHV0QXN0KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vY29uc29sZS5sb2coaW5wdXRBc3QudHlwZSwgc3ViX2VsZW1lbnRzICYmIHN1Yl9lbGVtZW50cy5sZW5ndGgpO1xuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRpZiAoZG9fZWxlbWVudHMgJiYgc3ViX2VsZW1lbnRzKVxuXHRcdHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHN1Yl9lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRzZWxmLl9sb29rdXBfc3ViKGl0ZW0sIG15RW1pdHRlciwgaW5wdXRBc3QsIHN1Yl9wcmVmaXgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0U291cmNlKG92ZXJ3cml0ZT86IGJvb2xlYW4sIG9wdGlvbnM/OiBJQXN0VG9TdHJpbmdPcHRpb25zKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gYXN0VG9TdHJpbmcodGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4sIHtcblxuXHRcdFx0Li4ub3B0aW9ucyxcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0ZGVidWdDaGFuZ2VkOiBvdmVyd3JpdGUgPyA5OSA6IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWQsXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRGbGFncyhvdmVyd3JpdGU/OiBib29sZWFuLCBvcHRpb25zPzogSUFzdFRvU3RyaW5nT3B0aW9ucyk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIGFzdFRvU3RyaW5nKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncywge1xuXG5cdFx0XHQuLi5vcHRpb25zLFxuXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRkZWJ1Z0NoYW5nZWQ6IG92ZXJ3cml0ZSA/IDk5IDogdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmZsYWdzLmNoYW5nZWQsXG5cdFx0fSk7XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdGdldCBzb3VyY2UoKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5nZXRTb3VyY2UoKTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0c2V0IHNvdXJjZShwYXR0ZXJuOiByZWdleHBwLkFTVC5QYXR0ZXJuIHwgc3RyaW5nKVxuXHR7XG5cdFx0cGF0dGVybiA9IHR5cGVvZiBwYXR0ZXJuID09ICdzdHJpbmcnID8gcGFyc2VQYXR0ZXJuKHBhdHRlcm4sIHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncy51bmljb2RlKSA6IHBhdHRlcm47XG5cblx0XHRwYXR0ZXJuLnBhcmVudCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbDtcblxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuID0gcGF0dGVybjtcblxuXHRcdHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRnZXQgZmxhZ3MoKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5nZXRGbGFncygpO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRzZXQgZmxhZ3MoZmxhZ3M6IHN0cmluZyB8IEFTVC5GbGFncylcblx0e1xuXHRcdGZsYWdzID0gdHlwZW9mIGZsYWdzID09ICdzdHJpbmcnID8gcGFyc2VGbGFncyhmbGFncykgOiBmbGFncztcblxuXHRcdGZsYWdzLnBhcmVudCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbDtcblxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncyA9IGZsYWdzO1xuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHRoaXMuY2hhbmdlZCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWQgfHwgZmFsc2U7XG5cdH1cblxuXHRnZXQgY2hhbmdlZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmNoYW5nZWRcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0fHwgdGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4uY2hhbmdlZFxuXHRcdHx8IHR5cGVvZiB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZCA9PSAnYm9vbGVhbicgPyB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZCA6IG51bGw7XG5cdH1cblxuXHRzZXQgY2hhbmdlZChib29sOiBib29sZWFuKVxuXHR7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWQgPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZCA9IGJvb2w7XG5cdH1cblxuXHR0b1N0cmluZyhvdmVyd3JpdGU/OiBib29sZWFuLCBvcHRpb25zPzogSUFzdFRvU3RyaW5nT3B0aW9ucylcblx0e1xuXHRcdHJldHVybiBhc3RUb1N0cmluZyh0aGlzLmFzdFJlZ0V4cExpdGVyYWwsIHtcblxuXHRcdFx0Li4ub3B0aW9ucyxcblxuXHRcdFx0ZGVidWdDaGFuZ2VkOiBvdmVyd3JpdGUgPyA5OSA6IHRoaXMuY2hhbmdlZCxcblx0XHR9KTtcblx0fVxuXG5cdHRvUmVnRXhwPFQgZXh0ZW5kcyBSZWdFeHA+KFJlZ0V4cENsYXNzOiB0eXBlb2YgUmVnRXhwID0gUmVnRXhwKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHBDbGFzcyh0aGlzLnNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8VCBleHRlbmRzIElOb2RlSW5wdXQsIEUgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+XG57XG5cdChpbnB1dEFzdDogVCAmIElOb2RlUGx1cywgZXZlbnROYW1lOiBFLCBlbWl0dGVyOiBQYXJzZXJFdmVudEVtaXR0ZXIsIC4uLmFyZ3Y6IHVua25vd25bXSlcbn1cblxuaW50ZXJmYWNlIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lclN1cGVyPFQgZXh0ZW5kcyBJTm9kZUlucHV0LCBFIGV4dGVuZHMga2V5b2YgdHlwZW9mIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Plxue1xuXHQoZXZlbnQ6IEUsIGlucHV0QXN0OiBUICYgSU5vZGVQbHVzLCBldmVudE5hbWU6IEUsIGVtaXR0ZXI6IFBhcnNlckV2ZW50RW1pdHRlciwgLi4uYXJndjogdW5rbm93bltdKTogYm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJzZXJFdmVudEVtaXR0ZXI7XG4iXX0=