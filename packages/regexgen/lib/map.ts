import State from './state';

/**
 * This ES6 Map subclass calls the getter function passed to
 * the constructor to initialize undefined properties when they
 * are first retrieved.
 */
export class DefaultMap<K = State, V = State> extends Map<K, V>
{
	defaultGetter: (key: K) => V

	constructor(iterable: (key: K) => V, defaultGetter?: (key: K) => V)
	{
		if (typeof iterable === 'function')
		{
			defaultGetter = iterable;
			iterable = null;
		}

		// @ts-ignore
		super(iterable);
		this.defaultGetter = defaultGetter;
	}

	override get(key)
	{
		if (!super.has(key))
		{
			let res = this.defaultGetter(key);
			this.set(key, res);
			return res;
		}

		return super.get(key);
	}

}

export default DefaultMap;
