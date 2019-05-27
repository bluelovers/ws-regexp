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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVDQUF3QztBQUN4QywyREFBa0Q7QUFFbEQsaUVBTytCO0FBSS9CLElBQWtCLHVCQWdCakI7QUFoQkQsV0FBa0IsdUJBQXVCO0lBRXhDLDhDQUFtQixDQUFBO0lBQ25CLDBDQUFlLENBQUE7SUFFZiwwQ0FBZSxDQUFBO0lBRWYsNENBQWlCLENBQUE7SUFFakIsMERBQStCLENBQUE7SUFDL0Isc0RBQTJCLENBQUE7SUFDM0Isc0RBQTJCLENBQUE7SUFFM0Isd0RBQTZCLENBQUE7SUFFN0IsNENBQWlCLENBQUE7QUFDbEIsQ0FBQyxFQWhCaUIsdUJBQXVCLEdBQXZCLCtCQUF1QixLQUF2QiwrQkFBdUIsUUFnQnhDO0FBRUQsYUFBYTtBQUNBLFFBQUEsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQ0FBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUE4QixDQUFDO0FBSTVJLE1BQWEsa0JBQW1CLFNBQVEsWUFBWTtJQUluRCxZQUFZLFFBQWtFLEVBQUUsUUFBNEIsRUFBRTtRQUU3RyxLQUFLLEVBQUUsQ0FBQztRQUpULHFCQUFnQixHQUFrQyxJQUFJLENBQUM7UUFNdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksT0FBTyxRQUFRLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksU0FBUyxFQUM3RDtZQUNDLFFBQVEsR0FBRyxrREFBMEIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBNkIsQ0FBQztRQUV0RCxJQUFJLENBQUMsRUFBRSx3QkFBaUMsVUFBVSxHQUFHO1lBRXBELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElB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QUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUV6QyxHQUFHLE9BQU87WUFFVixZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPO1NBQzNDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQW1CLGNBQTZCLE1BQU07UUFFN0QsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0Q7QUEvVEQsZ0RBK1RDO0FBWUQsa0JBQWUsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicmVnZXhwcDJcIjtcbmltcG9ydCByZWdleHBwID0gcmVxdWlyZSgncmVnZXhwcDInKTtcbmltcG9ydCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcbmltcG9ydCB7IGFycmF5X3VuaXF1ZSB9IGZyb20gJ2FycmF5LWh5cGVyLXVuaXF1ZSc7XG5cbmltcG9ydCBQYXJzZXIsIHtcblx0YXN0VG9TdHJpbmcsXG5cdGZha2VQYXR0ZXJuVG9SZWdFeHBMaXRlcmFsLFxuXHRwYXJzZUZsYWdzLFxuXHRwYXJzZVBhdHRlcm4sXG5cdElOb2RlUGx1cyxcblx0SUFzdFRvU3RyaW5nT3B0aW9ucyxcbn0gZnJvbSAncmVnZXhwLXBhcnNlci1saXRlcmFsJztcblxuaW1wb3J0IHsgQXBwZW5kYWJsZU5vZGUgfSBmcm9tICdyZWdleHBwMi9zcmMvcGFyc2VyJztcblxuZXhwb3J0IGNvbnN0IGVudW0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRcbntcblx0ZGVmYXVsdCA9ICdkZWZhdWx0Jyxcblx0Y2xhc3MgPSAnY2xhc3MnLFxuXG5cdG90aGVyID0gJ290aGVyJyxcblxuXHR1bmlzZXQgPSAndW5pc2V0JyxcblxuXHRjbGFzc19kZWZhdWx0ID0gJ2NsYXNzX2RlZmF1bHQnLFxuXHRjbGFzc19yYW5nZSA9ICdjbGFzc19yYW5nZScsXG5cdGNsYXNzX290aGVyID0gJ2NsYXNzX290aGVyJyxcblxuXHRjbGFzc191bmlzZXQgPSAnY2xhc3NfdW5pc2V0JyxcblxuXHRjaGFuZ2UgPSAnY2hhbmdlJyxcbn1cblxuLy8gQHRzLWlnbm9yZVxuZXhwb3J0IGNvbnN0IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50TGlzdCA9IE9iamVjdC5mcmVlemUoYXJyYXlfdW5pcXVlKE9iamVjdC52YWx1ZXMoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQpKSkgYXMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRbXTtcblxuZXhwb3J0IHR5cGUgSU5vZGVJbnB1dCA9IEFTVC5FbGVtZW50IHwgQVNULkNoYXJhY3RlckNsYXNzRWxlbWVudCB8IEFwcGVuZGFibGVOb2RlO1xuXG5leHBvcnQgY2xhc3MgUGFyc2VyRXZlbnRFbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyXG57XG5cdGFzdFJlZ0V4cExpdGVyYWw6IEFTVC5SZWdFeHBMaXRlcmFsICYgSU5vZGVQbHVzID0gbnVsbDtcblxuXHRjb25zdHJ1Y3RvcihpbnB1dEFzdDogcmVnZXhwcC5BU1QuUGF0dGVybiB8IHJlZ2V4cHAuQVNULlJlZ0V4cExpdGVyYWwgfCBzdHJpbmcsIGZsYWdzOiBzdHJpbmcgfCBBU1QuRmxhZ3MgPSAnJylcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdGlmICh0eXBlb2YgaW5wdXRBc3QgPT0gJ3N0cmluZycgfHwgaW5wdXRBc3QudHlwZSA9PSAnUGF0dGVybicpXG5cdFx0e1xuXHRcdFx0aW5wdXRBc3QgPSBmYWtlUGF0dGVyblRvUmVnRXhwTGl0ZXJhbChpbnB1dEFzdCwgZmxhZ3MpO1xuXHRcdH1cblxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbCA9IGlucHV0QXN0IGFzIEFTVC5SZWdFeHBMaXRlcmFsO1xuXG5cdFx0dGhpcy5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGZ1bmN0aW9uIChhc3QpXG5cdFx0e1xuXHRcdFx0c2VsZi5fY2hhbmdlKGFzdCwgdHJ1ZSk7XG5cdFx0XHRzZWxmLmNoYW5nZWQgPSB0cnVlO1xuXHRcdH0pO1xuXG4vL1x0XHRjb25zb2xlLmRpcih0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybi5lbGVtZW50cywge1xuLy9cdFx0XHRjb2xvcnM6IHRydWUsXG4vL1x0XHRcdGRlcHRoOiAzLFxuLy9cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKGlucHV0QXN0OiByZWdleHBwLkFTVC5QYXR0ZXJuIHwgcmVnZXhwcC5BU1QuUmVnRXhwTGl0ZXJhbCB8IHN0cmluZywgZmxhZ3M6IHN0cmluZyB8IEFTVC5GbGFncyA9ICcnKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzKGlucHV0QXN0LCBmbGFncyk7XG5cdH1cblxuXHRyZXN1bWUoKVxuXHR7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHQvKlxuXHRcdDAgJiYgY29uc29sZS5kaXIodGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4sIHtcblx0XHRcdGRlcHRoOiBudWxsLFxuXHRcdFx0Y29sb3JzOiB0cnVlLFxuXHRcdH0pO1xuXHRcdCovXG5cblx0XHRsZXQgcGF0dGVybiA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuO1xuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGxldCBlbGVtcyA9IHBhdHRlcm4uYWx0ZXJuYXRpdmVzIHx8IHBhdHRlcm4uZWxlbWVudHM7XG5cblx0XHRlbGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKVxuXHRcdHtcblx0XHRcdHNlbGYuX2xvb2t1cF9zdWIoaXRlbSwgc2VsZik7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGVtaXQ8VCBleHRlbmRzIElOb2RlSW5wdXQ+KGV2ZW50TmFtZTogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsXG5cdFx0aW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsXG5cdFx0Li4uYXJnc1xuXHQpOiBib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHN1cGVyLmVtaXQgYXMgSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyU3VwZXI8VCwgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+KShldmVudE5hbWUsIGlucHV0QXN0LCBldmVudE5hbWUsIHRoaXMsIC4uLmFyZ3MpO1xuXHR9XG5cblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmRlZmF1bHQ+KGV2ZW50TmFtZTogRSxcblx0XHRsaXN0ZW5lcjogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXIsIEU+LFxuXHQpOiB0aGlzXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzcz4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzLCBFPixcblx0KTogdGhpc1xuXHRvbjxFIGV4dGVuZHMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3NfZGVmYXVsdD4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlciwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX3JhbmdlPihldmVudE5hbWU6IEUsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyQ2xhc3NSYW5nZSwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Lm90aGVyPihldmVudE5hbWU6IEUsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyQ2xhc3NFbGVtZW50LCBFPixcblx0KTogdGhpc1xuXHRvbjxFIGV4dGVuZHMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+KGV2ZW50TmFtZTogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuRWxlbWVudCwgRT4sXG5cdCk6IHRoaXNcblx0b24oZXZlbnROYW1lOiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCwgbGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxhbnksIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Pik6IHRoaXNcblx0e1xuXHRcdHJldHVybiBzdXBlci5vbihldmVudE5hbWUsIGxpc3RlbmVyKTtcblx0fVxuXG5cdHByb3RlY3RlZCBfY2hhbmdlPFQgZXh0ZW5kcyBBU1QuTm9kZT4oYXN0OiBUICYgSU5vZGVQbHVzLCBpc0ZpcnN0PzogYm9vbGVhbilcblx0e1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0YXN0LmNoYW5nZWQgPSB0cnVlO1xuXG5cdFx0aWYgKGFzdC5wYXJlbnQpXG5cdFx0e1xuXHRcdFx0dGhpcy5fY2hhbmdlKGFzdC5wYXJlbnQpXG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIF9sb29rdXBfc3ViPFQgZXh0ZW5kcyBJTm9kZUlucHV0PihpbnB1dEFzdDogVCAmIElOb2RlUGx1cyxcblx0XHRteUVtaXR0ZXI6IFBhcnNlckV2ZW50RW1pdHRlcixcblx0XHRwYXJlbnQ/LFxuXHRcdGV2ZW50UHJlZml4OiBzdHJpbmcgPSAnJyxcblx0KVxuXHR7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRsZXQgZG9fZWxlbWVudHM6IGJvb2xlYW47XG5cdFx0bGV0IHN1Yl9lbGVtZW50czogYW55W107XG5cdFx0bGV0IHN1Yl9wcmVmaXg6IHN0cmluZyA9ICcnO1xuXHRcdGxldCBldmVudDogc3RyaW5nIHwga2V5b2YgdHlwZW9mIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50IHwgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ7XG5cblx0XHRzd2l0Y2ggKGlucHV0QXN0LnR5cGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyJzpcblx0XHRcdFx0ZXZlbnQgPSBldmVudFByZWZpeCArIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmRlZmF1bHQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdDaGFyYWN0ZXJDbGFzcyc6XG5cdFx0XHRcdGV2ZW50ID0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3M7XG5cblx0XHRcdFx0ZG9fZWxlbWVudHMgPSB0cnVlO1xuXHRcdFx0XHRzdWJfcHJlZml4ID0gJ2NsYXNzXyc7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdDaGFyYWN0ZXJDbGFzc1JhbmdlJzpcblx0XHRcdFx0ZXZlbnQgPSBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyU2V0Jzpcblx0XHRcdFx0ZXZlbnQgPSBldmVudFByZWZpeCArIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LnVuaXNldDtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnUXVhbnRpZmllcic6XG5cblx0XHRcdFx0ZG9fZWxlbWVudHMgPSB0cnVlO1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdHN1Yl9lbGVtZW50cyA9IFtpbnB1dEFzdC5lbGVtZW50XTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnQ2FwdHVyaW5nR3JvdXAnOlxuXHRcdFx0Y2FzZSAnR3JvdXAnOlxuXHRcdFx0Y2FzZSAnQXNzZXJ0aW9uJzpcblx0XHRcdFx0ZG9fZWxlbWVudHMgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0Y2FzZSAnQWx0ZXJuYXRpdmUnOlxuXG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0KGlucHV0QXN0IGFzIEFTVC5BbHRlcm5hdGl2ZSkuZWxlbWVudHNcblx0XHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbXMpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2VsZi5fbG9va3VwX3N1YihpdGVtcywgbXlFbWl0dGVyLCBpbnB1dEFzdCwgc3ViX3ByZWZpeCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdDtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0Y2FzZSAnRGlzanVuY3Rpb24nOlxuXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHQoaW5wdXRBc3QgYXMgQVNULkRpc2p1bmN0aW9uKS5hbHRlcm5hdGl2ZXNcblx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW1zKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzZWxmLl9sb29rdXBfc3ViKGl0ZW0sIG15RW1pdHRlciwgaW5wdXRBc3QsIHN1Yl9wcmVmaXgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KVxuXHRcdFx0O1xuXG5cdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRpZiAoZXZlbnRQcmVmaXggPT09ICdjbGFzc18nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXZlbnQgPSBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19vdGhlcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRldmVudCA9IGV2ZW50UHJlZml4ICsgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQub3RoZXI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRpZiAoZXZlbnQpXG5cdFx0e1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0bXlFbWl0dGVyLmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRbZXZlbnRdLCBpbnB1dEFzdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGRvX2VsZW1lbnRzICYmIHR5cGVvZiBzdWJfZWxlbWVudHMgPT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0c3ViX2VsZW1lbnRzID0gaW5wdXRBc3QuZWxlbWVudHM7XG5cblx0XHRcdGlmICh0eXBlb2Ygc3ViX2VsZW1lbnRzID09ICd1bmRlZmluZWQnKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdHN1Yl9lbGVtZW50cyA9IGlucHV0QXN0LmFsdGVybmF0aXZlcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIWlucHV0QXN0LnR5cGUpXG5cdFx0e1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhpbnB1dEFzdC50eXBlLCBzdWJfZWxlbWVudHMgJiYgc3ViX2VsZW1lbnRzLmxlbmd0aCwgaW5wdXRBc3QpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhpbnB1dEFzdC50eXBlLCBzdWJfZWxlbWVudHMgJiYgc3ViX2VsZW1lbnRzLmxlbmd0aCk7XG5cdFx0fVxuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGlmIChkb19lbGVtZW50cyAmJiBzdWJfZWxlbWVudHMpXG5cdFx0e1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0c3ViX2VsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pXG5cdFx0XHR7XG5cdFx0XHRcdHNlbGYuX2xvb2t1cF9zdWIoaXRlbSwgbXlFbWl0dGVyLCBpbnB1dEFzdCwgc3ViX3ByZWZpeCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRnZXRTb3VyY2Uob3ZlcndyaXRlPzogYm9vbGVhbiwgb3B0aW9ucz86IElBc3RUb1N0cmluZ09wdGlvbnMpOiBzdHJpbmdcblx0e1xuXHRcdHJldHVybiBhc3RUb1N0cmluZyh0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybiwge1xuXG5cdFx0XHQuLi5vcHRpb25zLFxuXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRkZWJ1Z0NoYW5nZWQ6IG92ZXJ3cml0ZSA/IDk5IDogdGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4uY2hhbmdlZCxcblx0XHR9KTtcblx0fVxuXG5cdGdldEZsYWdzKG92ZXJ3cml0ZT86IGJvb2xlYW4sIG9wdGlvbnM/OiBJQXN0VG9TdHJpbmdPcHRpb25zKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gYXN0VG9TdHJpbmcodGhpcy5hc3RSZWdFeHBMaXRlcmFsLmZsYWdzLCB7XG5cblx0XHRcdC4uLm9wdGlvbnMsXG5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGRlYnVnQ2hhbmdlZDogb3ZlcndyaXRlID8gOTkgOiB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuZmxhZ3MuY2hhbmdlZCxcblx0XHR9KTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0Z2V0IHNvdXJjZSgpOiBzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLmdldFNvdXJjZSgpO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRzZXQgc291cmNlKHBhdHRlcm46IHJlZ2V4cHAuQVNULlBhdHRlcm4gfCBzdHJpbmcpXG5cdHtcblx0XHRwYXR0ZXJuID0gdHlwZW9mIHBhdHRlcm4gPT0gJ3N0cmluZycgPyBwYXJzZVBhdHRlcm4ocGF0dGVybiwgdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmZsYWdzLnVuaWNvZGUpIDogcGF0dGVybjtcblxuXHRcdHBhdHRlcm4ucGFyZW50ID0gdGhpcy5hc3RSZWdFeHBMaXRlcmFsO1xuXG5cdFx0dGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4gPSBwYXR0ZXJuO1xuXG5cdFx0dGhpcy5jaGFuZ2VkID0gZmFsc2U7XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdGdldCBmbGFncygpOiBzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLmdldEZsYWdzKCk7XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdHNldCBmbGFncyhmbGFnczogc3RyaW5nIHwgQVNULkZsYWdzKVxuXHR7XG5cdFx0ZmxhZ3MgPSB0eXBlb2YgZmxhZ3MgPT0gJ3N0cmluZycgPyBwYXJzZUZsYWdzKGZsYWdzKSA6IGZsYWdzO1xuXG5cdFx0ZmxhZ3MucGFyZW50ID0gdGhpcy5hc3RSZWdFeHBMaXRlcmFsO1xuXG5cdFx0dGhpcy5hc3RSZWdFeHBMaXRlcmFsLmZsYWdzID0gZmxhZ3M7XG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0dGhpcy5jaGFuZ2VkID0gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4uY2hhbmdlZCB8fCBmYWxzZTtcblx0fVxuXG5cdGdldCBjaGFuZ2VkKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZFxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHR8fCB0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybi5jaGFuZ2VkXG5cdFx0fHwgdHlwZW9mIHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5jaGFuZ2VkID09ICdib29sZWFuJyA/IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5jaGFuZ2VkIDogbnVsbDtcblx0fVxuXG5cdHNldCBjaGFuZ2VkKGJvb2w6IGJvb2xlYW4pXG5cdHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0dGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4uY2hhbmdlZCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5jaGFuZ2VkID0gYm9vbDtcblx0fVxuXG5cdHRvU3RyaW5nKG92ZXJ3cml0ZT86IGJvb2xlYW4sIG9wdGlvbnM/OiBJQXN0VG9TdHJpbmdPcHRpb25zKVxuXHR7XG5cdFx0cmV0dXJuIGFzdFRvU3RyaW5nKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbCwge1xuXG5cdFx0XHQuLi5vcHRpb25zLFxuXG5cdFx0XHRkZWJ1Z0NoYW5nZWQ6IG92ZXJ3cml0ZSA/IDk5IDogdGhpcy5jaGFuZ2VkLFxuXHRcdH0pO1xuXHR9XG5cblx0dG9SZWdFeHA8VCBleHRlbmRzIFJlZ0V4cD4oUmVnRXhwQ2xhc3M6IHR5cGVvZiBSZWdFeHAgPSBSZWdFeHApXG5cdHtcblx0XHRyZXR1cm4gbmV3IFJlZ0V4cENsYXNzKHRoaXMuc291cmNlLCB0aGlzLmZsYWdzKTtcblx0fVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxUIGV4dGVuZHMgSU5vZGVJbnB1dCwgRSBleHRlbmRzIGtleW9mIHR5cGVvZiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudD5cbntcblx0KGlucHV0QXN0OiBUICYgSU5vZGVQbHVzLCBldmVudE5hbWU6IEUsIGVtaXR0ZXI6IFBhcnNlckV2ZW50RW1pdHRlciwgLi4uYXJndjogdW5rbm93bltdKVxufVxuXG5pbnRlcmZhY2UgSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyU3VwZXI8VCBleHRlbmRzIElOb2RlSW5wdXQsIEUgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+XG57XG5cdChldmVudDogRSwgaW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsIGV2ZW50TmFtZTogRSwgZW1pdHRlcjogUGFyc2VyRXZlbnRFbWl0dGVyLCAuLi5hcmd2OiB1bmtub3duW10pOiBib29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhcnNlckV2ZW50RW1pdHRlcjtcbiJdfQ==