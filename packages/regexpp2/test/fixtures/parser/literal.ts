import assert = require("assert")
import fs = require("fs")
import path = require("path")

type FixtureData = {
    [filename: string]: {
        options: { strict: boolean; ecmaVersion: 5 | 2015 | 2016 | 2017 | 2018 }
        patterns: {
            [source: string]:
                | { ast: object }
                | { error: { message: string; index: number } }
        }
    }
}

// @ts-ignore
const Fixtures: FixtureData = {}
const fixturesRoot = path.join(__dirname, "literal")
for (const filename of fs.readdirSync(fixturesRoot)) {
    Fixtures[filename] = JSON.parse(
        fs.readFileSync(path.join(fixturesRoot, filename), "utf8"),
    )
}

export function save(): void {
    for (const filename of Object.keys(Fixtures)) {
        let dir = path.join(fixturesRoot, filename)
        !fs.existsSync(dir) && fs.mkdirSync(path.dirname(dir))
        fs.writeFileSync(
            path.join(fixturesRoot, filename),
            JSON.stringify(Fixtures[filename], null, 2),
        )
    }
}

export { Fixtures }
