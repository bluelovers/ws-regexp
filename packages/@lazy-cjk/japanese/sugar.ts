/**
 * @deprecated
 */
export * from './index';
import japanese from './index';

const methods = [
	'hiraganize',
	'katakanize',
	'romanize',
] as const;

methods.forEach(function (method) {
	Object.defineProperty(String.prototype, method, {
		value: function () {
			// @ts-ignore
			return japanese[method].apply(this, [this].concat(arguments));
		},
		enumerable: false,
		configurable: true,
		writable: true,
	});
});

export default japanese;
