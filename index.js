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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVDQUF3QztBQUN4QywyREFBa0Q7QUFFbEQsaUVBTytCO0FBSS9CLElBQWtCLHVCQWdCakI7QUFoQkQsV0FBa0IsdUJBQXVCO0lBRXhDLDhDQUFtQixDQUFBO0lBQ25CLDBDQUFlLENBQUE7SUFFZiwwQ0FBZSxDQUFBO0lBRWYsNENBQWlCLENBQUE7SUFFakIsMERBQStCLENBQUE7SUFDL0Isc0RBQTJCLENBQUE7SUFDM0Isc0RBQTJCLENBQUE7SUFFM0Isd0RBQTZCLENBQUE7SUFFN0IsNENBQWlCLENBQUE7QUFDbEIsQ0FBQyxFQWhCaUIsdUJBQXVCLEdBQXZCLCtCQUF1QixLQUF2QiwrQkFBdUIsUUFnQnhDO0FBRUQsYUFBYTtBQUNBLFFBQUEsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQ0FBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUE4QixDQUFDO0FBSTVJLE1BQWEsa0JBQW1CLFNBQVEsWUFBWTtJQUluRCxZQUFZLFFBQWtFLEVBQUUsUUFBNEIsRUFBRTtRQUU3RyxLQUFLLEVBQUUsQ0FBQztRQUpULHFCQUFnQixHQUFrQyxJQUFJLENBQUM7UUFNdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksT0FBTyxRQUFRLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksU0FBUyxFQUM3RDtZQUNDLFFBQVEsR0FBRyxrREFBMEIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBNkIsQ0FBQztRQUV0RCxJQUFJLENBQUMsRUFBRSx3QkFBaUMsVUFBVSxHQUFHO1lBRXBELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBRUwseURBQXlEO1FBQ3pELGtCQUFrQjtRQUNsQixjQUFjO1FBQ2QsT0FBTztJQUNOLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQWtFLEVBQUUsUUFBNEIsRUFBRTtRQUUvRyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTTtRQUVMLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQjs7Ozs7VUFLRTtRQUVGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFFNUMsYUFBYTtRQUNiLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUVyRCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTtZQUUzQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxDQUF1QixRQUF1QixFQUFFLEdBQUcsSUFBSTtRQUVoRSxPQUFPLElBQUksQ0FBQyxJQUFJLHdCQUFpQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0lBRUQsSUFBSSxDQUF1QixTQUFrQyxFQUM1RCxRQUF1QixFQUN2QixHQUFHLElBQUk7UUFHUCxPQUFRLEtBQUssQ0FBQyxJQUFxRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3BJLENBQUM7SUFvQkQsRUFBRSxDQUFDLFNBQWtDLEVBQUUsUUFBbUU7UUFFekcsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRVMsT0FBTyxDQUFxQixHQUFrQixFQUFFLE9BQWlCO1FBRTFFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQixHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQ2Q7WUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUN4QjtJQUNGLENBQUM7SUFFUyxXQUFXLENBQXVCLFFBQXVCLEVBQ2xFLFNBQTZCLEVBQzdCLE1BQU8sRUFDUCxjQUFzQixFQUFFO1FBR3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQixJQUFJLFdBQW9CLENBQUM7UUFDekIsSUFBSSxZQUFtQixDQUFDO1FBQ3hCLElBQUksVUFBVSxHQUFXLEVBQUUsQ0FBQztRQUM1QixJQUFJLEtBQThFLENBQUM7UUFFbkYsUUFBUSxRQUFRLENBQUMsSUFBSSxFQUNyQjtZQUNDLEtBQUssV0FBVztnQkFDZixLQUFLLEdBQUcsV0FBVywwQkFBa0MsQ0FBQztnQkFFdEQsTUFBTTtZQUNQLEtBQUssZ0JBQWdCO2dCQUNwQixLQUFLLHNCQUFnQyxDQUFDO2dCQUV0QyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixVQUFVLEdBQUcsUUFBUSxDQUFDO2dCQUV0QixNQUFNO1lBQ1AsS0FBSyxxQkFBcUI7Z0JBQ3pCLEtBQUssa0NBQXNDLENBQUM7Z0JBRTVDLE1BQU07WUFFUCxLQUFLLGNBQWM7Z0JBQ2xCLEtBQUssR0FBRyxXQUFXLHdCQUFpQyxDQUFDO2dCQUVyRCxNQUFNO1lBRVAsS0FBSyxZQUFZO2dCQUVoQixXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixhQUFhO2dCQUNiLFlBQVksR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFbEMsTUFBTTtZQUVQLEtBQUssZ0JBQWdCLENBQUM7WUFDdEIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFdBQVc7Z0JBQ2YsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDbkIsTUFBTTtZQUVQLGFBQWE7WUFDYixLQUFLLGFBQWE7Z0JBRWpCLGFBQWE7Z0JBQ1osUUFBNEIsQ0FBQyxRQUFRO3FCQUNwQyxPQUFPLENBQUMsVUFBVSxLQUFLO29CQUV2QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRCxDQUFDLENBQUMsQ0FBQztnQkFDSixDQUFDO2dCQUVELE1BQU07WUFFUCxhQUFhO1lBQ2IsS0FBSyxhQUFhO2dCQUVqQixhQUFhO2dCQUNaLFFBQTRCLENBQUMsWUFBWTtxQkFDeEMsT0FBTyxDQUFDLFVBQVUsS0FBSztvQkFFdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7d0JBRTNCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQ3pELENBQUMsQ0FBQyxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUNGO2dCQUVELE1BQU07WUFFUDtnQkFFQyxJQUFJLFdBQVcsS0FBSyxRQUFRLEVBQzVCO29CQUNDLEtBQUssa0NBQXNDLENBQUM7aUJBQzVDO3FCQUVEO29CQUNDLEtBQUssR0FBRyxXQUFXLHNCQUFnQyxDQUFDO2lCQUNwRDtnQkFFRCxNQUFNO1NBQ1A7UUFFRCxJQUFJLEtBQUssRUFDVDtZQUNDLGFBQWE7WUFDYixTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsSUFBSSxXQUFXLElBQUksT0FBTyxZQUFZLElBQUksV0FBVyxFQUNyRDtZQUNDLGFBQWE7WUFDYixZQUFZLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUVqQyxJQUFJLE9BQU8sWUFBWSxJQUFJLFdBQVcsRUFDdEM7Z0JBQ0MsYUFBYTtnQkFDYixZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQzthQUNyQztTQUNEO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQ2xCO1lBQ0MsNEVBQTRFO1NBQzVFO2FBRUQ7WUFDQyxrRUFBa0U7U0FDbEU7UUFFRCxhQUFhO1FBQ2IsSUFBSSxXQUFXLElBQUksWUFBWSxFQUMvQjtZQUNDLGFBQWE7WUFDYixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTtnQkFFbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVELFNBQVMsQ0FBQyxTQUFtQixFQUFFLE9BQTZCO1FBRTNELE9BQU8sbUNBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBRWpELEdBQUcsT0FBTztZQUVWLGFBQWE7WUFDYixZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTztTQUNwRSxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQW1CLEVBQUUsT0FBNkI7UUFFMUQsT0FBTyxtQ0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7WUFFL0MsR0FBRyxPQUFPO1lBRVYsYUFBYTtZQUNiLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUFPO1NBQ2xFLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhO0lBQ2IsSUFBSSxNQUFNO1FBRVQsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWE7SUFDYixJQUFJLE1BQU0sQ0FBQyxPQUFxQztRQUUvQyxPQUFPLEdBQUcsT0FBTyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxvQ0FBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFNUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFFdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELGFBQWE7SUFDYixJQUFJLEtBQUs7UUFFUixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsYUFBYTtJQUNiLElBQUksS0FBSyxDQUFDLEtBQXlCO1FBRWxDLEtBQUssR0FBRyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLGtDQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUU3RCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUVyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVwQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7SUFDL0QsQ0FBQztJQUVELElBQUksT0FBTztRQUVWLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU87WUFDcEMsYUFBYTtlQUNWLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTztlQUNyQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDN0YsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLElBQWE7UUFFeEIsYUFBYTtRQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQzlFLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBbUIsRUFBRSxPQUE2QjtRQUUxRCxPQUFPLG1DQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBRXpDLEdBQUcsT0FBTztZQUVWLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVEsQ0FBbUIsY0FBNkIsTUFBTTtRQUU3RCxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksU0FBUztRQUVaLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFFBQVE7UUFFWCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7SUFDcEMsQ0FBQztDQUVEO0FBeFZELGdEQXdWQztBQVlELGtCQUFlLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInJlZ2V4cHAyXCI7XG5pbXBvcnQgcmVnZXhwcCA9IHJlcXVpcmUoJ3JlZ2V4cHAyJyk7XG5pbXBvcnQgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5pbXBvcnQgeyBhcnJheV91bmlxdWUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnO1xuXG5pbXBvcnQgUGFyc2VyLCB7XG5cdGFzdFRvU3RyaW5nLFxuXHRmYWtlUGF0dGVyblRvUmVnRXhwTGl0ZXJhbCxcblx0cGFyc2VGbGFncyxcblx0cGFyc2VQYXR0ZXJuLFxuXHRJTm9kZVBsdXMsXG5cdElBc3RUb1N0cmluZ09wdGlvbnMsXG59IGZyb20gJ3JlZ2V4cC1wYXJzZXItbGl0ZXJhbCc7XG5cbmltcG9ydCB7IEFwcGVuZGFibGVOb2RlIH0gZnJvbSAncmVnZXhwcDIvc3JjL3BhcnNlcic7XG5cbmV4cG9ydCBjb25zdCBlbnVtIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50XG57XG5cdGRlZmF1bHQgPSAnZGVmYXVsdCcsXG5cdGNsYXNzID0gJ2NsYXNzJyxcblxuXHRvdGhlciA9ICdvdGhlcicsXG5cblx0dW5pc2V0ID0gJ3VuaXNldCcsXG5cblx0Y2xhc3NfZGVmYXVsdCA9ICdjbGFzc19kZWZhdWx0Jyxcblx0Y2xhc3NfcmFuZ2UgPSAnY2xhc3NfcmFuZ2UnLFxuXHRjbGFzc19vdGhlciA9ICdjbGFzc19vdGhlcicsXG5cblx0Y2xhc3NfdW5pc2V0ID0gJ2NsYXNzX3VuaXNldCcsXG5cblx0Y2hhbmdlID0gJ2NoYW5nZScsXG59XG5cbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCBjb25zdCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudExpc3QgPSBPYmplY3QuZnJlZXplKGFycmF5X3VuaXF1ZShPYmplY3QudmFsdWVzKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50KSkpIGFzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50W107XG5cbmV4cG9ydCB0eXBlIElOb2RlSW5wdXQgPSBBU1QuRWxlbWVudCB8IEFTVC5DaGFyYWN0ZXJDbGFzc0VsZW1lbnQgfCBBcHBlbmRhYmxlTm9kZTtcblxuZXhwb3J0IGNsYXNzIFBhcnNlckV2ZW50RW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlclxue1xuXHRhc3RSZWdFeHBMaXRlcmFsOiBBU1QuUmVnRXhwTGl0ZXJhbCAmIElOb2RlUGx1cyA9IG51bGw7XG5cblx0Y29uc3RydWN0b3IoaW5wdXRBc3Q6IHJlZ2V4cHAuQVNULlBhdHRlcm4gfCByZWdleHBwLkFTVC5SZWdFeHBMaXRlcmFsIHwgc3RyaW5nLCBmbGFnczogc3RyaW5nIHwgQVNULkZsYWdzID0gJycpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRpZiAodHlwZW9mIGlucHV0QXN0ID09ICdzdHJpbmcnIHx8IGlucHV0QXN0LnR5cGUgPT0gJ1BhdHRlcm4nKVxuXHRcdHtcblx0XHRcdGlucHV0QXN0ID0gZmFrZVBhdHRlcm5Ub1JlZ0V4cExpdGVyYWwoaW5wdXRBc3QsIGZsYWdzKTtcblx0XHR9XG5cblx0XHR0aGlzLmFzdFJlZ0V4cExpdGVyYWwgPSBpbnB1dEFzdCBhcyBBU1QuUmVnRXhwTGl0ZXJhbDtcblxuXHRcdHRoaXMub24oUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCBmdW5jdGlvbiAoYXN0KVxuXHRcdHtcblx0XHRcdHNlbGYuX2NoYW5nZShhc3QsIHRydWUpO1xuXHRcdFx0c2VsZi5jaGFuZ2VkID0gdHJ1ZTtcblx0XHR9KTtcblxuLy9cdFx0Y29uc29sZS5kaXIodGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4uZWxlbWVudHMsIHtcbi8vXHRcdFx0Y29sb3JzOiB0cnVlLFxuLy9cdFx0XHRkZXB0aDogMyxcbi8vXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZShpbnB1dEFzdDogcmVnZXhwcC5BU1QuUGF0dGVybiB8IHJlZ2V4cHAuQVNULlJlZ0V4cExpdGVyYWwgfCBzdHJpbmcsIGZsYWdzOiBzdHJpbmcgfCBBU1QuRmxhZ3MgPSAnJylcblx0e1xuXHRcdHJldHVybiBuZXcgdGhpcyhpbnB1dEFzdCwgZmxhZ3MpO1xuXHR9XG5cblx0cmVzdW1lKClcblx0e1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0Lypcblx0XHQwICYmIGNvbnNvbGUuZGlyKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLCB7XG5cdFx0XHRkZXB0aDogbnVsbCxcblx0XHRcdGNvbG9yczogdHJ1ZSxcblx0XHR9KTtcblx0XHQqL1xuXG5cdFx0bGV0IHBhdHRlcm4gPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWwucGF0dGVybjtcblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRsZXQgZWxlbXMgPSBwYXR0ZXJuLmFsdGVybmF0aXZlcyB8fCBwYXR0ZXJuLmVsZW1lbnRzO1xuXG5cdFx0ZWxlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSlcblx0XHR7XG5cdFx0XHRzZWxmLl9sb29rdXBfc3ViKGl0ZW0sIHNlbGYpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogc2FtZSBhcyB0aGlzLmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCBhc3QpXG5cdCAqL1xuXHRlbWl0Q2hhbmdlPFQgZXh0ZW5kcyBJTm9kZUlucHV0PihpbnB1dEFzdDogVCAmIElOb2RlUGx1cywgLi4uYXJncylcblx0e1xuXHRcdHJldHVybiB0aGlzLmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCBpbnB1dEFzdCwgLi4uYXJncylcblx0fVxuXG5cdGVtaXQ8VCBleHRlbmRzIElOb2RlSW5wdXQ+KGV2ZW50TmFtZTogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsXG5cdFx0aW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsXG5cdFx0Li4uYXJnc1xuXHQpOiBib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHN1cGVyLmVtaXQgYXMgSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyU3VwZXI8VCwgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+KShldmVudE5hbWUsIGlucHV0QXN0LCBldmVudE5hbWUsIHRoaXMsIC4uLmFyZ3MpO1xuXHR9XG5cblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmRlZmF1bHQ+KGV2ZW50TmFtZTogRSxcblx0XHRsaXN0ZW5lcjogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPEFTVC5DaGFyYWN0ZXIsIEU+LFxuXHQpOiB0aGlzXG5cdG9uPEUgZXh0ZW5kcyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzcz4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlckNsYXNzLCBFPixcblx0KTogdGhpc1xuXHRvbjxFIGV4dGVuZHMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3NfZGVmYXVsdD4oZXZlbnROYW1lOiBFLFxuXHRcdGxpc3RlbmVyOiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8QVNULkNoYXJhY3RlciwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX3JhbmdlPihldmVudE5hbWU6IEUsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyQ2xhc3NSYW5nZSwgRT4sXG5cdCk6IHRoaXNcblx0b248RSBleHRlbmRzIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Lm90aGVyPihldmVudE5hbWU6IEUsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuQ2hhcmFjdGVyQ2xhc3NFbGVtZW50LCBFPixcblx0KTogdGhpc1xuXHRvbjxFIGV4dGVuZHMgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+KGV2ZW50TmFtZTogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsXG5cdFx0bGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxBU1QuRWxlbWVudCwgRT4sXG5cdCk6IHRoaXNcblx0b24oZXZlbnROYW1lOiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCwgbGlzdGVuZXI6IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxhbnksIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Pik6IHRoaXNcblx0e1xuXHRcdHJldHVybiBzdXBlci5vbihldmVudE5hbWUsIGxpc3RlbmVyKTtcblx0fVxuXG5cdHByb3RlY3RlZCBfY2hhbmdlPFQgZXh0ZW5kcyBBU1QuTm9kZT4oYXN0OiBUICYgSU5vZGVQbHVzLCBpc0ZpcnN0PzogYm9vbGVhbilcblx0e1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0YXN0LmNoYW5nZWQgPSB0cnVlO1xuXG5cdFx0aWYgKGFzdC5wYXJlbnQpXG5cdFx0e1xuXHRcdFx0dGhpcy5fY2hhbmdlKGFzdC5wYXJlbnQpXG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIF9sb29rdXBfc3ViPFQgZXh0ZW5kcyBJTm9kZUlucHV0PihpbnB1dEFzdDogVCAmIElOb2RlUGx1cyxcblx0XHRteUVtaXR0ZXI6IFBhcnNlckV2ZW50RW1pdHRlcixcblx0XHRwYXJlbnQ/LFxuXHRcdGV2ZW50UHJlZml4OiBzdHJpbmcgPSAnJyxcblx0KVxuXHR7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRsZXQgZG9fZWxlbWVudHM6IGJvb2xlYW47XG5cdFx0bGV0IHN1Yl9lbGVtZW50czogYW55W107XG5cdFx0bGV0IHN1Yl9wcmVmaXg6IHN0cmluZyA9ICcnO1xuXHRcdGxldCBldmVudDogc3RyaW5nIHwga2V5b2YgdHlwZW9mIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50IHwgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ7XG5cblx0XHRzd2l0Y2ggKGlucHV0QXN0LnR5cGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyJzpcblx0XHRcdFx0ZXZlbnQgPSBldmVudFByZWZpeCArIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmRlZmF1bHQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdDaGFyYWN0ZXJDbGFzcyc6XG5cdFx0XHRcdGV2ZW50ID0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3M7XG5cblx0XHRcdFx0ZG9fZWxlbWVudHMgPSB0cnVlO1xuXHRcdFx0XHRzdWJfcHJlZml4ID0gJ2NsYXNzXyc7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdDaGFyYWN0ZXJDbGFzc1JhbmdlJzpcblx0XHRcdFx0ZXZlbnQgPSBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnQ2hhcmFjdGVyU2V0Jzpcblx0XHRcdFx0ZXZlbnQgPSBldmVudFByZWZpeCArIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LnVuaXNldDtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnUXVhbnRpZmllcic6XG5cblx0XHRcdFx0ZG9fZWxlbWVudHMgPSB0cnVlO1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdHN1Yl9lbGVtZW50cyA9IFtpbnB1dEFzdC5lbGVtZW50XTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnQ2FwdHVyaW5nR3JvdXAnOlxuXHRcdFx0Y2FzZSAnR3JvdXAnOlxuXHRcdFx0Y2FzZSAnQXNzZXJ0aW9uJzpcblx0XHRcdFx0ZG9fZWxlbWVudHMgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0Y2FzZSAnQWx0ZXJuYXRpdmUnOlxuXG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0KGlucHV0QXN0IGFzIEFTVC5BbHRlcm5hdGl2ZSkuZWxlbWVudHNcblx0XHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbXMpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2VsZi5fbG9va3VwX3N1YihpdGVtcywgbXlFbWl0dGVyLCBpbnB1dEFzdCwgc3ViX3ByZWZpeCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdDtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0Y2FzZSAnRGlzanVuY3Rpb24nOlxuXG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0KGlucHV0QXN0IGFzIEFTVC5EaXNqdW5jdGlvbikuYWx0ZXJuYXRpdmVzXG5cdFx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW1zKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHNlbGYuX2xvb2t1cF9zdWIoaXRlbSwgbXlFbWl0dGVyLCBpbnB1dEFzdCwgc3ViX3ByZWZpeCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0aWYgKGV2ZW50UHJlZml4ID09PSAnY2xhc3NfJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV2ZW50ID0gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3Nfb3RoZXI7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXZlbnQgPSBldmVudFByZWZpeCArIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Lm90aGVyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50KVxuXHRcdHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdG15RW1pdHRlci5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50W2V2ZW50XSwgaW5wdXRBc3QpO1xuXHRcdH1cblxuXHRcdGlmIChkb19lbGVtZW50cyAmJiB0eXBlb2Ygc3ViX2VsZW1lbnRzID09ICd1bmRlZmluZWQnKVxuXHRcdHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHN1Yl9lbGVtZW50cyA9IGlucHV0QXN0LmVsZW1lbnRzO1xuXG5cdFx0XHRpZiAodHlwZW9mIHN1Yl9lbGVtZW50cyA9PSAndW5kZWZpbmVkJylcblx0XHRcdHtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRzdWJfZWxlbWVudHMgPSBpbnB1dEFzdC5hbHRlcm5hdGl2ZXM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFpbnB1dEFzdC50eXBlKVxuXHRcdHtcblx0XHRcdC8vY29uc29sZS5sb2coaW5wdXRBc3QudHlwZSwgc3ViX2VsZW1lbnRzICYmIHN1Yl9lbGVtZW50cy5sZW5ndGgsIGlucHV0QXN0KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vY29uc29sZS5sb2coaW5wdXRBc3QudHlwZSwgc3ViX2VsZW1lbnRzICYmIHN1Yl9lbGVtZW50cy5sZW5ndGgpO1xuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRpZiAoZG9fZWxlbWVudHMgJiYgc3ViX2VsZW1lbnRzKVxuXHRcdHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHN1Yl9lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRzZWxmLl9sb29rdXBfc3ViKGl0ZW0sIG15RW1pdHRlciwgaW5wdXRBc3QsIHN1Yl9wcmVmaXgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0U291cmNlKG92ZXJ3cml0ZT86IGJvb2xlYW4sIG9wdGlvbnM/OiBJQXN0VG9TdHJpbmdPcHRpb25zKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gYXN0VG9TdHJpbmcodGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4sIHtcblxuXHRcdFx0Li4ub3B0aW9ucyxcblxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0ZGVidWdDaGFuZ2VkOiBvdmVyd3JpdGUgPyA5OSA6IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWQsXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRGbGFncyhvdmVyd3JpdGU/OiBib29sZWFuLCBvcHRpb25zPzogSUFzdFRvU3RyaW5nT3B0aW9ucyk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIGFzdFRvU3RyaW5nKHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncywge1xuXG5cdFx0XHQuLi5vcHRpb25zLFxuXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRkZWJ1Z0NoYW5nZWQ6IG92ZXJ3cml0ZSA/IDk5IDogdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmZsYWdzLmNoYW5nZWQsXG5cdFx0fSk7XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdGdldCBzb3VyY2UoKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5nZXRTb3VyY2UoKTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0c2V0IHNvdXJjZShwYXR0ZXJuOiByZWdleHBwLkFTVC5QYXR0ZXJuIHwgc3RyaW5nKVxuXHR7XG5cdFx0cGF0dGVybiA9IHR5cGVvZiBwYXR0ZXJuID09ICdzdHJpbmcnID8gcGFyc2VQYXR0ZXJuKHBhdHRlcm4sIHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncy51bmljb2RlKSA6IHBhdHRlcm47XG5cblx0XHRwYXR0ZXJuLnBhcmVudCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbDtcblxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuID0gcGF0dGVybjtcblxuXHRcdHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRnZXQgZmxhZ3MoKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5nZXRGbGFncygpO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRzZXQgZmxhZ3MoZmxhZ3M6IHN0cmluZyB8IEFTVC5GbGFncylcblx0e1xuXHRcdGZsYWdzID0gdHlwZW9mIGZsYWdzID09ICdzdHJpbmcnID8gcGFyc2VGbGFncyhmbGFncykgOiBmbGFncztcblxuXHRcdGZsYWdzLnBhcmVudCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbDtcblxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5mbGFncyA9IGZsYWdzO1xuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHRoaXMuY2hhbmdlZCA9IHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWQgfHwgZmFsc2U7XG5cdH1cblxuXHRnZXQgY2hhbmdlZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLmNoYW5nZWRcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0fHwgdGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm4uY2hhbmdlZFxuXHRcdHx8IHR5cGVvZiB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZCA9PSAnYm9vbGVhbicgPyB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZCA6IG51bGw7XG5cdH1cblxuXHRzZXQgY2hhbmdlZChib29sOiBib29sZWFuKVxuXHR7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHRoaXMuYXN0UmVnRXhwTGl0ZXJhbC5wYXR0ZXJuLmNoYW5nZWQgPSB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuY2hhbmdlZCA9IGJvb2w7XG5cdH1cblxuXHR0b1N0cmluZyhvdmVyd3JpdGU/OiBib29sZWFuLCBvcHRpb25zPzogSUFzdFRvU3RyaW5nT3B0aW9ucylcblx0e1xuXHRcdHJldHVybiBhc3RUb1N0cmluZyh0aGlzLmFzdFJlZ0V4cExpdGVyYWwsIHtcblxuXHRcdFx0Li4ub3B0aW9ucyxcblxuXHRcdFx0ZGVidWdDaGFuZ2VkOiBvdmVyd3JpdGUgPyA5OSA6IHRoaXMuY2hhbmdlZCxcblx0XHR9KTtcblx0fVxuXG5cdHRvUmVnRXhwPFQgZXh0ZW5kcyBSZWdFeHA+KFJlZ0V4cENsYXNzOiB0eXBlb2YgUmVnRXhwID0gUmVnRXhwKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHBDbGFzcyh0aGlzLnNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdH1cblxuXHQvKipcblx0ICogdGhpcyB3aWxsIG5vdCB1cGRhdGUgY2hhbmdlc1xuXHQgKi9cblx0Z2V0IGFzdFNvdXJjZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5hc3RSZWdFeHBMaXRlcmFsLnBhdHRlcm47XG5cdH1cblxuXHQvKipcblx0ICogdGhpcyB3aWxsIG5vdCB1cGRhdGUgY2hhbmdlc1xuXHQgKi9cblx0Z2V0IGFzdEZsYWdzKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmFzdFJlZ0V4cExpdGVyYWwuZmxhZ3M7XG5cdH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxUIGV4dGVuZHMgSU5vZGVJbnB1dCwgRSBleHRlbmRzIGtleW9mIHR5cGVvZiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudD5cbntcblx0KGlucHV0QXN0OiBUICYgSU5vZGVQbHVzLCBldmVudE5hbWU6IEUsIGVtaXR0ZXI6IFBhcnNlckV2ZW50RW1pdHRlciwgLi4uYXJndjogdW5rbm93bltdKVxufVxuXG5pbnRlcmZhY2UgSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyU3VwZXI8VCBleHRlbmRzIElOb2RlSW5wdXQsIEUgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+XG57XG5cdChldmVudDogRSwgaW5wdXRBc3Q6IFQgJiBJTm9kZVBsdXMsIGV2ZW50TmFtZTogRSwgZW1pdHRlcjogUGFyc2VyRXZlbnRFbWl0dGVyLCAuLi5hcmd2OiB1bmtub3duW10pOiBib29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhcnNlckV2ZW50RW1pdHRlcjtcbiJdfQ==