#!/usr/bin/env node

import { romanize } from '../lib/romanize';

const { argv } = process;

const output = argv
	.slice(2)
	.map(romanize)
	.join(" ");

console.log(output);
