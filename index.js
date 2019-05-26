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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVDQUF3QztBQUV4QyxpRUFPK0I7QUFJL0IsSUFBWSx1QkFnQlg7QUFoQkQsV0FBWSx1QkFBdUI7SUFFbEMsOENBQW1CLENBQUE7SUFDbkIsMENBQWUsQ0FBQTtJQUVmLDBDQUFlLENBQUE7SUFFZiw0Q0FBaUIsQ0FBQTtJQUVqQiwwREFBK0IsQ0FBQTtJQUMvQixzREFBMkIsQ0FBQTtJQUMzQixzREFBMkIsQ0FBQTtJQUUzQix3REFBNkIsQ0FBQTtJQUU3Qiw0Q0FBaUIsQ0FBQTtBQUNsQixDQUFDLEVBaEJXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBZ0JsQztBQUlELE1BQWEsa0JBQW1CLFNBQVEsWUFBWTtJQUluRCxZQUFZLFFBQWtFLEVBQUUsUUFBNEIsRUFBRTtRQUU3RyxLQUFLLEVBQUUsQ0FBQztRQUpULHFCQUFnQixHQUFrQyxJQUFJLENBQUM7UUFNdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksT0FBTyxRQUFRLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksU0FBUyxFQUM3RDtZQUNDLFFBQVEsR0FBRyxrREFBMEIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBNkIsQ0FBQztRQUV0RCxJQUFJLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxVQUFVLEdBQUc7WUFFcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFFTCx5REFBeUQ7UUFDekQsa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZCxPQUFPO0lBQ04sQ0FBQztJQUVE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WUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTztTQUMzQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUFtQixjQUE2QixNQUFNO1FBRTdELE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNEO0FBOVRELGdEQThUQztBQU9ELGtCQUFlLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInJlZ2V4cHAyXCI7XG5pbXBvcnQgcmVnZXhwcCA9IHJlcXVpcmUoJ3JlZ2V4cHAyJyk7XG5pbXBvcnQgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5cbmltcG9ydCBQYXJzZXIsIHtcblx0YXN0VG9TdHJpbmcsXG5cdGZha2VQYXR0ZXJuVG9SZWdFeHBMaXRlcmFsLFxuXHRwYXJzZUZsYWdzLFxuXHRwYXJzZVBhdHRlcm4sXG5cdElOb2RlUGx1cyxcblx0SUFzdFRvU3RyaW5nT3B0aW9ucyxcbn0gZnJvbSAncmVnZXhwLXBhcnNlci1saXRlcmFsJztcblxuaW1wb3J0IHsgQXBwZW5kYWJsZU5vZGUgfSBmcm9tICdyZWdleHBwMi9zcmMvcGFyc2VyJztcblxuZXhwb3J0IGVudW0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRcbntcblx0ZGVmYXVsdCA9ICdkZWZhdWx0Jyxcblx0Y2xhc3MgPSAnY2xhc3MnLFxuXG5cdG90aGVyID0gJ290aGVyJyxcblxuXHR1bmlzZXQgPSAndW5pc2V0JyxcblxuXHRjbGFzc19kZWZhdWx0ID0gJ2NsYXNzX2RlZmF1bHQnLFxuXHRjbGFzc19yYW5nZSA9ICdjbGFzc19yYW5nZScsXG5cdGNsYXNzX290aGVyID0gJ2NsYXNzX290aGVyJyxcblxuXHRjbGFzc191bmlzZXQgPSAnY2xhc3NfdW5pc2V0JyxcblxuXHRjaGFuZ2UgPSAnY2hhbmdlJyxcbn1cblxuZXhwb3J0IHR5cGUgSU5vZGVJbnB1dCA9IEFTVC5FbGVtZW50IHwgQVNULkNoYXJhY3RlckNsYXNzRWxlbWVudCB8IEFwcGVuZGFibGVOb2RlO1xuXG5leHBvcnQgY2xhc3MgUGFyc2VyRXZlbnRFbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyXG57XG5cdGFzdFJlZ0V4cExpdGVyYWw6IEFTVC5SZWdFeHBMaXRlcmFsICYgSU5vZGVQbHVzID0gbnVsbDtcblxuXHRjb25zdHJ1Y3RvcihpbnB1dEFzdDogcmVnZXhwcC5BU1QuUGF0dGVybiB8IHJlZ2V4cHAuQVNULlJlZ0V4cExpdGVyYWwgfCBzdHJpbmcsIGZsYWdzOiBzdHJpbmcgfCBBU1QuRmxhZ3MgPSAnJylcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdGlmICh0eXBlb2YgaW5wdXRBc3QgPT0gJ3N0cmluZycgfHwgaW5wdXRBc3QudHlwZSA9PSAnUGF0dGVybicpXG5cdFx0e1xuXHRcdFx0aW5wdXRBc3QgPSBmYWtlUGF0dGVyblRvUmVnRXhwTGl0ZXJhbChpbnB1dEFzdCwgZmxhZ3MpO1xuXHRcdH1cblxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbCA9IGlucHV0QXN0IGFzIEFTVC5SZWdFeHBMaXRlcmFsO1xuXG5cdFx0dGhpcy5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGZ1bmN0aW9uIChhc3QpXG5cdFx0e1xuXHRcdFx0c2VsZi5fY2hhbmdlKGFzdCwgdHJ1ZSk7XG5cdFx0XHRzZWxmLmNoYW5nZWQgPSB0cnVlO1xuXHRcdH0pO1xuXG4vL1x0XHRjb25zb2xlLmRpcih0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybi5lbGVtZW50cywge1xuLy9cdFx0XHRjb2xvcnM6IHRydWUsXG4vL1x0XHRcdGRlcHRoOiAzLFxuLy9cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKGlucHV0QXN0OiByZWdleHBwLkFTVC5QYXR0ZXJuIHwgcmVnZXhwcC5BU1QuUmVnRXhwTGl0ZXJhbCB8IHN0cmluZywgZmxhZ3M6IHN0cmluZyB8IEFTVC5GbGFncyA9ICcnKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzKGlucHV0QXN0LCBmbGFncyk7XG5cdH1cblxuXHRyZXN1bWUoKVxuXHR7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHQvKlxuXHRcdDAgJiYgY29uc29sZS5kaXIodGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4sIHtcblx0XHRcdGRlcHRoOiBudWxsLFxuXHRcdFx0Y29sb3JzOiB0cnVlLFxuXHRcdH0pO1xuXHRcdCovXG5cblx0XHRsZXQgcGF0dGVybiA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuO1xuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGxldCBlbGVtcyA9IHBhdHRlcm4uYWx0ZXJuYXRpdmVzIHx8IHBhdHRlcm4uZWxlbWVudHM7XG5cblx0XHRlbGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKVxuXHRcdHtcblx0XHRcdHNlbGYuX2xvb2t1cF9zdWIoaXRlbSwgc2VsZik7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGVtaXQ8VCBleHRlbmRzIElOb2RlSW5wdXQ+KGV2ZW50TmFtZToga2V5b2YgdHlwZW9mIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LFxuXHRcdGlucHV0QXN0OiBUICYgSU5vZGVQbHVzLFxuXHRcdC4uLmFyZ3Ncblx0KTogYm9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHN1cGVyLmVtaXQoZXZlbnROYW1lLCBpbnB1dEFzdCwgLi4uYXJncywgZXZlbnROYW1lKTtcblx0fVxuXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0PihldmVudE5hbWU6IEUsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyLCBFPixcblx0KTogdGhpc1xuXHRvbjxFIGV4dGVuZHMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3M+KGV2ZW50TmFtZTogRSxcblx0XHRsaXN0ZW5lcjogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXJDbGFzcywgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX2RlZmF1bHQ+KGV2ZW50TmFtZTogRSxcblx0XHRsaXN0ZW5lcjogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXIsIEU+LFxuXHQpOiB0aGlzXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZT4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzUmFuZ2UsIEU+LFxuXHQpOiB0aGlzXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5vdGhlcj4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzRWxlbWVudCwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50PihldmVudE5hbWU6IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkVsZW1lbnQsIEU+LFxuXHQpOiB0aGlzXG5cdG9uKGV2ZW50TmFtZTogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsIGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8YW55LCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudD4pOiB0aGlzXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIub24oZXZlbnROYW1lLCBsaXN0ZW5lcik7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX2NoYW5nZTxUIGV4dGVuZHMgQVNULk5vZGU+KGFzdDogVCAmIElOb2RlUGx1cywgaXNGaXJzdD86IGJvb2xlYW4pXG5cdHtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdGFzdC5jaGFuZ2VkID0gdHJ1ZTtcblxuXHRcdGlmIChhc3QucGFyZW50KVxuXHRcdHtcblx0XHRcdHRoaXMuX2NoYW5nZShhc3QucGFyZW50KVxuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBfbG9va3VwX3N1YjxUIGV4dGVuZHMgSU5vZGVJbnB1dD4oaW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsXG5cdFx0bXlFbWl0dGVyOiBQYXJzZXJFdmVudEVtaXR0ZXIsXG5cdFx0cGFyZW50Pyxcblx0XHRldmVudFByZWZpeDogc3RyaW5nID0gJycsXG5cdClcblx0e1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0bGV0IGRvX2VsZW1lbnRzOiBib29sZWFuO1xuXHRcdGxldCBzdWJfZWxlbWVudHM6IGFueVtdO1xuXHRcdGxldCBzdWJfcHJlZml4OiBzdHJpbmcgPSAnJztcblx0XHRsZXQgZXZlbnQ6IHN0cmluZztcblxuXHRcdHN3aXRjaCAoaW5wdXRBc3QudHlwZSlcblx0XHR7XG5cdFx0XHRjYXNlICdDaGFyYWN0ZXInOlxuXHRcdFx0XHRldmVudCA9IGV2ZW50UHJlZml4ICsgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuZGVmYXVsdDtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ0NoYXJhY3RlckNsYXNzJzpcblx0XHRcdFx0ZXZlbnQgPSBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzcztcblxuXHRcdFx0XHRkb19lbGVtZW50cyA9IHRydWU7XG5cdFx0XHRcdHN1Yl9wcmVmaXggPSAnY2xhc3NfJztcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ0NoYXJhY3RlckNsYXNzUmFuZ2UnOlxuXHRcdFx0XHRldmVudCA9IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX3JhbmdlO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdDaGFyYWN0ZXJTZXQnOlxuXHRcdFx0XHRldmVudCA9IGV2ZW50UHJlZml4ICsgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQudW5pc2V0O1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdRdWFudGlmaWVyJzpcblxuXHRcdFx0XHRkb19lbGVtZW50cyA9IHRydWU7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0c3ViX2VsZW1lbnRzID0gW2lucHV0QXN0LmVsZW1lbnRdO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdDYXB0dXJpbmdHcm91cCc6XG5cdFx0XHRjYXNlICdHcm91cCc6XG5cdFx0XHRjYXNlICdBc3NlcnRpb24nOlxuXHRcdFx0XHRkb19lbGVtZW50cyA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRjYXNlICdBbHRlcm5hdGl2ZSc6XG5cblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHQoaW5wdXRBc3QgYXMgQVNULkFsdGVybmF0aXZlKS5lbGVtZW50c1xuXHRcdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtcylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzZWxmLl9sb29rdXBfc3ViKGl0ZW1zLCBteUVtaXR0ZXIsIGlucHV0QXN0LCBzdWJfcHJlZml4KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0O1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRjYXNlICdEaXNqdW5jdGlvbic6XG5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdChpbnB1dEFzdCBhcyBBU1QuRGlzanVuY3Rpb24pLmFsdGVybmF0aXZlc1xuXHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbXMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNlbGYuX2xvb2t1cF9zdWIoaXRlbSwgbXlFbWl0dGVyLCBpbnB1dEFzdCwgc3ViX3ByZWZpeCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pXG5cdFx0XHQ7XG5cblx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdGlmIChldmVudFByZWZpeCA9PT0gJ2NsYXNzXycpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRldmVudCA9IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX290aGVyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV2ZW50ID0gZXZlbnRQcmVmaXggKyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5vdGhlcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGlmIChldmVudClcblx0XHR7XG5cdFx0XHRteUVtaXR0ZXIuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudFtldmVudF0sIGlucHV0QXN0KTtcblx0XHR9XG5cblx0XHRpZiAoZG9fZWxlbWVudHMgJiYgdHlwZW9mIHN1Yl9lbGVtZW50cyA9PSAndW5kZWZpbmVkJylcblx0XHR7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRzdWJfZWxlbWVudHMgPSBpbnB1dEFzdC5lbGVtZW50cztcblxuXHRcdFx0aWYgKHR5cGVvZiBzdWJfZWxlbWVudHMgPT0gJ3VuZGVmaW5lZCcpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0c3ViX2VsZW1lbnRzID0gaW5wdXRBc3QuYWx0ZXJuYXRpdmVzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghaW5wdXRBc3QudHlwZSlcblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGlucHV0QXN0LnR5cGUsIHN1Yl9lbGVtZW50cyAmJiBzdWJfZWxlbWVudHMubGVuZ3RoLCBpbnB1dEFzdCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGlucHV0QXN0LnR5cGUsIHN1Yl9lbGVtZW50cyAmJiBzdWJfZWxlbWVudHMubGVuZ3RoKTtcblx0XHR9XG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0aWYgKGRvX2VsZW1lbnRzICYmIHN1Yl9lbGVtZW50cylcblx0XHR7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRzdWJfZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSlcblx0XHRcdHtcblx0XHRcdFx0c2VsZi5fbG9va3VwX3N1YihpdGVtLCBteUVtaXR0ZXIsIGlucHV0QXN0LCBzdWJfcHJlZml4KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGdldFNvdXJjZShvdmVyd3JpdGU/OiBib29sZWFuLCBvcHRpb25zPzogSUFzdFRvU3RyaW5nT3B0aW9ucyk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIGFzdFRvU3RyaW5nKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLCB7XG5cblx0XHRcdC4uLm9wdGlvbnMsXG5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGRlYnVnQ2hhbmdlZDogb3ZlcndyaXRlID8gOTkgOiB0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybi5jaGFuZ2VkLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0RmxhZ3Mob3ZlcndyaXRlPzogYm9vbGVhbiwgb3B0aW9ucz86IElBc3RUb1N0cmluZ09wdGlvbnMpOiBzdHJpbmdcblx0e1xuXHRcdHJldHVybiBhc3RUb1N0cmluZyh0aGlzLmFzdFJlZ0V4cExpdGVyYWwuZmxhZ3MsIHtcblxuXHRcdFx0Li4ub3B0aW9ucyxcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0ZGVidWdDaGFuZ2VkOiBvdmVyd3JpdGUgPyA5OSA6IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncy5jaGFuZ2VkLFxuXHRcdH0pO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRnZXQgc291cmNlKCk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0U291cmNlKCk7XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdHNldCBzb3VyY2UocGF0dGVybjogcmVnZXhwcC5BU1QuUGF0dGVybiB8IHN0cmluZylcblx0e1xuXHRcdHBhdHRlcm4gPSB0eXBlb2YgcGF0dGVybiA9PSAnc3RyaW5nJyA/IHBhcnNlUGF0dGVybihwYXR0ZXJuLCB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuZmxhZ3MudW5pY29kZSkgOiBwYXR0ZXJuO1xuXG5cdFx0cGF0dGVybi5wYXJlbnQgPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWw7XG5cblx0XHR0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybiA9IHBhdHRlcm47XG5cblx0XHR0aGlzLmNoYW5nZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0Z2V0IGZsYWdzKCk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RmxhZ3MoKTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0c2V0IGZsYWdzKGZsYWdzOiBzdHJpbmcgfCBBU1QuRmxhZ3MpXG5cdHtcblx0XHRmbGFncyA9IHR5cGVvZiBmbGFncyA9PSAnc3RyaW5nJyA/IHBhcnNlRmxhZ3MoZmxhZ3MpIDogZmxhZ3M7XG5cblx0XHRmbGFncy5wYXJlbnQgPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWw7XG5cblx0XHR0aGlzLmFzdFJlZ0V4cExpdGVyYWwuZmxhZ3MgPSBmbGFncztcblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHR0aGlzLmNoYW5nZWQgPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybi5jaGFuZ2VkIHx8IGZhbHNlO1xuXHR9XG5cblx0Z2V0IGNoYW5nZWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5jaGFuZ2VkXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHx8IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWRcblx0XHR8fCB0eXBlb2YgdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmNoYW5nZWQgPT0gJ2Jvb2xlYW4nID8gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmNoYW5nZWQgOiBudWxsO1xuXHR9XG5cblx0c2V0IGNoYW5nZWQoYm9vbDogYm9vbGVhbilcblx0e1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHR0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybi5jaGFuZ2VkID0gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmNoYW5nZWQgPSBib29sO1xuXHR9XG5cblx0dG9TdHJpbmcob3ZlcndyaXRlPzogYm9vbGVhbiwgb3B0aW9ucz86IElBc3RUb1N0cmluZ09wdGlvbnMpXG5cdHtcblx0XHRyZXR1cm4gYXN0VG9TdHJpbmcodGhpcy5hc3RSZWdFeHBMaXRlcmFsLCB7XG5cblx0XHRcdC4uLm9wdGlvbnMsXG5cblx0XHRcdGRlYnVnQ2hhbmdlZDogb3ZlcndyaXRlID8gOTkgOiB0aGlzLmNoYW5nZWQsXG5cdFx0fSk7XG5cdH1cblxuXHR0b1JlZ0V4cDxUIGV4dGVuZHMgUmVnRXhwPihSZWdFeHBDbGFzczogdHlwZW9mIFJlZ0V4cCA9IFJlZ0V4cClcblx0e1xuXHRcdHJldHVybiBuZXcgUmVnRXhwQ2xhc3ModGhpcy5zb3VyY2UsIHRoaXMuZmxhZ3MpO1xuXHR9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPFQgZXh0ZW5kcyBJTm9kZUlucHV0LCBFIGV4dGVuZHMga2V5b2YgdHlwZW9mIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Plxue1xuXHQoaW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsIGV2ZW50TmFtZTogRSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFyc2VyRXZlbnRFbWl0dGVyO1xuIl19