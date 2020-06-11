import { Trie } from 'regexgen2';
import emoji from 'emoji.json';

export function _build(emojiJson: {
	char: string,
	name: string,
}[])
{
	const trie = new Trie();

	trie.addAll(emoji.map(v => v.char));

	const reEmoji = new RegExp(trie.toString('u'), 'u')

	const entriesEmoji: [string, string][] = emoji
		.map(({ char, name }) => [char, name])
	;

	return {
		reEmoji,
		entriesEmoji,
	}
}

