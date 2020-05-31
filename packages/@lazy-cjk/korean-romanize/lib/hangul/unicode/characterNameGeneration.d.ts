/**
 * Generates a letter/jamo-derived short name for a given precomposed Hangul syllable
 *
 * @param {(string|integer)} s
 * @returns {string} Unicode Hangul syllable short name
 */
export declare function getHangulCharShortName(s: any): string;
/**
 * Constructs a precomposed Hangul syllable name
 *
 * Based on "Hangul Character Name Generation" as described in Unicode core
 * specification for sample code for Hangul algorithms, under section
 * "3.12 Conjoining Jamo Behavior" (pp. 142-151)
 *
 * @param {(string|integer)} s
 * @returns {string} Unicode Hangul syllable name
 */
export declare function getHangulCharName(s: any): string;
