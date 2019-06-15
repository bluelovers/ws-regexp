/**
 * Created by user on 2019/6/15.
 */

import Parser, {
	astToString,
	fakePatternToRegExpLiteral,
	parseFlags,
	parsePattern,
	INodePlus,
	IAstToStringOptions,
} from 'regexp-parser-literal';
import { AST } from 'regexpp2';

export function astOldRaw(ast: AST.NodeBase & INodePlus)
{
	if (ast.old_raw == null)
	{
		ast.old_raw = ast.raw;
	}

	return ast.old_raw
}

export function astNotChanged(ast: AST.NodeBase & INodePlus, notStrict?: boolean): boolean
{
	astOldRaw(ast);

	if (notStrict)
	{
		return ast.old_raw === ast.raw;
	}

	return !ast.changed && ast.old_raw === ast.raw
}
