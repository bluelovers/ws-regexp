/**
 * Created by user on 2019/6/15.
 */
import { INodePlus } from 'regexp-parser-literal';
import { AST } from 'regexpp2';
export declare function astOldRaw(ast: AST.NodeBase & INodePlus): string;
export declare function astNotChanged(ast: AST.NodeBase & INodePlus, notStrict?: boolean): boolean;
