/**
 * Created by user on 2020/5/29.
 */

import fetch from 'cross-fetch'
import { outputFile } from 'fs-extra';
import { join } from 'path';



(async () => {

	console.log(777)

	await fetch(`https://www.cns11643.gov.tw/AIDB/Open_Data.zip`)
		.then(async (r) => {

			console.dir(r)

			// @ts-ignore
			let buf = await r.buffer()

			console.log(777)

			return outputFile(join(__dirname, `../cache`, 'data.zip'), buf)
		})
	;

	console.log(777)

})();
