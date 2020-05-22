"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
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
class ParserEventEmitter extends events_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLG9EQUFrQztBQUNsQywyREFBa0Q7QUFHbEQsaUVBTytCO0FBSS9CLElBQWtCLHVCQWdCakI7QUFoQkQsV0FBa0IsdUJBQXVCO0lBRXhDLDhDQUFtQixDQUFBO0lBQ25CLDBDQUFlLENBQUE7SUFFZiwwQ0FBZSxDQUFBO0lBRWYsNENBQWlCLENBQUE7SUFFakIsMERBQStCLENBQUE7SUFDL0Isc0RBQTJCLENBQUE7SUFDM0Isc0RBQTJCLENBQUE7SUFFM0Isd0RBQTZCLENBQUE7SUFFN0IsNENBQWlCLENBQUE7QUFDbEIsQ0FBQyxFQWhCaUIsdUJBQXVCLEdBQXZCLCtCQUF1QixLQUF2QiwrQkFBdUIsUUFnQnhDO0FBRUQsYUFBYTtBQUNBLFFBQUEsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQ0FBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUE4QixDQUFDO0FBSTVJLE1BQWEsa0JBQW1CLFNBQVEsZ0JBQVk7SUFJbkQsWUFBWSxRQUFrRSxFQUFFLFFBQTRCLEVBQUU7UUFFN0csS0FBSyxFQUFFLENBQUM7UUFKVCxxQkFBZ0IsR0FBa0MsSUFBSSxDQUFDO1FBTXRELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQixJQUFJLE9BQU8sUUFBUSxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFDN0Q7WUFDQyxRQUFRLEdBQUcsa0RBQTBCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQTZCLENBQUM7UUFFdEQsSUFBSSxDQUFDLEVBQUUsd0JBQWlDLFVBQVUsR0FBRztZQUVwRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4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TyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUM5RSxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQW1CLEVBQUUsT0FBNkI7UUFFMUQsT0FBTyxtQ0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUV6QyxHQUFHLE9BQU87WUFFVixZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPO1NBQzNDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQW1CLGNBQTZCLE1BQU07UUFFN0QsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFNBQVM7UUFFWixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxRQUFRO1FBRVgsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO0lBQ3BDLENBQUM7Q0FFRDtBQTNWRCxnREEyVkM7QUFrREQsa0JBQWUsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicmVnZXhwcDJcIjtcbmltcG9ydCAqIGFzIHJlZ2V4cHAgZnJvbSAncmVnZXhwcDInO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgYXJyYXlfdW5pcXVlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJztcbmltcG9ydCB7IElUU1BhcnRpYWxSZWNvcmQsIElUU092ZXJ3cml0ZSB9IGZyb20gJ3RzLXR5cGUnO1xuXG5pbXBvcnQgUGFyc2VyLCB7XG5cdGFzdFRvU3RyaW5nLFxuXHRmYWtlUGF0dGVyblRvUmVnRXhwTGl0ZXJhbCxcblx0cGFyc2VGbGFncyxcblx0cGFyc2VQYXR0ZXJuLFxuXHRJTm9kZVBsdXMsXG5cdElBc3RUb1N0cmluZ09wdGlvbnMsXG59IGZyb20gJ3JlZ2V4cC1wYXJzZXItbGl0ZXJhbCc7XG5cbmltcG9ydCB7IEFwcGVuZGFibGVOb2RlIH0gZnJvbSAncmVnZXhwcDIvc3JjL3BhcnNlcic7XG5cbmV4cG9ydCBjb25zdCBlbnVtIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50XG57XG5cdGRlZmF1bHQgPSAnZGVmYXVsdCcsXG5cdGNsYXNzID0gJ2NsYXNzJyxcblxuXHRvdGhlciA9ICdvdGhlcicsXG5cblx0dW5pc2V0ID0gJ3VuaXNldCcsXG5cblx0Y2xhc3NfZGVmYXVsdCA9ICdjbGFzc19kZWZhdWx0Jyxcblx0Y2xhc3NfcmFuZ2UgPSAnY2xhc3NfcmFuZ2UnLFxuXHRjbGFzc19vdGhlciA9ICdjbGFzc19vdGhlcicsXG5cblx0Y2xhc3NfdW5pc2V0ID0gJ2NsYXNzX3VuaXNldCcsXG5cblx0Y2hhbmdlID0gJ2NoYW5nZScsXG59XG5cbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCBjb25zdCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudExpc3QgPSBPYmplY3QuZnJlZXplKGFycmF5X3VuaXF1ZShPYmplY3QudmFsdWVzKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50KSkpIGFzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50W107XG5cbmV4cG9ydCB0eXBlIElOb2RlSW5wdXQgPSBBU1QuRWxlbWVudCB8IEFTVC5DaGFyYWN0ZXJDbGFzc0VsZW1lbnQgfCBBcHBlbmRhYmxlTm9kZSB8IEFTVC5DaGFyYWN0ZXJTZXQ7XG5cbmV4cG9ydCBjbGFzcyBQYXJzZXJFdmVudEVtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbntcblx0YXN0UmVnRXhwTGl0ZXJhbDogQVNULlJlZ0V4cExpdGVyYWwgJiBJTm9kZVBsdXMgPSBudWxsO1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0QXN0OiByZWdleHBwLkFTVC5QYXR0ZXJuIHwgcmVnZXhwcC5BU1QuUmVnRXhwTGl0ZXJhbCB8IHN0cmluZywgZmxhZ3M6IHN0cmluZyB8IEFTVC5GbGFncyA9ICcnKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0aWYgKHR5cGVvZiBpbnB1dEFzdCA9PSAnc3RyaW5nJyB8fCBpbnB1dEFzdC50eXBlID09ICdQYXR0ZXJuJylcblx0XHR7XG5cdFx0XHRpbnB1dEFzdCA9IGZha2VQYXR0ZXJuVG9SZWdFeHBMaXRlcmFsKGlucHV0QXN0LCBmbGFncyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hc3RSZWdFeHBMaXRlcmFsID0gaW5wdXRBc3QgYXMgQVNULlJlZ0V4cExpdGVyYWw7XG5cblx0XHR0aGlzLm9uKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgZnVuY3Rpb24gKGFzdClcblx0XHR7XG5cdFx0XHRzZWxmLl9jaGFuZ2UoYXN0LCB0cnVlKTtcblx0XHRcdHNlbGYuY2hhbmdlZCA9IHRydWU7XG5cdFx0fSk7XG5cbi8vXHRcdGNvbnNvbGUuZGlyKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmVsZW1lbnRzLCB7XG4vL1x0XHRcdGNvbG9yczogdHJ1ZSxcbi8vXHRcdFx0ZGVwdGg6IDMsXG4vL1x0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBjcmVhdGUoaW5wdXRBc3Q6IHJlZ2V4cHAuQVNULlBhdHRlcm4gfCByZWdleHBwLkFTVC5SZWdFeHBMaXRlcmFsIHwgc3RyaW5nLCBmbGFnczogc3RyaW5nIHwgQVNULkZsYWdzID0gJycpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXMoaW5wdXRBc3QsIGZsYWdzKTtcblx0fVxuXG5cdHJlc3VtZSgpXG5cdHtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdC8qXG5cdFx0MCAmJiBjb25zb2xlLmRpcih0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybiwge1xuXHRcdFx0ZGVwdGg6IG51bGwsXG5cdFx0XHRjb2xvcnM6IHRydWUsXG5cdFx0fSk7XG5cdFx0Ki9cblxuXHRcdGxldCBwYXR0ZXJuID0gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm47XG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0bGV0IGVsZW1zID0gcGF0dGVybi5hbHRlcm5hdGl2ZXMgfHwgcGF0dGVybi5lbGVtZW50cztcblxuXHRcdGVsZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pXG5cdFx0e1xuXHRcdFx0c2VsZi5fbG9va3VwX3N1YihpdGVtLCBzZWxmKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIHNhbWUgYXMgdGhpcy5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgYXN0KVxuXHQgKi9cblx0ZW1pdENoYW5nZTxUIGV4dGVuZHMgSU5vZGVJbnB1dD4oaW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsIC4uLmFyZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgaW5wdXRBc3QsIC4uLmFyZ3MpXG5cdH1cblxuXHRlbWl0PFQgZXh0ZW5kcyBJTm9kZUlucHV0PihldmVudE5hbWU6IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LFxuXHRcdGlucHV0QXN0OiBUICYgSU5vZGVQbHVzLFxuXHRcdC4uLmFyZ3Ncblx0KTogYm9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIChzdXBlci5lbWl0IGFzIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lclN1cGVyPFQsIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50PikoZXZlbnROYW1lLCBpbnB1dEFzdCwgZXZlbnROYW1lLCB0aGlzLCAuLi5hcmdzKTtcblx0fVxuXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0PihldmVudE5hbWU6IEUsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyLCBFPixcblx0KTogdGhpc1xuXHRvbjxFIGV4dGVuZHMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3M+KGV2ZW50TmFtZTogRSxcblx0XHRsaXN0ZW5lcjogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXJDbGFzcywgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX2RlZmF1bHQ+KGV2ZW50TmFtZTogRSxcblx0XHRsaXN0ZW5lcjogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXIsIEU+LFxuXHQpOiB0aGlzXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZT4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzUmFuZ2UsIEU+LFxuXHQpOiB0aGlzXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5vdGhlcj4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzRWxlbWVudCwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LnVuaXNldD4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlclNldCwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50PihldmVudE5hbWU6IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkVsZW1lbnQsIEU+LFxuXHQpOiB0aGlzXG5cdG9uKGV2ZW50TmFtZTogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsIGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8YW55LCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudD4pOiB0aGlzXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIub24oZXZlbnROYW1lLCBsaXN0ZW5lcik7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX2NoYW5nZTxUIGV4dGVuZHMgQVNULk5vZGU+KGFzdDogVCAmIElOb2RlUGx1cywgaXNGaXJzdD86IGJvb2xlYW4pXG5cdHtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdGFzdC5jaGFuZ2VkID0gdHJ1ZTtcblxuXHRcdGlmIChhc3QucGFyZW50KVxuXHRcdHtcblx0XHRcdHRoaXMuX2NoYW5nZShhc3QucGFyZW50KVxuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBfbG9va3VwX3N1YjxUIGV4dGVuZHMgSU5vZGVJbnB1dD4oaW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsXG5cdFx0bXlFbWl0dGVyOiBQYXJzZXJFdmVudEVtaXR0ZXIsXG5cdFx0cGFyZW50Pyxcblx0XHRldmVudFByZWZpeDogc3RyaW5nID0gJycsXG5cdClcblx0e1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0bGV0IGRvX2VsZW1lbnRzOiBib29sZWFuO1xuXHRcdGxldCBzdWJfZWxlbWVudHM6IGFueVtdO1xuXHRcdGxldCBzdWJfcHJlZml4OiBzdHJpbmcgPSAnJztcblx0XHRsZXQgZXZlbnQ6IHN0cmluZyB8IGtleW9mIHR5cGVvZiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCB8IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50O1xuXG5cdFx0c3dpdGNoIChpbnB1dEFzdC50eXBlKVxuXHRcdHtcblx0XHRcdGNhc2UgJ0NoYXJhY3Rlcic6XG5cdFx0XHRcdGV2ZW50ID0gZXZlbnRQcmVmaXggKyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0O1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyQ2xhc3MnOlxuXHRcdFx0XHRldmVudCA9IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzO1xuXG5cdFx0XHRcdGRvX2VsZW1lbnRzID0gdHJ1ZTtcblx0XHRcdFx0c3ViX3ByZWZpeCA9ICdjbGFzc18nO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyQ2xhc3NSYW5nZSc6XG5cdFx0XHRcdGV2ZW50ID0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3NfcmFuZ2U7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ0NoYXJhY3RlclNldCc6XG5cdFx0XHRcdGV2ZW50ID0gZXZlbnRQcmVmaXggKyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC51bmlzZXQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ1F1YW50aWZpZXInOlxuXG5cdFx0XHRcdGRvX2VsZW1lbnRzID0gdHJ1ZTtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRzdWJfZWxlbWVudHMgPSBbaW5wdXRBc3QuZWxlbWVudF07XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ0NhcHR1cmluZ0dyb3VwJzpcblx0XHRcdGNhc2UgJ0dyb3VwJzpcblx0XHRcdGNhc2UgJ0Fzc2VydGlvbic6XG5cdFx0XHRcdGRvX2VsZW1lbnRzID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGNhc2UgJ0FsdGVybmF0aXZlJzpcblxuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdChpbnB1dEFzdCBhcyBBU1QuQWx0ZXJuYXRpdmUpLmVsZW1lbnRzXG5cdFx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW1zKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNlbGYuX2xvb2t1cF9zdWIoaXRlbXMsIG15RW1pdHRlciwgaW5wdXRBc3QsIHN1Yl9wcmVmaXgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGNhc2UgJ0Rpc2p1bmN0aW9uJzpcblxuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdChpbnB1dEFzdCBhcyBBU1QuRGlzanVuY3Rpb24pLmFsdGVybmF0aXZlc1xuXHRcdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtcylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRzZWxmLl9sb29rdXBfc3ViKGl0ZW0sIG15RW1pdHRlciwgaW5wdXRBc3QsIHN1Yl9wcmVmaXgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0O1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdGlmIChldmVudFByZWZpeCA9PT0gJ2NsYXNzXycpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRldmVudCA9IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX290aGVyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV2ZW50ID0gZXZlbnRQcmVmaXggKyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5vdGhlcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGlmIChldmVudClcblx0XHR7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRteUVtaXR0ZXIuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudFtldmVudF0sIGlucHV0QXN0KTtcblx0XHR9XG5cblx0XHRpZiAoZG9fZWxlbWVudHMgJiYgdHlwZW9mIHN1Yl9lbGVtZW50cyA9PSAndW5kZWZpbmVkJylcblx0XHR7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRzdWJfZWxlbWVudHMgPSBpbnB1dEFzdC5lbGVtZW50cztcblxuXHRcdFx0aWYgKHR5cGVvZiBzdWJfZWxlbWVudHMgPT0gJ3VuZGVmaW5lZCcpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0c3ViX2VsZW1lbnRzID0gaW5wdXRBc3QuYWx0ZXJuYXRpdmVzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghaW5wdXRBc3QudHlwZSlcblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGlucHV0QXN0LnR5cGUsIHN1Yl9lbGVtZW50cyAmJiBzdWJfZWxlbWVudHMubGVuZ3RoLCBpbnB1dEFzdCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGlucHV0QXN0LnR5cGUsIHN1Yl9lbGVtZW50cyAmJiBzdWJfZWxlbWVudHMubGVuZ3RoKTtcblx0XHR9XG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0aWYgKGRvX2VsZW1lbnRzICYmIHN1Yl9lbGVtZW50cylcblx0XHR7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRzdWJfZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSlcblx0XHRcdHtcblx0XHRcdFx0c2VsZi5fbG9va3VwX3N1YihpdGVtLCBteUVtaXR0ZXIsIGlucHV0QXN0LCBzdWJfcHJlZml4KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGdldFNvdXJjZShvdmVyd3JpdGU/OiBib29sZWFuLCBvcHRpb25zPzogSUFzdFRvU3RyaW5nT3B0aW9ucyk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIGFzdFRvU3RyaW5nKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLCB7XG5cblx0XHRcdC4uLm9wdGlvbnMsXG5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGRlYnVnQ2hhbmdlZDogb3ZlcndyaXRlID8gOTkgOiB0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybi5jaGFuZ2VkLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0RmxhZ3Mob3ZlcndyaXRlPzogYm9vbGVhbiwgb3B0aW9ucz86IElBc3RUb1N0cmluZ09wdGlvbnMpOiBzdHJpbmdcblx0e1xuXHRcdHJldHVybiBhc3RUb1N0cmluZyh0aGlzLmFzdFJlZ0V4cExpdGVyYWwuZmxhZ3MsIHtcblxuXHRcdFx0Li4ub3B0aW9ucyxcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0ZGVidWdDaGFuZ2VkOiBvdmVyd3JpdGUgPyA5OSA6IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncy5jaGFuZ2VkLFxuXHRcdH0pO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRnZXQgc291cmNlKCk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0U291cmNlKCk7XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdHNldCBzb3VyY2UocGF0dGVybjogcmVnZXhwcC5BU1QuUGF0dGVybiB8IHN0cmluZylcblx0e1xuXHRcdHBhdHRlcm4gPSB0eXBlb2YgcGF0dGVybiA9PSAnc3RyaW5nJyA/IHBhcnNlUGF0dGVybihwYXR0ZXJuLCB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuZmxhZ3MudW5pY29kZSkgOiBwYXR0ZXJuO1xuXG5cdFx0cGF0dGVybi5wYXJlbnQgPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWw7XG5cblx0XHR0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybiA9IHBhdHRlcm47XG5cblx0XHR0aGlzLmNoYW5nZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0Z2V0IGZsYWdzKCk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RmxhZ3MoKTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0c2V0IGZsYWdzKGZsYWdzOiBzdHJpbmcgfCBBU1QuRmxhZ3MpXG5cdHtcblx0XHRmbGFncyA9IHR5cGVvZiBmbGFncyA9PSAnc3RyaW5nJyA/IHBhcnNlRmxhZ3MoZmxhZ3MpIDogZmxhZ3M7XG5cblx0XHRmbGFncy5wYXJlbnQgPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWw7XG5cblx0XHR0aGlzLmFzdFJlZ0V4cExpdGVyYWwuZmxhZ3MgPSBmbGFncztcblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHR0aGlzLmNoYW5nZWQgPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybi5jaGFuZ2VkIHx8IGZhbHNlO1xuXHR9XG5cblx0Z2V0IGNoYW5nZWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5jaGFuZ2VkXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHx8IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWRcblx0XHR8fCB0eXBlb2YgdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmNoYW5nZWQgPT0gJ2Jvb2xlYW4nID8gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmNoYW5nZWQgOiBudWxsO1xuXHR9XG5cblx0c2V0IGNoYW5nZWQoYm9vbDogYm9vbGVhbilcblx0e1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHR0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybi5jaGFuZ2VkID0gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmNoYW5nZWQgPSBib29sO1xuXHR9XG5cblx0dG9TdHJpbmcob3ZlcndyaXRlPzogYm9vbGVhbiwgb3B0aW9ucz86IElBc3RUb1N0cmluZ09wdGlvbnMpXG5cdHtcblx0XHRyZXR1cm4gYXN0VG9TdHJpbmcodGhpcy5hc3RSZWdFeHBMaXRlcmFsLCB7XG5cblx0XHRcdC4uLm9wdGlvbnMsXG5cblx0XHRcdGRlYnVnQ2hhbmdlZDogb3ZlcndyaXRlID8gOTkgOiB0aGlzLmNoYW5nZWQsXG5cdFx0fSk7XG5cdH1cblxuXHR0b1JlZ0V4cDxUIGV4dGVuZHMgUmVnRXhwPihSZWdFeHBDbGFzczogdHlwZW9mIFJlZ0V4cCA9IFJlZ0V4cClcblx0e1xuXHRcdHJldHVybiBuZXcgUmVnRXhwQ2xhc3ModGhpcy5zb3VyY2UsIHRoaXMuZmxhZ3MpO1xuXHR9XG5cblx0LyoqXG5cdCAqIHRoaXMgd2lsbCBub3QgdXBkYXRlIGNoYW5nZXNcblx0ICovXG5cdGdldCBhc3RTb3VyY2UoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuO1xuXHR9XG5cblx0LyoqXG5cdCAqIHRoaXMgd2lsbCBub3QgdXBkYXRlIGNoYW5nZXNcblx0ICovXG5cdGdldCBhc3RGbGFncygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmZsYWdzO1xuXHR9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXJNYXA8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiBleHRlbmRzIElUU092ZXJ3cml0ZTxJVFNQYXJ0aWFsUmVjb3JkPFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LCBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8YW55LCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudD4+LFxue1xuXHQvKipcblx0ICog5LiA6Iis5oCnIOaWh+WtlyDnr4Dpu55cblx0ICovXG5cdFtQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0XT86IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyLCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0PjtcblxuXHQvKipcblx0ICogL1t4eHhdLyDpgJnpoZ5cblx0ICovXG5cdFtQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc10/OiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzLCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzcz47XG5cblx0LyoqXG5cdCAqIC9beHh4XS8g5LmL5Lit55qEIHh4eFxuXHQgKi9cblx0W1BhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX2RlZmF1bHRdPzogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXIsIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX2RlZmF1bHQ+O1xuXG5cdC8qKlxuXHQgKiAvWzAtOV0vIOS5i+S4reeahCAwLTlcblx0ICovXG5cdFtQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZV0/OiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzUmFuZ2UsIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX3JhbmdlPjtcblxuXHQvKipcblx0ICogL1tcXHB7eHh4eH1dLyDkuYvkuK3nmoQgXFxwe3h4eHh9XG5cdCAqL1xuXHRbUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3NfdW5pc2V0XT86IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyU2V0LCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc191bmlzZXQ+O1xuXG5cdFtQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5vdGhlcl0/OiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzRWxlbWVudCwgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQub3RoZXI+O1xuXG5cdC8qKlxuXHQgKiBcXHB7eHh4eH1cblx0ICovXG5cdFtQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC51bmlzZXRdPzogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXJTZXQsIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LnVuaXNldD47XG59Plxue1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPFQgZXh0ZW5kcyBJTm9kZUlucHV0LCBFIGV4dGVuZHMga2V5b2YgdHlwZW9mIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Plxue1xuXHQoaW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsIGV2ZW50TmFtZTogRSwgZW1pdHRlcjogUGFyc2VyRXZlbnRFbWl0dGVyLCAuLi5hcmd2OiB1bmtub3duW10pXG59XG5cbmludGVyZmFjZSBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXJTdXBlcjxUIGV4dGVuZHMgSU5vZGVJbnB1dCwgRSBleHRlbmRzIGtleW9mIHR5cGVvZiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudD5cbntcblx0KGV2ZW50OiBFLCBpbnB1dEFzdDogVCAmIElOb2RlUGx1cywgZXZlbnROYW1lOiBFLCBlbWl0dGVyOiBQYXJzZXJFdmVudEVtaXR0ZXIsIC4uLmFyZ3Y6IHVua25vd25bXSk6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFyc2VyRXZlbnRFbWl0dGVyO1xuIl19