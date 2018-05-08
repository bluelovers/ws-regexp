
import * as cloneRegexp from 'clone-regexp';

function execAll(input, str) {
	var match;
	var matches = [];
	var re = cloneRegexp(input);
	var isGlobal = re.global;

	while (match = re.exec(str)) {
		matches.push({
			match: match[0],
			sub: match.slice(1),
			index: match.index
		})

		if (!isGlobal) {
			break;
		}
	}

	return matches;
}

export = execAll
