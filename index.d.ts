/// <reference types="node" />
import { AST } from "regexpp2";
import regexpp = require('regexpp2');
import EventEmitter = require('events');
import { INodePlus, IAstToStringOptions } from 'regexp-parser-literal';
import { AppendableNode } from 'regexpp2/src/parser';
export declare enum ParserEventEmitterEvent {
    default = "default",
    class = "class",
    other = "other",
    uniset = "uniset",
    class_default = "class_default",
    class_range = "class_range",
    class_other = "class_other",
    class_uniset = "class_uniset",
    change = "change"
}
export declare type INodeInput = AST.Element | AST.CharacterClassElement | AppendableNode;
export declare class ParserEventEmitter extends EventEmitter {
    astRegExpLiteral: AST.RegExpLiteral & INodePlus;
    constructor(inputAst: regexpp.AST.Pattern | regexpp.AST.RegExpLiteral | string, flags?: string | AST.Flags);
    static create(inputAst: regexpp.AST.Pattern | regexpp.AST.RegExpLiteral | string, flags?: string | AST.Flags): ParserEventEmitter;
    resume(): this;
    emit<T extends INodeInput>(eventName: keyof typeof ParserEventEmitterEvent, inputAst: T & INodePlus, ...args: any[]): boolean;
    on<E extends ParserEventEmitterEvent.default>(eventName: E, listener: IParserEventEmitterListener<AST.Character, E>): this;
    on<E extends ParserEventEmitterEvent.class>(eventName: E, listener: IParserEventEmitterListener<AST.CharacterClass, E>): this;
    on<E extends ParserEventEmitterEvent.class_default>(eventName: E, listener: IParserEventEmitterListener<AST.Character, E>): this;
    on<E extends ParserEventEmitterEvent.class_range>(eventName: E, listener: IParserEventEmitterListener<AST.CharacterClassRange, E>): this;
    on<E extends ParserEventEmitterEvent.other>(eventName: E, listener: IParserEventEmitterListener<AST.CharacterClassElement, E>): this;
    on<E extends ParserEventEmitterEvent>(eventName: ParserEventEmitterEvent, listener: IParserEventEmitterListener<AST.Element, E>): this;
    protected _change<T extends AST.Node>(ast: T & INodePlus, isFirst?: boolean): void;
    protected _lookup_sub<T extends INodeInput>(inputAst: T & INodePlus, myEmitter: ParserEventEmitter, parent?: any, eventPrefix?: string): void;
    getSource(overwrite?: boolean, options?: IAstToStringOptions): string;
    getFlags(overwrite?: boolean, options?: IAstToStringOptions): string;
    source: string;
    flags: string;
    changed: boolean;
    toString(overwrite?: boolean, options?: IAstToStringOptions): string;
    toRegExp<T extends RegExp>(RegExpClass?: typeof RegExp): RegExp;
}
export interface IParserEventEmitterListener<T extends INodeInput, E extends keyof typeof ParserEventEmitterEvent> {
    (inputAst: T & INodePlus, eventName: E): any;
}
export default ParserEventEmitter;
