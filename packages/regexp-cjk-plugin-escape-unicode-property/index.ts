/**
 * Created by user on 2019/6/15.
 */

import { IOptionsOn, IOptionsOnCore, IRegExpUserInput } from 'regexp-cjk/lib/core';
import ParserEventEmitter, { INodeInput, ParserEventEmitterEvent } from 'regexp-parser-event';
import { rewritePatternCore } from '@regexp-cjk/rewrite-pattern';
import { AST, EnumKindCharacterSet } from "regexpp2";
import { astNotChanged } from 'regexp-cjk/lib/plugin';
import {
	escapeUnicodePropertyPatternCore,
	hasUnicodePropertyPattern,
} from '@regexp-cjk/escape-unicode-property';
import { handleOptions } from '@regexp-cjk/escape-unicode-property/lib/util';

export interface IZhRegExpCorePluginOptions
{
	/**
	 * just do it
	 */
	escapeAll?: boolean,
	/**
	 * auto detect do or not
	 * @default true
	 */
	escapeAuto?: boolean,
}

/**
 * use regexpu for escape unicode property
 * avoid some system or browser not fully support unicode property
 */
export function createZhRegExpCorePlugin(options: IZhRegExpCorePluginOptions = {}): IOptionsOnCore
{
	const { escapeAuto = true, escapeAll } = options;

	return {
		afterStart(opts)
		{
			if (escapeAuto || escapeAll)
			{
				const { str, flags } = opts;

				const _flags = flags || '';
				const useUnicodeFlag = _flags.includes('u');

				let ev = ParserEventEmitter.create(str, flags || '');

				let _do = escapeAll || escapeAuto && /\\p\{[^{}]+\}/i.test(str);

				const _escapeOpts = handleOptions({
					useUnicodeFlag,
				}, _flags)

				if (_do)
				{
					ev.on(ParserEventEmitterEvent.uniset, function (ast, eventName, ev)
					{
						if (astNotChanged(ast) && astUnicodePropertyCharacterSet(ast))
						{
							let raw = escapeUnicodePropertyPatternCore(ast.raw, _escapeOpts.flags, _escapeOpts.options);

							if (raw !== ast.raw)
							{
								ast.raw = raw;

								ev.emitChange(ast);
							}
						}
					});

					ev.on(ParserEventEmitterEvent.class, function (ast, eventName, ev)
					{
						if (astNotChanged(ast) && hasUnicodePropertyPattern(ast.raw))
						{
							let raw = escapeUnicodePropertyPatternCore(ast.raw, _escapeOpts.flags, _escapeOpts.options);

							if (raw !== ast.raw)
							{
								ast.raw = raw;

								delete ast.elements;

								ev.emitChange(ast);
							}
						}

					});

				}

				ev.resume();

				opts.str = ev.getSource();
			}

			return opts;
		}
	}
}

export function astUnicodePropertyCharacterSet(ast: AST.NodeBase): ast is AST.UnicodePropertyCharacterSet
{
	return ((ast as AST.CharacterSet).kind === EnumKindCharacterSet.UnicodePropertyCharacterSet);
}

export function checkUnicodePropertyEscape(ast: AST.UnicodePropertyCharacterSet)
{
	if (ast.value == 'Punctuation')
	{
		return true;
	}
}

/**
 * use @regexp-cjk/escape-unicode-property
 *
 * @deprecated
 */
export function unicodePropertyEscape(raw: string, flags: string, useUnicodeFlag: boolean)
{
	return rewritePatternCore(raw, flags, {
		unicodePropertyEscape: true,
		useUnicodeFlag,
	})
}

export default createZhRegExpCorePlugin
