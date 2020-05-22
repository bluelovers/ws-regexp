/**
 * Created by user on 2019/6/15.
 */
import { IOptionsOnCore } from 'regexp-cjk/lib/core';
import { AST } from "regexpp2";
export interface IZhRegExpCorePluginOptions {
    /**
     * just do it
     */
    escapeAll?: boolean;
    /**
     * auto detect do or not
     * @default true
     */
    escapeAuto?: boolean;
}
/**
 * use regexpu for escape unicode property
 * avoid some system or browser not fully support unicode property
 */
export declare function createZhRegExpCorePlugin(options?: IZhRegExpCorePluginOptions): IOptionsOnCore;
export declare function astUnicodePropertyCharacterSet(ast: AST.NodeBase): ast is AST.UnicodePropertyCharacterSet;
export declare function checkUnicodePropertyEscape(ast: AST.UnicodePropertyCharacterSet): boolean;
export declare function unicodePropertyEscape(raw: string, flags: string, useUnicodeFlag: boolean): any;
export default createZhRegExpCorePlugin;
