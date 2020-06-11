import { reEmoji } from './re';

export const reEmojiGlobal = new RegExp(reEmoji.source, 'gu')

export function replaceEmoji(text: string, fn: (emoji: string) => string, re = reEmojiGlobal)
{
	return text.replace(re, fn)
}
