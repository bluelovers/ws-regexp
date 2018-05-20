
import { AST } from "regexpp2";
import * as regexpp from 'regexpp2';
import * as EventEmitter from 'events';

import Parser, {
	astToString,
	fakePatternToRegExpLiteral,
	parseFlags,
	parsePattern,
	INodePlus,
	IAstToStringOptions
} from 'regexp-parser-literal';

export enum ParserEventEmitterEvent
{
	default = 'default',
	class = 'class',

	other = 'other',

	uniset = 'uniset',

	class_default = 'class_default',
	class_range = 'class_range',
	class_other = 'class_other',

	class_uniset = 'class_uniset',

	change = 'change',
}

export class ParserEventEmitter extends EventEmitter
{
	astRegExpLiteral: AST.RegExpLiteral & INodePlus = null;

	constructor(inputAst: regexpp.AST.Pattern | regexpp.AST.RegExpLiteral | string, flags: string | AST.Flags = '')
	{
		super();

		const self = this;

		if (typeof inputAst == 'string' || inputAst.type == 'Pattern')
		{
			inputAst = fakePatternToRegExpLiteral(inputAst, flags);
		}

		this.astRegExpLiteral = inputAst;

		this.on(ParserEventEmitterEvent.change, function (ast)
		{
			self._change(ast, true);
			self.changed = true;
		});

//		console.dir(this.astRegExpLiteral.pattern.elements, {
//			colors: true,
//			depth: 3,
//		});
	}

	static create(inputAst: regexpp.AST.Pattern | regexpp.AST.RegExpLiteral | string, flags: string | AST.Flags = '')
	{
		return new this(inputAst, flags);
	}

	resume()
	{
		const self = this;

		this.astRegExpLiteral.pattern.elements.forEach(function (item)
		{
			self._lookup_sub(item, self);
		});

		return this;
	}

	emit<T extends AST.Element | AST.CharacterClassElement>(eventName: keyof typeof ParserEventEmitterEvent,
		inputAst: T & INodePlus,
		...args
	): boolean
	{
		return super.emit(eventName, inputAst, ...args, eventName);
	}

	on(eventName: keyof typeof ParserEventEmitterEvent, listener: IParserEventEmitterListener<AST.Element>): this
	on(eventName: 'default', listener: IParserEventEmitterListener<AST.Character>): this
	on(eventName: 'class', listener: IParserEventEmitterListener<AST.CharacterClass>): this
	on(eventName: 'class_default', listener: IParserEventEmitterListener<AST.Character>): this
	on(eventName: 'class_range', listener: IParserEventEmitterListener<AST.CharacterClassRange>): this
	on(eventName: 'class_other', listener: IParserEventEmitterListener<AST.CharacterClassElement>): this
	on(eventName: keyof typeof ParserEventEmitterEvent, listener: IParserEventEmitterListener<any>): this
	{
		return super.on(eventName, listener);
	}

	protected _change<T extends AST.Node>(ast: T & INodePlus, isFirst?: boolean)
	{
		const self = this;

		ast.changed = true;

		if (ast.parent)
		{
			this._change(ast.parent)
		}
	}

	protected _lookup_sub<T extends AST.Element | AST.CharacterClassElement>(inputAst: T & INodePlus,
		myEmitter: ParserEventEmitter,
		parent?,
		eventPrefix: string = ''
	)
	{
		const self = this;

		let do_elements: boolean;
		let sub_elements: any[];
		let sub_prefix: string = '';
		let event: string;

		switch (inputAst.type)
		{
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
			case 'Disjunction':

				(inputAst as AST.Disjunction).alternatives
					.forEach(function (items)
					{
						items.forEach(function (item)
						{
							self._lookup_sub(item, myEmitter, inputAst, sub_prefix);
						});
					})
				;

				break;
			default:

				if (eventPrefix === 'class_')
				{
					event = ParserEventEmitterEvent.class_other;
				}
				else
				{
					event = eventPrefix + ParserEventEmitterEvent.other;
				}

				break;
		}

		if (event)
		{
			myEmitter.emit(ParserEventEmitterEvent[event], inputAst);
		}

		if (do_elements && typeof sub_elements == 'undefined')
		{
			// @ts-ignore
			sub_elements = inputAst.elements;
		}

		if (!inputAst.type)
		{
			//console.log(inputAst.type, sub_elements && sub_elements.length, inputAst);
		}
		else
		{
			//console.log(inputAst.type, sub_elements && sub_elements.length);
		}

		// @ts-ignore
		if (do_elements && sub_elements)
		{
			// @ts-ignore
			sub_elements.forEach(function (item)
			{
				self._lookup_sub(item, myEmitter, inputAst, sub_prefix);
			});
		}
	}

	getSource(overwrite?: boolean, options?: IAstToStringOptions): string
	{
		return astToString(this.astRegExpLiteral.pattern, {

			...options,

			// @ts-ignore
			debugChanged: overwrite ? 99 : this.astRegExpLiteral.pattern.changed,
		});
	}

	getFlags(overwrite?: boolean, options?: IAstToStringOptions): string
	{
		return astToString(this.astRegExpLiteral.flags, {

			...options,

			// @ts-ignore
			debugChanged: overwrite ? 99 : this.astRegExpLiteral.flags.changed,
		});
	}

	// @ts-ignore
	get source(): string
	{
		return this.getSource();
	}

	// @ts-ignore
	set source(pattern: regexpp.AST.Pattern | string)
	{
		pattern = typeof pattern == 'string' ? parsePattern(pattern, this.astRegExpLiteral.flags.unicode) : pattern;

		pattern.parent = this.astRegExpLiteral;

		this.astRegExpLiteral.pattern = pattern;

		this.changed = false;
	}

	// @ts-ignore
	get flags(): string
	{
		return this.getFlags();
	}

	// @ts-ignore
	set flags(flags: string | AST.Flags)
	{
		flags = typeof flags == 'string' ? parseFlags(flags) : flags;

		flags.parent = this.astRegExpLiteral;

		this.astRegExpLiteral.flags = flags;

		// @ts-ignore
		this.changed = this.astRegExpLiteral.pattern.changed || false;
	}

	get changed()
	{
		return this.astRegExpLiteral.changed
		// @ts-ignore
		|| this.astRegExpLiteral.pattern.changed
		|| typeof this.astRegExpLiteral.changed == 'boolean' ? this.astRegExpLiteral.changed : null;
	}

	set changed(bool: boolean)
	{
		// @ts-ignore
		this.astRegExpLiteral.pattern.changed = this.astRegExpLiteral.changed = bool;
	}

	toString(overwrite?: boolean, options?: IAstToStringOptions)
	{
		return astToString(this.astRegExpLiteral, {

			...options,

			debugChanged: overwrite ? 99 : this.changed,
		});
	}

	toRegExp<T extends RegExp>(RegExpClass: typeof RegExp = RegExp)
	{
		return new RegExpClass(this.source, this.flags);
	}
}

export interface IParserEventEmitterListener<T extends AST.Element | AST.CharacterClassElement>
{
	(inputAst: T & INodePlus, eventName: keyof typeof ParserEventEmitterEvent)
}

export default ParserEventEmitter;
