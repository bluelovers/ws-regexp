'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.romanize = void 0;
const tslib_1 = require("tslib");
const kana_1 = require("./kana");
const extend_1 = tslib_1.__importDefault(require("lodash/extend"));
const romanize_1 = require("./data/romanize");
tslib_1.__exportStar(require("./data/romanize"), exports);
/**
 * Convert input text into romaji.
 *
 * important: Most definitions of Japanese text romanizations require total recognition of Japanese text, but robots cannot actually think or understand! Some conversions are hopelessly poor. For example, ISO 3602 defines that "こうし" which means "講師" must be romanized as "kôsi", while "こうし" which means "子牛" must be romanized as "kousi" (because 子牛 is mixed word of 子 and 牛), though these are apparently the same in Kana-form. While japanese.js is very... very very thoroughly tested, this module (and any other romanization machines) cannot distinguish between these semantics. So unfortunately, you cannot use this function for official writing or something. Ugh.
 */
function romanize(string, config) {
    if (typeof config === 'undefined') {
        config = 'wikipedia';
    }
    if (typeof config === 'string') {
        config = romanize_1.romanizationConfigs[config];
        if (typeof config === 'undefined') {
            throw new ReferenceError('Romanization method "' + config + '" is undefined');
        }
    }
    if (typeof config === 'object') {
        config = (0, extend_1.default)({}, romanize_1.defaultRomanizationConfig, config);
    }
    else {
        throw new Error('You specified unknown config to japanese.romanize');
    }
    const table = (0, extend_1.default)({}, romanize_1.romanizationTable);
    if (config['し'] === 'shi') {
        (0, extend_1.default)(table, {
            'し': 'shi',
            'しゃ': 'sha',
            'しゅ': 'shu',
            'しぇ': 'she',
            'しょ': 'sho',
        });
    }
    if (config['ち'] === 'chi') {
        (0, extend_1.default)(table, {
            'ち': 'chi',
            'ちゃ': 'cha',
            'ちゅ': 'chu',
            'ちぇ': 'che',
            'ちょ': 'cho',
            'てぃ': 'ti',
            'てゅ': 'tyu',
        });
    }
    if (config['つ'] === 'tsu') {
        (0, extend_1.default)(table, {
            'つ': 'tsu',
            'つぁ': 'tsa',
            'つぃ': 'tsi',
            'つぇ': 'tse',
            'つぉ': 'tso',
            'つゅ': 'tsyu',
            'とぅ': 'tu',
        });
    }
    if (config['ふ'] === 'fu') {
        (0, extend_1.default)(table, {
            'ふ': 'fu',
            'ふぁ': 'fa',
            'ふぃ': 'fi',
            'ふぇ': 'fe',
            'ふぉ': 'fo',
            'ふゃ': 'fya',
            'ふゅ': 'fyu',
            'ふょ': 'fyo',
        });
    }
    if (config['じ'] === 'ji') {
        (0, extend_1.default)(table, {
            'じ': 'ji',
            'じゃ': 'ja',
            'じゅ': 'ju',
            'じぇ': 'je',
            'じょ': 'jo',
        });
    }
    if (config['ぢ'] === 'ji') {
        (0, extend_1.default)(table, {
            'ぢ': 'ji',
            'ぢゃ': 'ja',
            'ぢゅ': 'ju',
            'ぢぇ': 'je',
            'ぢょ': 'jo',
            'でぃ': 'di',
            'でゅ': 'dyu',
        });
    }
    if (config['ぢ'] === 'zi') {
        (0, extend_1.default)(table, {
            'ぢ': 'zi',
            'ぢゃ': 'zya',
            'ぢゅ': 'zyu',
            'ぢぇ': 'zye',
            'ぢょ': 'zyo',
            'でぃ': 'di',
            'でゅ': 'dyu',
        });
    }
    if (config['ぢ'] === 'dji') {
        (0, extend_1.default)(table, {
            'ぢ': 'dji',
            'ぢゃ': 'dja',
            'ぢゅ': 'dju',
            'ぢぇ': 'dje',
            'ぢょ': 'djo',
            'でぃ': 'di',
            'でゅ': 'dyu',
        });
    }
    if (config['ぢ'] === 'dzi') {
        (0, extend_1.default)(table, {
            'ぢ': 'dzi',
            'ぢゃ': 'dzya',
            'ぢゅ': 'dzyu',
            'ぢぇ': 'dzye',
            'ぢょ': 'dzyo',
            'でぃ': 'di',
            'でゅ': 'dyu',
        });
    }
    if (config['づ'] === 'zu') {
        (0, extend_1.default)(table, {
            'づ': 'zu',
            'づぁ': 'zua',
            'づぃ': 'zui',
            'づぇ': 'zue',
            'づぉ': 'zuo',
            'どぅ': 'du',
        });
    }
    if (config['づ'] === 'dsu') {
        (0, extend_1.default)(table, {
            'づ': 'dsu',
            'づぁ': 'dsua',
            'づぃ': 'dsui',
            'づぇ': 'dsue',
            'づぉ': 'dsuo',
            'どぅ': 'du',
        });
    }
    if (config['づ'] === 'dzu') {
        (0, extend_1.default)(table, {
            'づ': 'dzu',
            'づぁ': 'dzua',
            'づぃ': 'dzui',
            'づぇ': 'dzue',
            'づぉ': 'dzuo',
            'どぅ': 'du',
        });
    }
    if (config['ゐ'] === 'i') {
        (0, extend_1.default)(table, {
            'ゐ': 'i',
            'ゑ': 'e',
        });
    }
    if (config['を'] === 'o') {
        (0, extend_1.default)(table, {
            'を': 'o',
        });
    }
    string = (0, kana_1.hiraganize)(string);
    let dest = '';
    let previousToken = '';
    while (string.length > 0) {
        let token = '';
        // assuming we have only one or two letter token in table
        if (table[string.slice(0, 2)]) {
            token = string.slice(0, 2);
            string = string.slice(2);
        }
        else {
            token = string[0];
            string = string.slice(1);
        }
        // handle small tsu
        if (token === 'っ') {
            previousToken = token;
            continue;
        }
        let tokenDest = table[token] || '';
        // small tsu
        if (previousToken === 'っ') {
            if (tokenDest.match(/^[^aiueo]/)) {
                if (token[0] === 'ち') {
                    if (config['っち'] === 'tchi') {
                        tokenDest = {
                            'ち': 'tchi',
                            'ちゃ': 'tcha',
                            'ちゅ': 'tchu',
                            'ちぇ': 'tche',
                            'ちょ': 'tcho',
                        }[token];
                    }
                    else if (config['っち'] === 'cchi') {
                        tokenDest = {
                            'ち': 'cchi',
                            'ちゃ': 'ccha',
                            'ちゅ': 'cchu',
                            'ちぇ': 'cche',
                            'ちょ': 'ccho',
                        }[token];
                    }
                    else { // normally 'tti'
                        tokenDest = {
                            'ち': 'tti',
                            'ちゃ': 'ttya',
                            'ちゅ': 'ttyu',
                            'ちぇ': 'ttye',
                            'ちょ': 'ttyo',
                        }[token];
                    }
                }
                else {
                    tokenDest = tokenDest[0] + tokenDest;
                }
            }
            else {
                /*
                 * Some article claims that "ローマ字教育の指針(文部科学省)" defines that
                 * strings ending with "っ" must be represented with trailing apostrophe
                 * though I couldn't confirm.
                 */
                dest += '\'';
            }
        }
        // long vowel
        if (token === 'ー') {
            if (dest.match(/[aiueo]$/)) {
                if (config['あー'] === 'a') {
                    // nope
                }
                else if (config['あー'] === 'ah') {
                    dest += 'h';
                }
                else if (config['あー'] === 'a-') {
                    dest += '-';
                }
                else if (config['あー'] === 'aa') {
                    dest = dest.slice(0, -1) + {
                        'a': 'aa',
                        'i': 'ii',
                        'u': 'uu',
                        'e': 'ee',
                        'o': 'oo',
                    }[dest.slice(-1)];
                }
                else if (config['あー'] === 'â') {
                    dest = dest.slice(0, -1) + {
                        'a': 'â',
                        'i': 'î',
                        'u': 'û',
                        'e': 'ê',
                        'o': 'ô',
                    }[dest.slice(-1)];
                }
                else if (config['あー'] === 'ā') {
                    dest = dest.slice(0, -1) + {
                        'a': 'ā',
                        'i': 'ī',
                        'u': 'ū',
                        'e': 'ē',
                        'o': 'ō',
                    }[dest.slice(-1)];
                }
                tokenDest = '';
            }
            else {
                tokenDest = '-';
            }
        }
        else if (dest.slice(-1) === 'e' && tokenDest[0] === 'i') {
            tokenDest = tokenDest.slice(1);
            if (config['えい'] === 'ei') {
                dest += 'i';
            }
            else if (config['えい'] === 'ee') {
                dest += 'e';
            }
            else if (config['えい'] === 'eh') {
                dest += 'h';
            }
            else if (config['えい'] === 'ê') {
                dest = dest.slice(0, -1) + 'ê';
            }
            else if (config['えい'] === 'ē') {
                dest = dest.slice(0, -1) + 'ē';
            }
            else if (config['えい'] === 'e') {
                // nope
            }
        }
        else if (dest.slice(-1) === 'o' && tokenDest[0] === 'u') {
            tokenDest = tokenDest.slice(1);
            if (config['おう'] === 'ou') {
                dest += 'u';
            }
            else if (config['おう'] === 'oo') {
                dest += 'o';
            }
            else if (config['おう'] === 'oh') {
                dest += 'h';
            }
            else if (config['おう'] === 'ô') {
                dest = dest.slice(0, -1) + 'ô';
            }
            else if (config['おう'] === 'ō') {
                dest = dest.slice(0, -1) + 'ō';
            }
            else if (config['おう'] === 'o') {
                // nope
            }
        }
        else if (dest.match(/[aiueo]$/) && dest.slice(-1) === tokenDest[0] && token !== 'を') {
            tokenDest = tokenDest.slice(1);
            dest = dest.slice(0, -1) + config[{
                'a': 'ああ',
                'i': 'いい',
                'u': 'うう',
                'e': 'ええ',
                'o': 'おお',
            }[dest.slice(-1)]];
        }
        // んば
        if (tokenDest.match(/^[bpm]/) && previousToken === 'ん') {
            if (config['んば'] === 'nba') {
                // nope
            }
            else if (config['んば'] === 'mba') {
                dest = dest.slice(0, -1) + 'm';
            }
        }
        // んあ
        if (tokenDest.match(/^[aiueoy]/) && previousToken === 'ん') {
            if (config['んあ'] === 'na') {
                // nope
            }
            else if (config['んあ'] === 'n\'a') {
                tokenDest = '\'' + tokenDest;
            }
            else if (config['んあ'] === 'n-a') {
                tokenDest = '-' + tokenDest;
            }
        }
        if (config.punctuation && romanize_1.romanizePuncutuationTable[token]) {
            tokenDest = romanize_1.romanizePuncutuationTable[token];
        }
        dest += tokenDest;
        previousToken = token;
    }
    if (previousToken === 'っ') {
        dest += '\'';
    }
    return dest;
}
exports.romanize = romanize;
exports.default = romanize;
//# sourceMappingURL=romanize.js.map