/**
 * Computes TIndex for a given TPart
 *
 * @param {integer} TPart
 * @returns {integer}
 */
export declare function computeTIndexFromTPart(TPart?: number): number;
/**
 * Computes a precomposed/composite syllable mapping for a given a Hangul letter (jamo) sequence
 *
 * Based on "Arithmetic Primary Composite Mapping" as described in Unicode core
 * specification for Hangul syllable composition.
 *
 * In other words:
 *
 * This function computes the code point for a precomposed/composite Hangul syllable
 * algorithmically for a given sequence of Hangul letter (jamo) code points.
 *
 * The algorithm is described in the core spec (v. 12.1, Chapter 3), under section
 * "3.12 Conjoining Jamo Behavior" (pp. 142-151).
 *
 * @param {integer} LPart
 * @param {integer} VPart
 * @param {integer} TPart
 * @returns {integer}
 */
export declare function arithmeticPrimaryCompositeMapping(LPart: any, VPart: any, TPart: any): number;
export declare function arithmeticPrimaryCompositeMappingWithLVPart(LVPart: any, TPart: any): any;
