/**
 * Created by user on 2018/4/28/028.
 */

export * from 'regexp-helper-core';
import support from 'regexp-support';
import LIB, { getNativeFlags, stripNonNativeFlags, isNativeFlags } from './lib';
import { parseRegularExpressionString } from './lib/parse';

export const nativeFlags = support.nativeFlags;

export { getNativeFlags, stripNonNativeFlags, isNativeFlags };

export { parseRegularExpressionString }

import * as self from './index';
export default self;
