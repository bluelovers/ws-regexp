
import { array_unique } from 'array-hyper-unique';
import { AST, RegExpParser } from 'regexpp2';
import EmojiRegex from 'emoji-regex';
import UString from 'uni-string';

// @ts-ignore
export const EMOJI_REGEX: RegExp = EmojiRegex();

export const defaultRegExpParser = createRegExpParser({
	disableChkCharacterClassRange: true,
});

export function createRegExpParser(options?: RegExpParser.Options)
{
	return new RegExpParser(options);
}

export function parseRegExp(input: string, objRegExpParser = defaultRegExpParser)
{
	input = input
		.replace(/\n/g, '\\n')
		.replace(/\r/g, '\\r')
	;

	return objRegExpParser.parseLiteral(input);
}

export function parseFlags(input: string, objRegExpParser = defaultRegExpParser)
{
	return objRegExpParser.parseFlags(input);
}

export function parsePattern(input: string, uFlag: boolean | string = false, objRegExpParser = defaultRegExpParser)
{
	if (typeof uFlag == 'string')
	{
		uFlag = parseFlags(uFlag).unicode;
	}

	input = input
		.replace(/\n/g, '\\n')
		.replace(/\r/g, '\\r')
	;

	return objRegExpParser.parsePattern(input, 0, input.length, uFlag);
}

export function fakePatternToRegExpLiteral(pattern: AST.Pattern | string,
	flags: string | AST.Flags = '',
	objRegExpParser = defaultRegExpParser
): AST.RegExpLiteral
{
	let data: AST.RegExpLiteral;

	if (!flags)
	{
		flags = '';
	}

	if (typeof pattern == 'string')
	{
		data = parseRegExp(`/${pattern}/${typeof flags == 'string' ? flags : astToString(flags)}`, objRegExpParser);
	}
	else
	{
		flags = typeof flags == 'string' ? parseFlags(flags, objRegExpParser) : flags;
		pattern = typeof pattern == 'string' ? parsePattern(pattern, flags.unicode, objRegExpParser) : pattern;

		data = <AST.RegExpLiteral>{
			type: "RegExpLiteral",
			parent: null,
			start: 0,
			end: pattern.end + flags.end + 2,
			raw: `/${pattern.raw}/${flags.raw}`,
			pattern,
			flags,
		};

		pattern.parent = data;
	}

	return data;
}

export type IAstToStringOptions = {
	debugChanged?: boolean | number,

	noUniqueClass?: boolean,
	doUniqueClassEmoji?: boolean,

	sortClass?: boolean,
}

export function astToString(ast: AST.Element & INodePlus | AST.Node & INodePlus,
	options: IAstToStringOptions = {}
): string
{
	let source: string;
	let _update_: boolean;

	if (typeof options.debugChanged == 'number' && options.debugChanged >= 99)
	{
		// debug mode
		ast.changed = true;
	}

	let changed = options.debugChanged;

	//console.log(666, ast.type, ast.changed, changed);

	switch (ast.type)
	{
		case 'RegExpLiteral':

			if (changed || ast.changed)
			{
				source = `/${astToString(ast.pattern, options)}/${astToString(ast.flags, options)}`;

				_update_ = true;
			}

			break;

		case 'Pattern':

			if (changed || ast.changed)
			{
				source = ast.elements.reduce(function (a, item: AST.Node)
				{
					a.push(astToString(item, options));

					return a;
				}, []).join('');

				_update_ = true;
			}

			break;
		case 'Quantifier':

			source = astToString(ast.element, options);

			if (ast.raw.indexOf(source) !== 0 && /^(?:\{[\d,]+\}|[*+?])$/.test(ast.raw))
			{
				source += ast.raw;
			}
			else if (ast.min == 1 && ast.max == Infinity)
			{
				source += '+';
			}
			else if (ast.min == 0 && ast.max == Infinity)
			{
				source += '*';
			}
			else if (ast.min == 0 && ast.max == 1)
			{
				source += '?';
			}
			else
			{
				source += `{${ast.min},${ast.max}}`;
			}

			if (!ast.greedy)
			{
				source += '?';
			}

			_update_ = true;

			break;
		case 'Assertion':
		case 'CapturingGroup':
		case 'Group':
		case 'CharacterClass':

			if (ast.changed)
			{
				// @ts-ignore
				if (ast.elements)
				{
					let do_unique = !options.noUniqueClass;

					// @ts-ignore
					let aaa = ast.elements
						.reduce(function (a, item: AST.Node & INodePlus)
						{
							let s = astToString(item, options);

							if (do_unique
								&& item.type == 'CharacterClassRange'
								&& item.old_raw
								&& /-/u.test(item.old_raw) && !/-/u.test(s)
							)
							{
								a = a.concat(UString.split(s, ''));
							}
							else
							{
								a.push(s);
							}

							return a;
						}, [] as string[])
					;

					if (ast.type == 'CharacterClass' && (do_unique || options.sortClass))
					{
						if (do_unique && EMOJI_REGEX.test(ast.raw))
						{
							let last_is_emoji: boolean;
							let last_is_zwj: boolean;

							let EMOJI_SPLIT = new RegExp('(' + EMOJI_REGEX.source + ')', EMOJI_REGEX.flags);

							aaa = aaa.reduce(function (a, b: string)
							{
								let current_is_zwj = /\u200D/.test(b);
								let current_is_emoji = EMOJI_REGEX.test(b);

								if (last_is_emoji)
								{
									let last_i = a.length - 1;

									if (current_is_emoji)
									{
										a[last_i] += b;
									}
									else
									{
										if (options.doUniqueClassEmoji)
										{
											let text = a.pop() as string;
											let c = text.split(EMOJI_SPLIT);
											a = a.concat(c);
										}

										a.push(b);
									}
								}
								else
								{
									a.push(b);
								}

								last_is_emoji = current_is_emoji;
								last_is_zwj = current_is_zwj;

								return a;
							}, []);
						}

						if (do_unique)
						{
							aaa = array_unique(aaa);
						}

						if (options.sortClass)
						{
							aaa.sort();
						}
					}

					source = aaa.join('');

					switch (ast.type)
					{
						case 'CapturingGroup':
							source = '(' + source + ')';
							break;
						case 'Group':
							source = '(?:' + source + ')';
							break;
						case 'CharacterClass':
							source = '[' + (ast.negate ? '^' : '') + source + ']';
							break;
						case 'Assertion':

							let a = [] as string[];

							//console.log(ast);

							if (ast.kind == 'lookbehind')
							{
								a.push('<');
							}

							// @ts-ignore
							a.push(ast.negate ? '!' : '=');

							source = '(?' + a.join('') + source + ')';

							break;
					}

					_update_ = true;
				}
			}

			break;

		case 'Disjunction':

			if (ast.changed)
			{
				let a = (ast.alternatives as AST.AlternativeElement[][])
					.reduce(function (a, items)
					{
						let source = items.reduce(function (a, item: AST.Node)
						{
							a.push(astToString(item, options));

							return a;
						}, []).join('');

						a.push(source);

						return a;
					}, [] as string[])
				;

				// @ts-ignore
				a = array_unique<string>(a);

				source = a.join('|');
				_update_ = true;
			}

			break;

		default:
			//source = ast.raw;
			break;
	}

	if (!_update_)
	{
		source = ast.raw;
	}

	if (0 && source !== ast.raw)
	{
		console.warn({
			type: ast.type,
			source,
			raw: ast.raw,
		});
	}

	if (_update_)
	{
		//console.dir(source);

		ast.old_raw = ast.raw;
		ast.raw = source;
		ast.changed = false;
	}

	return source;
}

export type INodePlus = {
	changed?: boolean,
	old_raw?: string,
}

export default exports as typeof import ('./index');
