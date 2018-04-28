/**
 * Created by user on 2018/4/28/028.
 */

import support from 'regexp-support';
import LIB, { getNativeFlags, stripNonNativeFlags } from './lib';

export const nativeFlags = support.nativeFlags;

export { getNativeFlags, stripNonNativeFlags };

import * as self from './index';
export default self;
