/**
 * Created by user on 2018/1/31/031.
 */
import { IAstToStringOptions } from 'regexp-parser-literal';
import { INodeInput, IParserEventEmitterListener, ParserEventEmitter, ParserEventEmitterEvent } from 'regexp-parser-event';
import { ICoreHandlerReturn, IOptions, IOptionsCore, IOptionsInput, IOptionsOn, IOptionsRuntime, IRegExpUserInput, SymDefaults } from './lib/core';
import { isRegExp } from 'regexp-helper-core';
import { IOptions as IOptionsZhTable } from '@lazy-cjk/zh-table-list';
import * as RegexpHelper from 'regexp-helper-core';
import { parseRegularExpressionString } from './lib/getSource';
export * from './version';
export { ParserEventEmitterEvent, ParserEventEmitter, INodeInput, IParserEventEmitterListener, IAstToStringOptions };
export { IOptions, IOptionsRuntime, IOptionsInput, ICoreHandlerReturn, IOptionsOn, IOptionsCore };
export { IOptionsZhTable };
/**
 * @deprecated
 */
export declare const defaultOptions: IOptions;
export declare class zhRegExp extends RegExp {
    source: string;
    flags: string;
    dotAll: boolean;
    ignoreCase: boolean;
    global: boolean;
    multiline: boolean;
    sticky: boolean;
    unicode: boolean;
    lastIndex: number;
    /**
     * The non-standard leftContext property is a static and read-only property of regular expressions that contains the substring preceding the most recent match. RegExp.$` is an alias for this property.
     *
     * @alias $`
     */
    static readonly leftContext: string;
    /**
     * The non-standard rightContext property is a static and read-only property of regular expressions that contains the substring following the most recent match. RegExp.$' is an alias for this property.
     *
     * @alias $'
     */
    static readonly rightContext: string;
    /**
     * The non-standard lastParen property is a static and read-only property of regular expressions that contains the last parenthesized substring match, if any. RegExp.$+ is an alias for this property.
     *
     * @alias $+
     */
    static readonly lastParen: string;
    /**
     * The non-standard lastMatch property is a static and read-only property of regular expressions that contains the last matched characters. RegExp.$& is an alias for this property.
     *
     * @alias $&
     */
    static readonly lastMatch: string;
    /**
     * The non-standard input property is a static property of regular expressions that contains the string against which a regular expression is matched. RegExp.$_ is an alias for this property.
     *
     * @alias $_
     */
    static readonly input: string;
    /**
     * default value only exists and work when use `zhRegExp.use(defaultOptions)`
     */
    static readonly [SymDefaults]: IOptionsInput;
    /**
     * create a new zhRegExp class with default value
     * @example `zhRegExp.use(defaultOptions)`
     */
    static use(defaultOptions: IOptionsInput): typeof zhRegExp;
    constructor(str: IRegExpUserInput, options?: IOptionsInput, ...argv: any[]);
    constructor(str: IRegExpUserInput, flags?: string, options?: IOptionsInput, ...argv: any[]);
    constructor(str: IRegExpUserInput, flags: string, skip: string, ...argv: any[]);
    constructor(str: IRegExpUserInput, flags: string, options?: IOptionsInput | string, ...argv: any[]);
    static create<T = zhRegExp>(str: IRegExpUserInput, flags?: string, options?: IOptionsInput | string): T;
    static create<T = zhRegExp>(str: IRegExpUserInput, options?: IOptionsInput): T;
    getStatic<T = typeof zhRegExp>(): T;
    /**
     * @todo
     */
    toRegularExpressionString(): string;
    static parseRegularExpressionString(str: string): {
        source: string;
        flags: string;
        slash: string;
        input: string;
    };
    static get support(): Readonly<{
        nativeFlags: string;
        flags: {
            readonly multiline: boolean;
            readonly m: boolean;
            readonly global: boolean;
            readonly g: boolean;
            readonly ignoreCase: boolean;
            readonly i: boolean;
            readonly sticky: boolean;
            readonly y: boolean;
            readonly unicode: boolean;
            readonly u: boolean;
            readonly dotAll: boolean;
            readonly s: boolean;
            readonly freeSpacing: boolean;
            readonly x: boolean;
            readonly n: boolean;
        };
        flagsAll: {
            [key: string]: boolean;
            g: boolean;
            i: boolean;
            m: boolean;
            s: boolean;
            u: boolean;
            y: boolean;
        };
        pattern: {
            namedCapturingGroups: boolean;
            namedCapturingGroupsUnicode: boolean;
            namedCapturingGroupsEmoji: boolean;
            namedCapturingGroupsBackreference: boolean;
            namedCapturingGroupsDuplicate: boolean;
            lookAheadPositive: boolean;
            lookAheadNegative: boolean;
            lookBehindPositive: boolean;
            lookBehindNegative: boolean;
            dotUnicodeEmoji: boolean;
            classSub: boolean;
            unicodeWrap: boolean;
        };
        prototype: {
            readonly dotAll?: boolean;
            exec?: boolean;
            test?: boolean;
            readonly source?: boolean;
            readonly global?: boolean;
            readonly ignoreCase?: boolean;
            readonly multiline?: boolean;
            lastIndex?: boolean;
            compile?: boolean;
            readonly flags?: boolean;
            readonly sticky?: boolean;
            readonly unicode?: boolean;
        };
        static: {
            $10?: boolean;
            $100?: boolean;
            readonly prototype?: boolean;
            $1?: boolean;
            $2?: boolean;
            $3?: boolean;
            $4?: boolean;
            $5?: boolean;
            $6?: boolean;
            $7?: boolean;
            $8?: boolean;
            $9?: boolean;
            lastMatch?: boolean;
            input?: boolean;
            $_?: boolean;
            '$&'?: boolean;
            lastParen?: boolean;
            '$+'?: boolean;
            leftContext?: boolean;
            '$`'?: boolean;
            rightContext?: boolean;
            '$\''?: boolean;
        };
        symbol: {
            species: boolean;
            match: boolean;
            replace: boolean;
            search: boolean;
            split: boolean;
        };
        objectStringTag: string;
        unicodeSet: {
            unicode: boolean;
            script: boolean;
            blocks: boolean;
            unicodeTest: Partial<{
                White_Space: boolean;
                Letter: boolean;
                Lower: boolean;
                Upper: boolean;
                Alpha: boolean;
                Digit: boolean;
                Alnum: boolean;
                Punct: boolean;
                Graph: boolean;
                Blank: boolean;
                Cntrl: boolean;
                XDigit: boolean;
                Space: boolean;
                Decimal_Digit_Number: boolean;
                Ideographic: boolean;
                Unified_Ideograph: boolean;
                Cased_Letter: boolean;
                LC: boolean;
                Close_Punctuation: boolean;
                Pe: boolean;
                Connector_Punctuation: boolean;
                Pc: boolean;
                Control: boolean; /**
                 * The non-standard lastMatch property is a static and read-only property of regular expressions that contains the last matched characters. RegExp.$& is an alias for this property.
                 *
                 * @alias $&
                 */
                Cc: boolean;
                cntrl: boolean;
                Currency_Symbol: boolean;
                Sc: boolean;
                Dash_Punctuation: boolean;
                Pd: boolean;
                Decimal_Number: boolean;
                Nd: boolean;
                digit: boolean;
                Enclosing_Mark: boolean;
                Me: boolean;
                Final_Punctuation: boolean;
                Pf: boolean;
                Format: boolean;
                Cf: boolean;
                Initial_Punctuation: boolean;
                Pi: boolean;
                L: boolean;
                Letter_Number: boolean;
                Nl: boolean;
                Line_Separator: boolean;
                Zl: boolean;
                Lowercase_Letter: boolean;
                Ll: boolean;
                Mark: boolean;
                M: boolean;
                Combining_Mark: boolean;
                Math_Symbol: boolean;
                Sm: boolean;
                Modifier_Letter: boolean;
                Lm: boolean;
                Modifier_Symbol: boolean;
                Sk: boolean; /**
                 * create a new zhRegExp class with default value
                 * @example `zhRegExp.use(defaultOptions)`
                 */
                Nonspacing_Mark: boolean;
                Mn: boolean;
                Number: boolean;
                N: boolean;
                Open_Punctuation: boolean;
                Ps: boolean;
                Other: boolean;
                C: boolean;
                Other_Letter: boolean;
                Lo: boolean;
                Other_Number: boolean;
                No: boolean;
                Other_Punctuation: boolean;
                Po: boolean;
                Other_Symbol: boolean;
                So: boolean;
                Paragraph_Separator: boolean;
                Zp: boolean;
                Private_Use: boolean;
                Co: boolean;
                Punctuation: boolean;
                P: boolean;
                punct: boolean;
                Separator: boolean;
                Z: boolean;
                Space_Separator: boolean;
                Zs: boolean;
                Spacing_Mark: boolean;
                Mc: boolean;
                Surrogate: boolean;
                Cs: boolean;
                Symbol: boolean;
                S: boolean;
                Titlecase_Letter: boolean;
                Lt: boolean;
                Unassigned: boolean;
                Cn: boolean;
                Uppercase_Letter: boolean;
                Lu: boolean;
                ASCII: boolean;
                ASCII_Hex_Digit: boolean;
                AHex: boolean;
                Alphabetic: boolean;
                Any: boolean;
                Assigned: boolean;
                Bidi_Control: boolean;
                Bidi_C: boolean;
                Bidi_Mirrored: boolean;
                Bidi_M: boolean;
                Case_Ignorable: boolean;
                CI: boolean;
                Cased: boolean;
                Changes_When_Casefolded: boolean;
                CWCF: boolean;
                Changes_When_Casemapped: boolean;
                CWCM: boolean;
                Changes_When_Lowercased: boolean;
                CWL: boolean;
                Changes_When_NFKC_Casefolded: boolean;
                CWKCF: boolean;
                Changes_When_Titlecased: boolean;
                CWT: boolean;
                Changes_When_Uppercased: boolean;
                CWU: boolean;
                Dash: boolean;
                Default_Ignorable_Code_Point: boolean;
                DI: boolean;
                Deprecated: boolean;
                Dep: boolean;
                Diacritic: boolean;
                Dia: boolean;
                Emoji: boolean;
                Emoji_Component: boolean;
                Emoji_Modifier: boolean;
                Emoji_Modifier_Base: boolean;
                Emoji_Presentation: boolean;
                Extender: boolean;
                Ext: boolean;
                Grapheme_Base: boolean;
                Gr_Base: boolean;
                Grapheme_Extend: boolean;
                Gr_Ext: boolean;
                Hex_Digit: boolean;
                Hex: boolean;
                IDS_Binary_Operator: boolean;
                IDSB: boolean;
                IDS_Trinary_Operator: boolean;
                IDST: boolean;
                ID_Continue: boolean;
                IDC: boolean;
                ID_Start: boolean;
                IDS: boolean;
                Ideo: boolean;
                Join_Control: boolean;
                Join_C: boolean;
                Logical_Order_Exception: boolean;
                LOE: boolean;
                Lowercase: boolean;
                /**
                 * The non-standard leftContext property is a static and read-only property of regular expressions that contains the substring preceding the most recent match. RegExp.$` is an alias for this property.
                 *
                 * @alias $`
                 */
                Math: boolean;
                Noncharacter_Code_Point: boolean;
                NChar: boolean;
                Pattern_Syntax: boolean;
                Pat_Syn: boolean;
                Pattern_White_Space: boolean;
                Pat_WS: boolean;
                Quotation_Mark: boolean;
                QMark: boolean;
                Radical: boolean;
                Regional_Indicator: boolean;
                RI: boolean;
                Sentence_Terminal: boolean;
                STerm: boolean;
                Soft_Dotted: boolean;
                SD: boolean;
                Terminal_Punctuation: boolean;
                Term: boolean;
                UIdeo: boolean;
                Uppercase: boolean;
                Variation_Selector: boolean;
                VS: boolean;
                space: boolean;
                XID_Continue: boolean;
                XIDC: boolean;
                XID_Start: boolean;
                XIDS: boolean;
            }>;
            scriptTest: Partial<{
                Greek: boolean;
                Latin: boolean;
                Katakana: boolean;
                Hiragana: boolean;
                Han: boolean;
                Hangul: boolean;
                Adlam: boolean;
                Adlm: boolean;
                Ahom: boolean;
                Anatolian_Hieroglyphs: boolean;
                Hluw: boolean;
                Arabic: boolean;
                Arab: boolean;
                Armenian: boolean;
                Armn: boolean;
                Avestan: boolean;
                Avst: boolean;
                Balinese: boolean;
                Bali: boolean;
                Bamum: boolean;
                Bamu: boolean;
                Bassa_Vah: boolean;
                Bass: boolean;
                Batak: boolean;
                Batk: boolean;
                Bengali: boolean;
                Beng: boolean;
                Bhaiksuki: boolean;
                Bhks: boolean;
                Bopomofo: boolean;
                Bopo: boolean;
                Brahmi: boolean;
                Brah: boolean;
                Braille: boolean;
                Brai: boolean;
                Buginese: boolean;
                Bugi: boolean;
                Buhid: boolean;
                Buhd: boolean;
                Canadian_Aboriginal: boolean;
                Cans: boolean;
                Carian: boolean;
                Cari: boolean;
                Caucasian_Albanian: boolean;
                Aghb: boolean;
                Chakma: boolean;
                Cakm: boolean;
                Cham: boolean;
                Cherokee: boolean;
                Cher: boolean;
                Common: boolean;
                Zyyy: boolean;
                Coptic: boolean;
                Copt: boolean;
                Qaac: boolean;
                Cuneiform: boolean;
                Xsux: boolean;
                Cypriot: boolean;
                Cprt: boolean;
                Cyrillic: boolean;
                Cyrl: boolean;
                Deseret: boolean;
                Dsrt: boolean;
                Devanagari: boolean;
                Deva: boolean;
                Duployan: boolean;
                Dupl: boolean;
                Egyptian_Hieroglyphs: boolean;
                Egyp: boolean;
                Elbasan: boolean;
                Elba: boolean;
                Ethiopic: boolean;
                Ethi: boolean;
                Georgian: boolean;
                Geor: boolean;
                Glagolitic: boolean;
                Glag: boolean;
                Gothic: boolean;
                Goth: boolean;
                Grantha: boolean;
                Gran: boolean;
                Grek: boolean;
                Gujarati: boolean;
                Gujr: boolean;
                Gurmukhi: boolean;
                Guru: boolean;
                Hani: boolean;
                Hang: boolean;
                Hanunoo: boolean;
                Hano: boolean;
                Hatran: boolean;
                Hatr: boolean;
                Hebrew: boolean;
                Hebr: boolean;
                Hira: boolean;
                Imperial_Aramaic: boolean;
                Armi: boolean;
                Inherited: boolean;
                Zinh: boolean;
                Qaai: boolean;
                Inscriptional_Pahlavi: boolean;
                Phli: boolean;
                Inscriptional_Parthian: boolean;
                Prti: boolean;
                Javanese: boolean;
                Java: boolean;
                Kaithi: boolean;
                Kthi: boolean;
                Kannada: boolean;
                Knda: boolean;
                Kana: boolean;
                Kayah_Li: boolean;
                Kali: boolean;
                Kharoshthi: boolean;
                Khar: boolean;
                Khmer: boolean;
                Khmr: boolean;
                Khojki: boolean;
                Khoj: boolean;
                Khudawadi: boolean;
                Sind: boolean;
                Lao: boolean;
                Laoo: boolean;
                Latn: boolean;
                Lepcha: boolean;
                Lepc: boolean;
                Limbu: boolean;
                Limb: boolean;
                Linear_A: boolean;
                Lina: boolean;
                Linear_B: boolean;
                Linb: boolean;
                Lisu: boolean;
                Lycian: boolean;
                Lyci: boolean;
                Lydian: boolean;
                Lydi: boolean;
                Mahajani: boolean;
                Mahj: boolean;
                Malayalam: boolean;
                Mlym: boolean;
                Mandaic: boolean;
                Mand: boolean;
                Manichaean: boolean;
                Mani: boolean;
                Marchen: boolean;
                Marc: boolean;
                Masaram_Gondi: boolean;
                Gonm: boolean;
                Meetei_Mayek: boolean;
                Mtei: boolean;
                Mende_Kikakui: boolean;
                Mend: boolean;
                Meroitic_Cursive: boolean;
                Merc: boolean;
                Meroitic_Hieroglyphs: boolean;
                Mero: boolean;
                Miao: boolean;
                Plrd: boolean;
                Modi: boolean;
                Mongolian: boolean;
                Mong: boolean;
                Mro: boolean;
                Mroo: boolean;
                Multani: boolean;
                Mult: boolean;
                Myanmar: boolean;
                Mymr: boolean;
                Nabataean: boolean;
                Nbat: boolean;
                New_Tai_Lue: boolean;
                Talu: boolean;
                Newa: boolean;
                Nko: boolean;
                Nkoo: boolean;
                Nushu: boolean;
                Nshu: boolean;
                Ogham: boolean;
                Ogam: boolean;
                Ol_Chiki: boolean;
                Olck: boolean;
                Old_Hungarian: boolean;
                Hung: boolean;
                Old_Italic: boolean;
                Ital: boolean;
                Old_North_Arabian: boolean;
                Narb: boolean;
                Old_Permic: boolean;
                Perm: boolean;
                Old_Persian: boolean;
                Xpeo: boolean;
                Old_South_Arabian: boolean;
                Sarb: boolean;
                Old_Turkic: boolean;
                Orkh: boolean;
                Oriya: boolean;
                Orya: boolean;
                Osage: boolean;
                Osge: boolean;
                Osmanya: boolean;
                Osma: boolean;
                Pahawh_Hmong: boolean;
                Hmng: boolean;
                Palmyrene: boolean;
                Palm: boolean;
                Pau_Cin_Hau: boolean;
                Pauc: boolean;
                Phags_Pa: boolean;
                Phag: boolean;
                Phoenician: boolean;
                Phnx: boolean;
                Psalter_Pahlavi: boolean;
                Phlp: boolean;
                Rejang: boolean;
                Rjng: boolean;
                Runic: boolean;
                Runr: boolean;
                Samaritan: boolean;
                Samr: boolean;
                Saurashtra: boolean;
                Saur: boolean;
                Sharada: boolean;
                Shrd: boolean;
                Shavian: boolean;
                Shaw: boolean;
                Siddham: boolean;
                Sidd: boolean;
                SignWriting: boolean;
                Sgnw: boolean;
                Sinhala: boolean;
                Sinh: boolean;
                Sora_Sompeng: boolean;
                Sora: boolean;
                Soyombo: boolean;
                Soyo: boolean;
                Sundanese: boolean;
                Sund: boolean;
                Syloti_Nagri: boolean;
                Sylo: boolean;
                Syriac: boolean;
                Syrc: boolean;
                Tagalog: boolean;
                Tglg: boolean;
                Tagbanwa: boolean;
                Tagb: boolean;
                Tai_Le: boolean;
                Tale: boolean;
                Tai_Tham: boolean;
                Lana: boolean;
                Tai_Viet: boolean;
                Tavt: boolean;
                Takri: boolean;
                Takr: boolean;
                Tamil: boolean;
                Taml: boolean;
                Tangut: boolean;
                Tang: boolean;
                Telugu: boolean;
                Telu: boolean;
                Thaana: boolean;
                Thaa: boolean;
                Thai: boolean;
                Tibetan: boolean;
                Tibt: boolean;
                Tifinagh: boolean;
                Tfng: boolean;
                Tirhuta: boolean;
                Tirh: boolean;
                Ugaritic: boolean;
                Ugar: boolean;
                Vai: boolean;
                Vaii: boolean;
                Warang_Citi: boolean;
                Wara: boolean;
                Yi: boolean;
                Yiii: boolean;
                Zanabazar_Square: boolean;
                Zanb: boolean;
                Dogra: boolean;
                Gunjala_Gondi: boolean;
                Hanifi_Rohingya: boolean;
                Makasar: boolean;
                Medefaidrin: boolean;
                Old_Sogdian: boolean;
                Sogdian: boolean;
            }>;
            blocksTest: Partial<{
                InBasic_Latin: boolean;
                InAdlam: boolean;
                InAegean_Numbers: boolean;
                InAhom: boolean;
                InAlchemical_Symbols: boolean;
                InAlphabetic_Presentation_Forms: boolean;
                InAnatolian_Hieroglyphs: boolean;
                InAncient_Greek_Musical_Notation: boolean;
                InAncient_Greek_Numbers: boolean;
                InAncient_Symbols: boolean;
                InArabic: boolean;
                InArabic_Extended_A: boolean;
                InArabic_Mathematical_Alphabetic_Symbols: boolean;
                InArabic_Presentation_Forms_A: boolean;
                InArabic_Presentation_Forms_B: boolean;
                InArabic_Supplement: boolean;
                InArmenian: boolean;
                InArrows: boolean;
                InAvestan: boolean;
                InBalinese: boolean;
                InBamum: boolean;
                InBamum_Supplement: boolean;
                InBassa_Vah: boolean;
                InBatak: boolean;
                InBengali: boolean;
                InBhaiksuki: boolean;
                InBlock_Elements: boolean;
                InBopomofo: boolean;
                InBopomofo_Extended: boolean;
                InBox_Drawing: boolean;
                InBrahmi: boolean;
                InBraille_Patterns: boolean;
                InBuginese: boolean;
                InBuhid: boolean;
                InByzantine_Musical_Symbols: boolean;
                InCJK_Compatibility: boolean;
                InCJK_Compatibility_Forms: boolean;
                InCJK_Compatibility_Ideographs: boolean;
                InCJK_Compatibility_Ideographs_Supplement: boolean;
                InCJK_Radicals_Supplement: boolean;
                InCJK_Strokes: boolean;
                InCJK_Symbols_And_Punctuation: boolean;
                InCJK_Unified_Ideographs: boolean;
                InCJK_Unified_Ideographs_Extension_A: boolean;
                InCJK_Unified_Ideographs_Extension_B: boolean;
                InCJK_Unified_Ideographs_Extension_C: boolean;
                InCJK_Unified_Ideographs_Extension_D: boolean;
                InCJK_Unified_Ideographs_Extension_E: boolean;
                InCJK_Unified_Ideographs_Extension_F: boolean;
                InCarian: boolean;
                InCaucasian_Albanian: boolean;
                InChakma: boolean;
                InCham: boolean;
                InCherokee: boolean;
                InCherokee_Supplement: boolean;
                InChess_Symbols: boolean;
                InCombining_Diacritical_Marks: boolean;
                InCombining_Diacritical_Marks_Extended: boolean;
                InCombining_Diacritical_Marks_For_Symbols: boolean;
                InCombining_Diacritical_Marks_Supplement: boolean;
                InCombining_Half_Marks: boolean;
                InCommon_Indic_Number_Forms: boolean;
                InControl_Pictures: boolean;
                InCoptic: boolean;
                InCoptic_Epact_Numbers: boolean;
                InCounting_Rod_Numerals: boolean;
                InCuneiform: boolean;
                InCuneiform_Numbers_And_Punctuation: boolean;
                InCurrency_Symbols: boolean;
                InCypriot_Syllabary: boolean;
                InCyrillic: boolean;
                InCyrillic_Extended_A: boolean;
                InCyrillic_Extended_B: boolean;
                InCyrillic_Extended_C: boolean;
                InCyrillic_Supplement: boolean;
                InDeseret: boolean;
                InDevanagari: boolean;
                InDevanagari_Extended: boolean;
                InDingbats: boolean;
                InDogra: boolean;
                InDomino_Tiles: boolean;
                InDuployan: boolean;
                InEarly_Dynastic_Cuneiform: boolean;
                InEgyptian_Hieroglyphs: boolean;
                InElbasan: boolean;
                InEmoticons: boolean;
                InEnclosed_Alphanumeric_Supplement: boolean;
                InEnclosed_Alphanumerics: boolean;
                InEnclosed_CJK_Letters_And_Months: boolean;
                InEnclosed_Ideographic_Supplement: boolean;
                InEthiopic: boolean;
                InEthiopic_Extended: boolean;
                InEthiopic_Extended_A: boolean;
                InEthiopic_Supplement: boolean;
                InGeneral_Punctuation: boolean;
                InGeometric_Shapes: boolean;
                InGeometric_Shapes_Extended: boolean;
                InGeorgian: boolean;
                InGeorgian_Extended: boolean;
                InGeorgian_Supplement: boolean;
                InGlagolitic: boolean;
                InGlagolitic_Supplement: boolean;
                InGothic: boolean;
                InGrantha: boolean;
                InGreek_And_Coptic: boolean;
                InGreek_Extended: boolean;
                InGujarati: boolean;
                InGunjala_Gondi: boolean;
                InGurmukhi: boolean;
                InHalfwidth_And_Fullwidth_Forms: boolean;
                InHangul_Compatibility_Jamo: boolean;
                InHangul_Jamo: boolean;
                InHangul_Jamo_Extended_A: boolean;
                InHangul_Jamo_Extended_B: boolean;
                InHangul_Syllables: boolean;
                InHanifi_Rohingya: boolean;
                InHanunoo: boolean;
                InHatran: boolean;
                InHebrew: boolean;
                InHigh_Private_Use_Surrogates: boolean;
                InHigh_Surrogates: boolean;
                InHiragana: boolean;
                InIPA_Extensions: boolean;
                InIdeographic_Description_Characters: boolean;
                InIdeographic_Symbols_And_Punctuation: boolean;
                InImperial_Aramaic: boolean;
                InIndic_Siyaq_Numbers: boolean;
                InInscriptional_Pahlavi: boolean;
                InInscriptional_Parthian: boolean;
                InJavanese: boolean;
                InKaithi: boolean;
                InKana_Extended_A: boolean;
                InKana_Supplement: boolean;
                InKanbun: boolean;
                InKangxi_Radicals: boolean;
                InKannada: boolean;
                InKatakana: boolean;
                InKatakana_Phonetic_Extensions: boolean;
                InKayah_Li: boolean;
                InKharoshthi: boolean;
                InKhmer: boolean;
                InKhmer_Symbols: boolean;
                InKhojki: boolean;
                InKhudawadi: boolean;
                InLao: boolean;
                InLatin_1_Supplement: boolean;
                InLatin_Extended_A: boolean;
                InLatin_Extended_Additional: boolean;
                InLatin_Extended_B: boolean;
                InLatin_Extended_C: boolean;
                InLatin_Extended_D: boolean;
                InLatin_Extended_E: boolean;
                InLepcha: boolean;
                InLetterlike_Symbols: boolean;
                InLimbu: boolean;
                InLinear_A: boolean;
                InLinear_B_Ideograms: boolean;
                InLinear_B_Syllabary: boolean;
                InLisu: boolean;
                InLow_Surrogates: boolean;
                InLycian: boolean;
                InLydian: boolean;
                InMahajani: boolean;
                InMahjong_Tiles: boolean;
                InMakasar: boolean;
                InMalayalam: boolean;
                InMandaic: boolean;
                InManichaean: boolean;
                InMarchen: boolean;
                InMasaram_Gondi: boolean;
                InMathematical_Alphanumeric_Symbols: boolean;
                InMathematical_Operators: boolean;
                InMayan_Numerals: boolean;
                InMedefaidrin: boolean;
                InMeetei_Mayek: boolean;
                InMeetei_Mayek_Extensions: boolean;
                InMende_Kikakui: boolean;
                InMeroitic_Cursive: boolean;
                InMeroitic_Hieroglyphs: boolean;
                InMiao: boolean;
                InMiscellaneous_Mathematical_Symbols_A: boolean;
                InMiscellaneous_Mathematical_Symbols_B: boolean;
                InMiscellaneous_Symbols: boolean;
                InMiscellaneous_Symbols_And_Arrows: boolean;
                InMiscellaneous_Symbols_And_Pictographs: boolean;
                InMiscellaneous_Technical: boolean;
                InModi: boolean;
                InModifier_Tone_Letters: boolean;
                InMongolian: boolean;
                InMongolian_Supplement: boolean;
                InMro: boolean;
                InMultani: boolean;
                InMusical_Symbols: boolean;
                InMyanmar: boolean;
                InMyanmar_Extended_A: boolean;
                InMyanmar_Extended_B: boolean;
                InNKo: boolean;
                InNabataean: boolean;
                InNew_Tai_Lue: boolean;
                InNewa: boolean;
                InNumber_Forms: boolean;
                InNushu: boolean;
                InOgham: boolean;
                InOl_Chiki: boolean;
                InOld_Hungarian: boolean;
                InOld_Italic: boolean;
                InOld_North_Arabian: boolean;
                InOld_Permic: boolean;
                InOld_Persian: boolean;
                InOld_Sogdian: boolean;
                InOld_South_Arabian: boolean;
                InOld_Turkic: boolean;
                InOptical_Character_Recognition: boolean;
                InOriya: boolean;
                InOrnamental_Dingbats: boolean;
                InOsage: boolean;
                InOsmanya: boolean;
                InPahawh_Hmong: boolean;
                InPalmyrene: boolean;
                InPau_Cin_Hau: boolean;
                InPhags_Pa: boolean;
                InPhaistos_Disc: boolean;
                InPhoenician: boolean;
                InPhonetic_Extensions: boolean;
                InPhonetic_Extensions_Supplement: boolean;
                InPlaying_Cards: boolean;
                InPrivate_Use_Area: boolean;
                InPsalter_Pahlavi: boolean;
                InRejang: boolean;
                InRumi_Numeral_Symbols: boolean;
                InRunic: boolean;
                InSamaritan: boolean;
                InSaurashtra: boolean;
                InSharada: boolean;
                InShavian: boolean;
                InShorthand_Format_Controls: boolean;
                InSiddham: boolean;
                InSinhala: boolean;
                InSinhala_Archaic_Numbers: boolean;
                InSmall_Form_Variants: boolean;
                InSogdian: boolean;
                InSora_Sompeng: boolean;
                InSoyombo: boolean;
                InSpacing_Modifier_Letters: boolean;
                InSpecials: boolean;
                InSundanese: boolean;
                InSundanese_Supplement: boolean;
                InSuperscripts_And_Subscripts: boolean;
                InSupplemental_Arrows_A: boolean;
                InSupplemental_Arrows_B: boolean;
                InSupplemental_Arrows_C: boolean;
                InSupplemental_Mathematical_Operators: boolean;
                InSupplemental_Punctuation: boolean;
                InSupplemental_Symbols_And_Pictographs: boolean;
                InSupplementary_Private_Use_Area_A: boolean;
                InSupplementary_Private_Use_Area_B: boolean;
                InSutton_SignWriting: boolean;
                InSyloti_Nagri: boolean;
                InSyriac: boolean;
                InSyriac_Supplement: boolean;
                InTagalog: boolean;
                InTagbanwa: boolean;
                InTags: boolean;
                InTai_Le: boolean;
                InTai_Tham: boolean;
                InTai_Viet: boolean;
                InTai_Xuan_Jing_Symbols: boolean;
                InTakri: boolean;
                InTamil: boolean;
                InTangut: boolean;
                InTangut_Components: boolean;
                InTelugu: boolean;
                InThaana: boolean;
                InThai: boolean;
                InTibetan: boolean;
                InTifinagh: boolean;
                InTirhuta: boolean;
                InTransport_And_Map_Symbols: boolean;
                InUgaritic: boolean;
                InUnified_Canadian_Aboriginal_Syllabics: boolean;
                InUnified_Canadian_Aboriginal_Syllabics_Extended: boolean;
                InVai: boolean;
                InVariation_Selectors: boolean;
                InVariation_Selectors_Supplement: boolean;
                InVedic_Extensions: boolean;
                InVertical_Forms: boolean;
                InWarang_Citi: boolean;
                InYi_Radicals: boolean;
                InYi_Syllables: boolean;
                InYijing_Hexagram_Symbols: boolean;
                InZanabazar_Square: boolean;
            }>;
        };
    }>;
    static get version(): string;
}
export declare namespace zhRegExp {
    export import isRegExp = RegexpHelper.isRegExp;
}
export declare const create: typeof zhRegExp.create;
export { isRegExp, parseRegularExpressionString };
export interface IApi<T = zhRegExp> {
    (str: string | RegExp, flags?: string, options?: IOptions | string): T;
    (str: string | RegExp, options?: IOptions): T;
}
export default zhRegExp;
