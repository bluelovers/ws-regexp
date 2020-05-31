const getUnicodeDataFor = require("./getData");

function getMapping(mapping)
{
	// "mapping": "<compat> 1100",
	if (mapping && typeof mapping === "string" && mapping.includes("<compat>"))
	{
		return String.fromCodePoint(parseInt(mapping.split(" ")[1], 16));
	}
}

/**
 * Produces an array of objects for each jamo for given range
 *
 * @param {integer} offset
 * @param {integer} numCurrent
 * @param {integer} numTotal
 */
function indexCompatJamo(
	offset = 0x3131,
	limit = 0x318e - offset,
	numCurrent?,
)
{
	return Array(limit)
		.fill({})
		.map((p, idx) =>
		{
			const codePoint = offset + idx;
			const unicodeData = getUnicodeDataFor(codePoint);
			const mapsTo = getMapping(unicodeData.mapping);

			return {
				jamo: String.fromCodePoint(offset + idx),
				archaic: idx + 1 > numCurrent,
				mapsTo,
				unicodeData,
			};
		});
}

export = indexCompatJamo();
