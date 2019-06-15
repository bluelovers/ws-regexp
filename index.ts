/**
 * Created by user on 2019/6/15.
 */

import { array_unique_overwrite } from 'array-hyper-unique'
import StrUtil from 'str-util';
import { FullHalfCore, toFullNumber, toHalfNumber, toFullEnglish, toHalfEnglish, toFullWidth, toHalfWidth } from 'str-util/lib/fullhalf';
import { _get as _getArrayTable } from 'cjk-conv/lib/zh/table/table';
import { IOptionsOn, IOptionsOnCore, IRegExpUserInput } from 'regexp-cjk/lib/core';
import UString from 'uni-string/src/core';
import getVoiceAll from 'cjk-conv/lib/jp/table_voice';
import ParserEventEmitter, { INodeInput, ParserEventEmitterEvent } from 'regexp-parser-event';
import rewritePattern from 'regexpu-core';
import { AST, EnumKindCharacterSet } from "regexpp2";
import { NodeBase } from 'regexpp2/src/ast';
import { IGetSettingOptions } from 'regexp-cjk/lib/mergeOptions';
import { astNotChanged } from 'regexp-cjk/lib/plugin';

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

				if (_do)
				{
					ev.on(ParserEventEmitterEvent.uniset, function (ast, eventName, ev)
					{
						if (astNotChanged(ast) && astUnicodePropertyCharacterSet(ast))
						{
							let raw = unicodePropertyEscape(ast.raw, _flags, useUnicodeFlag);

							if (raw !== ast.raw)
							{
								ast.raw = raw;

								ev.emitChange(ast);
							}
						}
					});

					ev.on(ParserEventEmitterEvent.class, function (ast, eventName, ev)
					{
						if (astNotChanged(ast) && /\\p{/.test(ast.raw))
						{
							let raw = unicodePropertyEscape(ast.raw, _flags, useUnicodeFlag);

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

export function unicodePropertyEscape(raw: string, flags: string, useUnicodeFlag: boolean)
{
	return rewritePattern(raw, flags, {
		unicodePropertyEscape: true,
		useUnicodeFlag,
	})
}

export default createZhRegExpCorePlugin
