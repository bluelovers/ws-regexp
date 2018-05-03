/**
 * Created by user on 2018/4/28/028.
 */

import support from 'regexp-support';
import LIB, { getNativeFlags, stripNonNativeFlags, isNativeFlags } from './lib';
import { parseRegularExpressionString } from './lib/parse';
import { isRegExp } from './lib/is';

export const nativeFlags = support.nativeFlags;

export { getNativeFlags, stripNonNativeFlags, isNativeFlags };

export { parseRegularExpressionString }
export { isRegExp };

import * as self from './index';
export default self;
