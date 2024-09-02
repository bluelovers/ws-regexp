import { EnumOptionsRomanizeMethod, IJamoRomanEntryCompat, IOptionsRomanize, ISearchJamoNode, ISearchJamoParams } from './types';
export declare function getJamoDictionary(jamo: string | number, idx: number): IJamoRomanEntryCompat;
export declare function searchJamo(node: ISearchJamoNode, params: ISearchJamoParams, prevNode?: ISearchJamoNode): string;
export declare function handleRomanizeOptions(options?: EnumOptionsRomanizeMethod | IOptionsRomanize): IOptionsRomanize;
