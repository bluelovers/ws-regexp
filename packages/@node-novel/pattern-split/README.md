# @node-novel/pattern-split

    try output RegExp Pattern as readable string list

## install

```nodemon
npm install @node-novel/pattern-split
```

API: [index.d.ts](index.d.ts)

## demo

[demo.ts](test/demo.ts)

```ts
import novelPatternSplit = require('@node-novel/pattern-split');

let tests = [
	`(女佣|女僕)`,
	`女佣|女僕`,
	`(?:女佣|女僕)`,
];

tests.forEach(function (input)
{
	let ret1 = novelPatternSplit(input);
	let ret2 = novelPatternSplit(input, {
		breakingMode: true,
	});

	console.dir({
		ret1,
		ret2,
	}, {
		depth: null,
		colors: true,
	});
});
```

```ts
{ ret1: [ '(女佣|女僕)' ], ret2: [ '女佣', '女僕' ] }
{ ret1: [ '女佣', '女僕' ], ret2: [ '女佣', '女僕' ] }
{ ret1: [ '女佣', '女僕' ], ret2: [ '女佣', '女僕' ] }
```
