/**
 * Created by user on 2018/5/9/009.
 */

import execall from '../';

let t = execall(/(?<k>.)/g, '123456789');

console.dir(t, {
	colors: true,
});

console.log('getOwnPropertyNames', Object.getOwnPropertyNames(t));

let {re, input} = t;

console.log('== hidden property ==');

console.dir({re, input}, {
	colors: true,
});

console.dir(execall(/(\d+)/g, '$200 and $400'), {
	colors: true,
});
