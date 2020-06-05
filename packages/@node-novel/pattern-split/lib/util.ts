/**
 * Created by user on 2020/6/5.
 */

export function getRawString(raw: string | TemplateStringsArray | any)
{
	try
	{
		return String.raw(raw as any as TemplateStringsArray);
	}
	catch (e)
	{

	}
}
