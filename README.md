# regexp-parser-event

## API

[index.d.ts](index.d.ts)

```ts
/// <reference types="node" />
import { AST } from "regexpp2";
import * as regexpp from 'regexpp2';
import * as EventEmitter from 'events';
import { INodePlus, IAstToStringOptions } from 'regexp-parser-literal';
export declare enum ParserEventEmitterEvent {
    default = "default",
    class = "class",
    other = "other",
    uniset = "uniset",
    class_default = "class_default",
    class_range = "class_range",
    class_other = "class_other",
    class_uniset = "class_uniset",
    change = "change",
}
export declare class ParserEventEmitter extends EventEmitter {
    astRegExpLiteral: AST.RegExpLiteral & INodePlus;
    constructor(inputAst: regexpp.AST.Pattern | regexpp.AST.RegExpLiteral | string, flags?: string | AST.Flags);
    static create(inputAst: regexpp.AST.Pattern | regexpp.AST.RegExpLiteral | string, flags?: string | AST.Flags): ParserEventEmitter;
    resume(): this;
    emit<T extends AST.Element | AST.CharacterClassElement>(eventName: keyof typeof ParserEventEmitterEvent, inputAst: T & INodePlus, ...args: any[]): boolean;
    on(eventName: keyof typeof ParserEventEmitterEvent, listener: IParserEventEmitterListener<AST.Element>): this;
    on(eventName: 'default', listener: IParserEventEmitterListener<AST.Character>): this;
    on(eventName: 'class', listener: IParserEventEmitterListener<AST.CharacterClass>): this;
    on(eventName: 'class_default', listener: IParserEventEmitterListener<AST.Character>): this;
    on(eventName: 'class_range', listener: IParserEventEmitterListener<AST.CharacterClassRange>): this;
    on(eventName: 'class_other', listener: IParserEventEmitterListener<AST.CharacterClassElement>): this;
    protected _change<T extends AST.Node>(ast: T & INodePlus, isFirst?: boolean): void;
    protected _lookup_sub<T extends AST.Element | AST.CharacterClassElement>(inputAst: T & INodePlus, myEmitter: ParserEventEmitter, parent?: any, eventPrefix?: string): void;
    getSource(overwrite?: boolean, options?: IAstToStringOptions): string;
    getFlags(overwrite?: boolean, options?: IAstToStringOptions): string;
    source: string;
    flags: string;
    changed: boolean;
    toString(overwrite?: boolean, options?: IAstToStringOptions): string;
    toRegExp<T extends RegExp>(RegExpClass?: typeof RegExp): RegExp;
}
export interface IParserEventEmitterListener<T extends AST.Element | AST.CharacterClassElement> {
    (inputAst: T & INodePlus, eventName: keyof typeof ParserEventEmitterEvent): any;
}
export default ParserEventEmitter;

```
