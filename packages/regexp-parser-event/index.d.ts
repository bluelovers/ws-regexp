/// <reference types="node" />
import { AST } from "regexpp2";
import { EventEmitter } from 'events';
import { ITSPartialRecord, ITSOverwrite } from 'ts-type';
import { INodePlus, IAstToStringOptions } from 'regexp-parser-literal';
import { AppendableNode } from 'regexpp2/src/parser';
export declare const enum ParserEventEmitterEvent {
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
export declare const ParserEventEmitterEventList: ParserEventEmitterEvent[];
export type INodeInput = AST.Element | AST.CharacterClassElement | AppendableNode | AST.CharacterSet;
export declare class ParserEventEmitter extends EventEmitter {
    astRegExpLiteral: AST.RegExpLiteral & INodePlus;
    constructor(inputAst: AST.Pattern | AST.RegExpLiteral | string, flags?: string | AST.Flags);
    static create(inputAst: AST.Pattern | AST.RegExpLiteral | string, flags?: string | AST.Flags): ParserEventEmitter;
    resume(): this;
    /**
     * same as this.emit(ParserEventEmitterEvent.change, ast)
     */
    emitChange<T extends INodeInput>(inputAst: T & INodePlus, ...args: any[]): boolean;
    emit<T extends INodeInput>(eventName: ParserEventEmitterEvent, inputAst: T & INodePlus, ...args: any[]): boolean;
    on<E extends ParserEventEmitterEvent.default>(eventName: E, listener: IParserEventEmitterListener<AST.Character, E>): this;
    on<E extends ParserEventEmitterEvent.class>(eventName: E, listener: IParserEventEmitterListener<AST.CharacterClass, E>): this;
    on<E extends ParserEventEmitterEvent.class_default>(eventName: E, listener: IParserEventEmitterListener<AST.Character, E>): this;
    on<E extends ParserEventEmitterEvent.class_range>(eventName: E, listener: IParserEventEmitterListener<AST.CharacterClassRange, E>): this;
    on<E extends ParserEventEmitterEvent.other>(eventName: E, listener: IParserEventEmitterListener<AST.CharacterClassElement, E>): this;
    on<E extends ParserEventEmitterEvent.uniset>(eventName: E, listener: IParserEventEmitterListener<AST.CharacterSet, E>): this;
    on<E extends ParserEventEmitterEvent>(eventName: ParserEventEmitterEvent, listener: IParserEventEmitterListener<AST.Element, E>): this;
    protected _change<T extends AST.Node>(ast: T & INodePlus, isFirst?: boolean): void;
    protected _lookup_sub<T extends INodeInput>(inputAst: T & INodePlus, myEmitter: ParserEventEmitter, parent?: any, eventPrefix?: string): void;
    getSource(overwrite?: boolean, options?: IAstToStringOptions): string;
    getFlags(overwrite?: boolean, options?: IAstToStringOptions): string;
    get source(): string;
    set source(pattern: AST.Pattern | string);
    get flags(): string;
    set flags(flags: string | AST.Flags);
    get changed(): boolean;
    set changed(bool: boolean);
    toString(overwrite?: boolean, options?: IAstToStringOptions): string;
    toRegExp<T extends RegExp>(RegExpClass?: typeof RegExp): RegExp;
    /**
     * this will not update changes
     */
    get astSource(): AST.Pattern;
    /**
     * this will not update changes
     */
    get astFlags(): AST.Flags;
}
export interface IParserEventEmitterListenerMap<T extends INodeInput = INodeInput> extends ITSOverwrite<ITSPartialRecord<ParserEventEmitterEvent, IParserEventEmitterListener<any, ParserEventEmitterEvent>>, {
    /**
     * 一般性 文字 節點
     */
    [ParserEventEmitterEvent.default]?: IParserEventEmitterListener<AST.Character, ParserEventEmitterEvent.default>;
    /**
     * /[xxx]/ 這類
     */
    [ParserEventEmitterEvent.class]?: IParserEventEmitterListener<AST.CharacterClass, ParserEventEmitterEvent.class>;
    /**
     * /[xxx]/ 之中的 xxx
     */
    [ParserEventEmitterEvent.class_default]?: IParserEventEmitterListener<AST.Character, ParserEventEmitterEvent.class_default>;
    /**
     * /[0-9]/ 之中的 0-9
     */
    [ParserEventEmitterEvent.class_range]?: IParserEventEmitterListener<AST.CharacterClassRange, ParserEventEmitterEvent.class_range>;
    /**
     * /[\p{xxxx}]/ 之中的 \p{xxxx}
     */
    [ParserEventEmitterEvent.class_uniset]?: IParserEventEmitterListener<AST.CharacterSet, ParserEventEmitterEvent.class_uniset>;
    [ParserEventEmitterEvent.other]?: IParserEventEmitterListener<AST.CharacterClassElement, ParserEventEmitterEvent.other>;
    /**
     * \p{xxxx}
     */
    [ParserEventEmitterEvent.uniset]?: IParserEventEmitterListener<AST.CharacterSet, ParserEventEmitterEvent.uniset>;
}> {
}
export interface IParserEventEmitterListener<T extends INodeInput, E extends keyof typeof ParserEventEmitterEvent> {
    (inputAst: T & INodePlus, eventName: E, emitter: ParserEventEmitter, ...argv: unknown[]): any;
}
export default ParserEventEmitter;
