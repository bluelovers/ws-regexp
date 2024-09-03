import { EnumTranscribeNumberConfigsKeys, IOptionsTranscribeNumber, IOptionsTranscribeNumberRuntime } from './types';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
export * from './data/numbers';
export declare function handleTranscribeNumberOptions(config?: Partial<IOptionsTranscribeNumber> | ITSTypeAndStringLiteral<EnumTranscribeNumberConfigsKeys>): IOptionsTranscribeNumberRuntime;
/**
 * Unify input to string
 */
export declare function unifyInputToString(number: number | string): string;
export declare function transcribeNumber(number: number | string, inputConfig?: Partial<IOptionsTranscribeNumber> | ITSTypeAndStringLiteral<EnumTranscribeNumberConfigsKeys>): string;
export declare function _transcribeNumberCore(number: string, config: IOptionsTranscribeNumberRuntime, deep?: number): string;
export default transcribeNumber;
