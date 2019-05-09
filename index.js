"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
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
class ParserEventEmitter extends EventEmitter {
    constructor(inputAst, flags = '') {
        super();
        this.astRegExpLiteral = null;
        const self = this;
        if (typeof inputAst == 'string' || inputAst.type == 'Pattern') {
            inputAst = regexp_parser_literal_1.fakePatternToRegExpLiteral(inputAst, flags);
        }
        this.astRegExpLiteral = inputAst;
        this.on(ParserEventEmitterEvent.change, function (ast) {
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
        return super.emit(eventName, inputAst, ...args, eventName);
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
                event = eventPrefix + ParserEventEmitterEvent.default;
                break;
            case 'CharacterClass':
                event = ParserEventEmitterEvent.class;
                do_elements = true;
                sub_prefix = 'class_';
                break;
            case 'CharacterClassRange':
                event = ParserEventEmitterEvent.class_range;
                break;
            case 'CharacterSet':
                event = eventPrefix + ParserEventEmitterEvent.uniset;
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
                    event = ParserEventEmitterEvent.class_other;
                }
                else {
                    event = eventPrefix + ParserEventEmitterEvent.other;
                }
                break;
        }
        if (event) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVDQUF3QztBQUV4QyxpRUFPK0I7QUFJL0IsSUFBWSx1QkFnQlg7QUFoQkQsV0FBWSx1QkFBdUI7SUFFbEMsOENBQW1CLENBQUE7SUFDbkIsMENBQWUsQ0FBQTtJQUVmLDBDQUFlLENBQUE7SUFFZiw0Q0FBaUIsQ0FBQTtJQUVqQiwwREFBK0IsQ0FBQTtJQUMvQixzREFBMkIsQ0FBQTtJQUMzQixzREFBMkIsQ0FBQTtJQUUzQix3REFBNkIsQ0FBQTtJQUU3Qiw0Q0FBaUIsQ0FBQTtBQUNsQixDQUFDLEVBaEJXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBZ0JsQztBQUlELE1BQWEsa0JBQW1CLFNBQVEsWUFBWTtJQUluRCxZQUFZLFFBQWtFLEVBQUUsUUFBNEIsRUFBRTtRQUU3RyxLQUFLLEVBQUUsQ0FBQztRQUpULHFCQUFnQixHQUFrQyxJQUFJLENBQUM7UUFNdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksT0FBTyxRQUFRLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksU0FBUyxFQUM3RDtZQUNDLFFBQVEsR0FBRyxrREFBMEIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBNkIsQ0FBQztRQUV0RCxJQUFJLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxVQUFVLEdBQUc7WUFFcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFFTCx5REFBeUQ7UUFDekQsa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZCxPQUFPO0lBQ04sQ0FBQztJQUVE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WUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTztTQUMzQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUFtQixjQUE2QixNQUFNO1FBRTdELE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNEO0FBOVRELGdEQThUQztBQU9ELGtCQUFlLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInJlZ2V4cHAyXCI7XG5pbXBvcnQgcmVnZXhwcCA9IHJlcXVpcmUoJ3JlZ2V4cHAyJyk7XG5pbXBvcnQgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5cbmltcG9ydCBQYXJzZXIsIHtcblx0YXN0VG9TdHJpbmcsXG5cdGZha2VQYXR0ZXJuVG9SZWdFeHBMaXRlcmFsLFxuXHRwYXJzZUZsYWdzLFxuXHRwYXJzZVBhdHRlcm4sXG5cdElOb2RlUGx1cyxcblx0SUFzdFRvU3RyaW5nT3B0aW9ucyxcbn0gZnJvbSAncmVnZXhwLXBhcnNlci1saXRlcmFsJztcblxuaW1wb3J0IHsgQXBwZW5kYWJsZU5vZGUgfSBmcm9tICdyZWdleHBwMi9zcmMvcGFyc2VyJztcblxuZXhwb3J0IGVudW0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRcbntcblx0ZGVmYXVsdCA9ICdkZWZhdWx0Jyxcblx0Y2xhc3MgPSAnY2xhc3MnLFxuXG5cdG90aGVyID0gJ290aGVyJyxcblxuXHR1bmlzZXQgPSAndW5pc2V0JyxcblxuXHRjbGFzc19kZWZhdWx0ID0gJ2NsYXNzX2RlZmF1bHQnLFxuXHRjbGFzc19yYW5nZSA9ICdjbGFzc19yYW5nZScsXG5cdGNsYXNzX290aGVyID0gJ2NsYXNzX290aGVyJyxcblxuXHRjbGFzc191bmlzZXQgPSAnY2xhc3NfdW5pc2V0JyxcblxuXHRjaGFuZ2UgPSAnY2hhbmdlJyxcbn1cblxudHlwZSBJTm9kZUlucHV0ID0gQVNULkVsZW1lbnQgfCBBU1QuQ2hhcmFjdGVyQ2xhc3NFbGVtZW50IHwgQXBwZW5kYWJsZU5vZGU7XG5cbmV4cG9ydCBjbGFzcyBQYXJzZXJFdmVudEVtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbntcblx0YXN0UmVnRXhwTGl0ZXJhbDogQVNULlJlZ0V4cExpdGVyYWwgJiBJTm9kZVBsdXMgPSBudWxsO1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0QXN0OiByZWdleHBwLkFTVC5QYXR0ZXJuIHwgcmVnZXhwcC5BU1QuUmVnRXhwTGl0ZXJhbCB8IHN0cmluZywgZmxhZ3M6IHN0cmluZyB8IEFTVC5GbGFncyA9ICcnKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0aWYgKHR5cGVvZiBpbnB1dEFzdCA9PSAnc3RyaW5nJyB8fCBpbnB1dEFzdC50eXBlID09ICdQYXR0ZXJuJylcblx0XHR7XG5cdFx0XHRpbnB1dEFzdCA9IGZha2VQYXR0ZXJuVG9SZWdFeHBMaXRlcmFsKGlucHV0QXN0LCBmbGFncyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hc3RSZWdFeHBMaXRlcmFsID0gaW5wdXRBc3QgYXMgQVNULlJlZ0V4cExpdGVyYWw7XG5cblx0XHR0aGlzLm9uKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgZnVuY3Rpb24gKGFzdClcblx0XHR7XG5cdFx0XHRzZWxmLl9jaGFuZ2UoYXN0LCB0cnVlKTtcblx0XHRcdHNlbGYuY2hhbmdlZCA9IHRydWU7XG5cdFx0fSk7XG5cbi8vXHRcdGNvbnNvbGUuZGlyKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmVsZW1lbnRzLCB7XG4vL1x0XHRcdGNvbG9yczogdHJ1ZSxcbi8vXHRcdFx0ZGVwdGg6IDMsXG4vL1x0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBjcmVhdGUoaW5wdXRBc3Q6IHJlZ2V4cHAuQVNULlBhdHRlcm4gfCByZWdleHBwLkFTVC5SZWdFeHBMaXRlcmFsIHwgc3RyaW5nLCBmbGFnczogc3RyaW5nIHwgQVNULkZsYWdzID0gJycpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXMoaW5wdXRBc3QsIGZsYWdzKTtcblx0fVxuXG5cdHJlc3VtZSgpXG5cdHtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdC8qXG5cdFx0MCAmJiBjb25zb2xlLmRpcih0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybiwge1xuXHRcdFx0ZGVwdGg6IG51bGwsXG5cdFx0XHRjb2xvcnM6IHRydWUsXG5cdFx0fSk7XG5cdFx0Ki9cblxuXHRcdGxldCBwYXR0ZXJuID0gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm47XG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0bGV0IGVsZW1zID0gcGF0dGVybi5hbHRlcm5hdGl2ZXMgfHwgcGF0dGVybi5lbGVtZW50cztcblxuXHRcdGVsZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pXG5cdFx0e1xuXHRcdFx0c2VsZi5fbG9va3VwX3N1YihpdGVtLCBzZWxmKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0ZW1pdDxUIGV4dGVuZHMgSU5vZGVJbnB1dD4oZXZlbnROYW1lOiBrZXlvZiB0eXBlb2YgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsXG5cdFx0aW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsXG5cdFx0Li4uYXJnc1xuXHQpOiBib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIuZW1pdChldmVudE5hbWUsIGlucHV0QXN0LCAuLi5hcmdzLCBldmVudE5hbWUpO1xuXHR9XG5cblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmRlZmF1bHQ+KGV2ZW50TmFtZTogRSxcblx0XHRsaXN0ZW5lcjogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXIsIEU+LFxuXHQpOiB0aGlzXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzcz4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzLCBFPixcblx0KTogdGhpc1xuXHRvbjxFIGV4dGVuZHMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3NfZGVmYXVsdD4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlciwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX3JhbmdlPihldmVudE5hbWU6IEUsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyQ2xhc3NSYW5nZSwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Lm90aGVyPihldmVudE5hbWU6IEUsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyQ2xhc3NFbGVtZW50LCBFPixcblx0KTogdGhpc1xuXHRvbjxFIGV4dGVuZHMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+KGV2ZW50TmFtZTogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuRWxlbWVudCwgRT4sXG5cdCk6IHRoaXNcblx0b24oZXZlbnROYW1lOiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCwgbGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxhbnksIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Pik6IHRoaXNcblx0e1xuXHRcdHJldHVybiBzdXBlci5vbihldmVudE5hbWUsIGxpc3RlbmVyKTtcblx0fVxuXG5cdHByb3RlY3RlZCBfY2hhbmdlPFQgZXh0ZW5kcyBBU1QuTm9kZT4oYXN0OiBUICYgSU5vZGVQbHVzLCBpc0ZpcnN0PzogYm9vbGVhbilcblx0e1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0YXN0LmNoYW5nZWQgPSB0cnVlO1xuXG5cdFx0aWYgKGFzdC5wYXJlbnQpXG5cdFx0e1xuXHRcdFx0dGhpcy5fY2hhbmdlKGFzdC5wYXJlbnQpXG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIF9sb29rdXBfc3ViPFQgZXh0ZW5kcyBJTm9kZUlucHV0PihpbnB1dEFzdDogVCAmIElOb2RlUGx1cyxcblx0XHRteUVtaXR0ZXI6IFBhcnNlckV2ZW50RW1pdHRlcixcblx0XHRwYXJlbnQ/LFxuXHRcdGV2ZW50UHJlZml4OiBzdHJpbmcgPSAnJyxcblx0KVxuXHR7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRsZXQgZG9fZWxlbWVudHM6IGJvb2xlYW47XG5cdFx0bGV0IHN1Yl9lbGVtZW50czogYW55W107XG5cdFx0bGV0IHN1Yl9wcmVmaXg6IHN0cmluZyA9ICcnO1xuXHRcdGxldCBldmVudDogc3RyaW5nO1xuXG5cdFx0c3dpdGNoIChpbnB1dEFzdC50eXBlKVxuXHRcdHtcblx0XHRcdGNhc2UgJ0NoYXJhY3Rlcic6XG5cdFx0XHRcdGV2ZW50ID0gZXZlbnRQcmVmaXggKyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0O1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyQ2xhc3MnOlxuXHRcdFx0XHRldmVudCA9IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzO1xuXG5cdFx0XHRcdGRvX2VsZW1lbnRzID0gdHJ1ZTtcblx0XHRcdFx0c3ViX3ByZWZpeCA9ICdjbGFzc18nO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyQ2xhc3NSYW5nZSc6XG5cdFx0XHRcdGV2ZW50ID0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3NfcmFuZ2U7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ0NoYXJhY3RlclNldCc6XG5cdFx0XHRcdGV2ZW50ID0gZXZlbnRQcmVmaXggKyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC51bmlzZXQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ1F1YW50aWZpZXInOlxuXG5cdFx0XHRcdGRvX2VsZW1lbnRzID0gdHJ1ZTtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRzdWJfZWxlbWVudHMgPSBbaW5wdXRBc3QuZWxlbWVudF07XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ0NhcHR1cmluZ0dyb3VwJzpcblx0XHRcdGNhc2UgJ0dyb3VwJzpcblx0XHRcdGNhc2UgJ0Fzc2VydGlvbic6XG5cdFx0XHRcdGRvX2VsZW1lbnRzID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGNhc2UgJ0FsdGVybmF0aXZlJzpcblxuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdChpbnB1dEFzdCBhcyBBU1QuQWx0ZXJuYXRpdmUpLmVsZW1lbnRzXG5cdFx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW1zKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNlbGYuX2xvb2t1cF9zdWIoaXRlbXMsIG15RW1pdHRlciwgaW5wdXRBc3QsIHN1Yl9wcmVmaXgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGNhc2UgJ0Rpc2p1bmN0aW9uJzpcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0KGlucHV0QXN0IGFzIEFTVC5EaXNqdW5jdGlvbikuYWx0ZXJuYXRpdmVzXG5cdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtcylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2VsZi5fbG9va3VwX3N1YihpdGVtLCBteUVtaXR0ZXIsIGlucHV0QXN0LCBzdWJfcHJlZml4KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSlcblx0XHRcdDtcblxuXHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0aWYgKGV2ZW50UHJlZml4ID09PSAnY2xhc3NfJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV2ZW50ID0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3Nfb3RoZXI7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXZlbnQgPSBldmVudFByZWZpeCArIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Lm90aGVyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50KVxuXHRcdHtcblx0XHRcdG15RW1pdHRlci5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50W2V2ZW50XSwgaW5wdXRBc3QpO1xuXHRcdH1cblxuXHRcdGlmIChkb19lbGVtZW50cyAmJiB0eXBlb2Ygc3ViX2VsZW1lbnRzID09ICd1bmRlZmluZWQnKVxuXHRcdHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHN1Yl9lbGVtZW50cyA9IGlucHV0QXN0LmVsZW1lbnRzO1xuXG5cdFx0XHRpZiAodHlwZW9mIHN1Yl9lbGVtZW50cyA9PSAndW5kZWZpbmVkJylcblx0XHRcdHtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRzdWJfZWxlbWVudHMgPSBpbnB1dEFzdC5hbHRlcm5hdGl2ZXM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFpbnB1dEFzdC50eXBlKVxuXHRcdHtcblx0XHRcdC8vY29uc29sZS5sb2coaW5wdXRBc3QudHlwZSwgc3ViX2VsZW1lbnRzICYmIHN1Yl9lbGVtZW50cy5sZW5ndGgsIGlucHV0QXN0KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vY29uc29sZS5sb2coaW5wdXRBc3QudHlwZSwgc3ViX2VsZW1lbnRzICYmIHN1Yl9lbGVtZW50cy5sZW5ndGgpO1xuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRpZiAoZG9fZWxlbWVudHMgJiYgc3ViX2VsZW1lbnRzKVxuXHRcdHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHN1Yl9lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRzZWxmLl9sb29rdXBfc3ViKGl0ZW0sIG15RW1pdHRlciwgaW5wdXRBc3QsIHN1Yl9wcmVmaXgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0U291cmNlKG92ZXJ3cml0ZT86IGJvb2xlYW4sIG9wdGlvbnM/OiBJQXN0VG9TdHJpbmdPcHRpb25zKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gYXN0VG9TdHJpbmcodGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4sIHtcblxuXHRcdFx0Li4ub3B0aW9ucyxcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0ZGVidWdDaGFuZ2VkOiBvdmVyd3JpdGUgPyA5OSA6IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWQsXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRGbGFncyhvdmVyd3JpdGU/OiBib29sZWFuLCBvcHRpb25zPzogSUFzdFRvU3RyaW5nT3B0aW9ucyk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIGFzdFRvU3RyaW5nKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncywge1xuXG5cdFx0XHQuLi5vcHRpb25zLFxuXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRkZWJ1Z0NoYW5nZWQ6IG92ZXJ3cml0ZSA/IDk5IDogdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmZsYWdzLmNoYW5nZWQsXG5cdFx0fSk7XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdGdldCBzb3VyY2UoKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5nZXRTb3VyY2UoKTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0c2V0IHNvdXJjZShwYXR0ZXJuOiByZWdleHBwLkFTVC5QYXR0ZXJuIHwgc3RyaW5nKVxuXHR7XG5cdFx0cGF0dGVybiA9IHR5cGVvZiBwYXR0ZXJuID09ICdzdHJpbmcnID8gcGFyc2VQYXR0ZXJuKHBhdHRlcm4sIHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncy51bmljb2RlKSA6IHBhdHRlcm47XG5cblx0XHRwYXR0ZXJuLnBhcmVudCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbDtcblxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuID0gcGF0dGVybjtcblxuXHRcdHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRnZXQgZmxhZ3MoKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5nZXRGbGFncygpO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRzZXQgZmxhZ3MoZmxhZ3M6IHN0cmluZyB8IEFTVC5GbGFncylcblx0e1xuXHRcdGZsYWdzID0gdHlwZW9mIGZsYWdzID09ICdzdHJpbmcnID8gcGFyc2VGbGFncyhmbGFncykgOiBmbGFncztcblxuXHRcdGZsYWdzLnBhcmVudCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbDtcblxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncyA9IGZsYWdzO1xuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHRoaXMuY2hhbmdlZCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWQgfHwgZmFsc2U7XG5cdH1cblxuXHRnZXQgY2hhbmdlZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmNoYW5nZWRcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0fHwgdGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4uY2hhbmdlZFxuXHRcdHx8IHR5cGVvZiB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZCA9PSAnYm9vbGVhbicgPyB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZCA6IG51bGw7XG5cdH1cblxuXHRzZXQgY2hhbmdlZChib29sOiBib29sZWFuKVxuXHR7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWQgPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZCA9IGJvb2w7XG5cdH1cblxuXHR0b1N0cmluZyhvdmVyd3JpdGU/OiBib29sZWFuLCBvcHRpb25zPzogSUFzdFRvU3RyaW5nT3B0aW9ucylcblx0e1xuXHRcdHJldHVybiBhc3RUb1N0cmluZyh0aGlzLmFzdFJlZ0V4cExpdGVyYWwsIHtcblxuXHRcdFx0Li4ub3B0aW9ucyxcblxuXHRcdFx0ZGVidWdDaGFuZ2VkOiBvdmVyd3JpdGUgPyA5OSA6IHRoaXMuY2hhbmdlZCxcblx0XHR9KTtcblx0fVxuXG5cdHRvUmVnRXhwPFQgZXh0ZW5kcyBSZWdFeHA+KFJlZ0V4cENsYXNzOiB0eXBlb2YgUmVnRXhwID0gUmVnRXhwKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHBDbGFzcyh0aGlzLnNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8VCBleHRlbmRzIElOb2RlSW5wdXQsIEUgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+XG57XG5cdChpbnB1dEFzdDogVCAmIElOb2RlUGx1cywgZXZlbnROYW1lOiBFKVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJzZXJFdmVudEVtaXR0ZXI7XG4iXX0=