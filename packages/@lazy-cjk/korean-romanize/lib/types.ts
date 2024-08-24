export const enum EnumOptionsRomanizeMethod
{
	RR = "RR",
	RRT = "RRT",
}

export type IBlock = [number, number]

export interface IRecordBlocks
{
	[k: string]: IBlock
}

export interface IJamoBase
{
	jamo: string
}

export interface IJamoEntry extends IJamoBase
{
	archaic: boolean,
	mapsTo?: string,
	unicodeData: Record<string, string>
}

export type IJamoRomanData = {
	default: string,
	MR?: string,
} & {
	[k in string]?: string
} & {
	[k in EnumOptionsRomanizeMethod]?: string
}

export interface IJamoRomanEntry extends IJamoBase
{
	roman: string | IJamoRomanData
}

export interface IJamoRomanEntryCompat extends IJamoRomanEntry
{
	compatJamo?: string,
	compatJamoHex?: string
}

export interface IOptionsRomanize
{
	method?: EnumOptionsRomanizeMethod;
	hyphenate?: boolean;
}

