'use strict';

import extend from 'lodash/defaults';
import Big from 'big.js';
import {
	predefineedTranscriptionConfigs,
	transcriptionConfigs,
	MIN_SAFE_INTEGER,
	MAX_SAFE_INTEGER,
} from './data/numbers';
import { getBits, getBit } from './util/numbers';

export * from './data/numbers';

export function transcribeNumber(number: number | string, config?): string
{
	if (typeof config === 'undefined')
	{
		// default config
		config = transcriptionConfigs['default'];
	}

	if (typeof config === 'string')
	{
		config = transcriptionConfigs[config];

		if (typeof config === 'undefined')
		{
			throw new ReferenceError('Transcription method "' + config + '" is undefined');
		}
	}

	if (typeof config === 'object')
	{
		config = extend({}, config, transcriptionConfigs['default']);
	}
	else
	{
		throw new Error('You specified unknown config to japanese.transcribeNumber');
	}

	if (typeof config.digits === 'string')
	{
		config.digits = predefineedTranscriptionConfigs.digits[config.digits];

		if (typeof config.digits === 'undefined')
		{
			throw new ReferenceError('Transcription method of digits "' + config.digits + '" is undefined');
		}
	}

	if (typeof config.unitNames === 'string')
	{
		config.unitNames = predefineedTranscriptionConfigs.unitNames[config.unitNames];

		if (typeof config.unitNames === 'undefined')
		{
			throw new ReferenceError('Transcription method of unitNames "' + config.unitNames + '" is undefined');
		}
	}

	if (typeof config.specialUnitNames === 'string')
	{
		config.specialUnitNames = predefineedTranscriptionConfigs.specialUnitNames[config.specialUnitNames];

		if (typeof config.specialUnitNames === 'undefined')
		{
			throw new ReferenceError('Transcription method of specialUnitNames "' + config.specialUnitNames + '" is undefined');
		}
	}

	if (typeof config.smallUnitNames === 'string')
	{
		config.smallUnitNames = predefineedTranscriptionConfigs.smallUnitNames[config.smallUnitNames];

		if (typeof config.smallUnitNames === 'undefined')
		{
			throw new ReferenceError('Transcription method of smallUnitNames "' + config.smallUnitNames + '" is undefined');
		}
	}

	// Unify input to string

	if (typeof number === 'number')
	{
		if (MIN_SAFE_INTEGER <= number && number < MAX_SAFE_INTEGER)
		{
			number = number.toString();
		}
		else
		{
			// Paste number into binary form
			const buf = Buffer.alloc(8);
			buf.writeDoubleBE(number, 0);

			let sign = getBit(buf, 0);
			let exponent = getBits(buf, 1, 11) as any as number;
			let mantissa = getBits(buf, 12, 52);
			let fraction: Big = null;

			exponent = parseInt(exponent.toString());

			if (exponent === 0)
			{
				fraction = mantissa;
				exponent = 1;
			}
			else
			{
				fraction = (new Big(2)).pow(52).plus(mantissa);
			}

			number = fraction.times((new Big(2)).pow(exponent - 1023 - 52)).toFixed();

			if (sign)
			{
				number = '-' + number;
			}
		}
	}
	else if (typeof number !== 'string')
	{
		throw new ReferenceError('Type of `number` is unsupported');
	}

	let length = number.length;

	// Main convertion starts here

	let lit = '';
	let restoreZero = false;
	if (config.unitNames.lit && length > config.unitNames.lit)
	{
		lit = number.slice(0, -config.unitNames.lit).split('').map(function (digit)
		{
			return config.digits[digit];
		}).join('');

		number = number.slice(-config.unitNames.lit);
		length = number.length;
		if (number[0] === '0')
		{
			restoreZero = true;
			number = '9' + number.slice(1);
		}
	}

	// handle zero
	if (number === '0')
	{
		return config.digits[0];
	}

	let transcription = '';

	if (number.slice(-1) !== '0')
	{
		transcription += config.digits[(number as string).slice(-1)];
	}

	// Get sanitized unit name keys
	let keysOfUnitNames = Object.keys(config.unitNames).map(function (key)
	{
		// convert to int
		return parseInt(key);
	}).filter(function (key, index, self)
	{
		// unique
		return self.indexOf(key) === index;
	}).filter(function (key)
	{
		// validate
		return isFinite(key) && key > 0;
	}).sort(function (a, b)
	{
		// asc sort
		return a - b;
	});

	keysOfUnitNames.forEach(function (key, index)
	{
		let nextKey = keysOfUnitNames[index + 1] || Infinity;
		// slice the digits spaned by the unit name
		let token = (number as string).slice(Math.max(length - nextKey, 0), Math.max(length - key, 0));

		if (token.length > 0)
		{
			// check if every number in the token is zero
			if (!token.split('').every(function (digit) { return digit === '0'; }))
			{
				// truncateOne
				if (config.truncateOne.indexOf(config.unitNames[key]) !== -1 && parseInt(token) === 1)
				{
					transcription = config.unitNames[key] + transcription;
				}
				else
				{
					transcription = transcribeNumber(token, config) + config.unitNames[key] + transcription;
				}
			}
		}
	});

	// Rejoin lit tokens
	if (restoreZero)
	{
		transcription = transcription.replace(new RegExp('^' + config.digits[9]), config.digits[0]);
	}
	transcription = lit + transcription;

	return transcription;
}

export default transcribeNumber
