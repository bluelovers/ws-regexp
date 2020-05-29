
export function cns2uni(cns: string): number
{
	return require('./cns/unicode/cns2uni.bmp.json')[cns]
	?? require('./cns/unicode/cns2uni.2.json')[cns]
	?? require('./cns/unicode/cns2uni.15.json')[cns]
}

export default cns2uni
