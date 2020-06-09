import State from './state';

/**
 * This class extends the native ES6 Set class with some additional methods
 */
export class ExtendedSet<V = State> extends Set<V>
{
	filter(fn: (value: V) => boolean): ExtendedSet<V>
	{
		let res = new ExtendedSet<V>();
		for (let x of this)
		{
			if (fn(x))
			{
				res.add(x);
			}
		}

		return res;
	}

	difference(b: ExtendedSet<V>)
	{
		return this.filter(x => !b.has(x));
	}

	intersection(b: ExtendedSet<V>)
	{
		return this.filter(x => b.has(x));
	}

	equals(b: ExtendedSet<V>)
	{
		if (this.size !== b.size)
		{
			return false;
		}

		for (let x of this)
		{
			if (!b.has(x))
			{
				return false;
			}
		}

		return true;
	}

	find(fn: (value: V) => boolean)
	{
		for (let x of this)
		{
			if (fn(x))
			{
				return x;
			}
		}

		return null;
	}

	first(): V
	{
		return this.values().next().value;
	}

	shift()
	{
		let v = this.first();
		this.delete(v);
		return v;
	}

	replace(search: V, ...replacements: V[])
	{
		if (this.delete(search))
		{
			this.addAll(replacements);
		}
	}

	addAll(items: V[])
	{
		for (let x of items)
		{
			this.add(x);
		}
	}
}

export default ExtendedSet;
