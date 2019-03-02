# cjk-conv-cli

    cli version for cjk-conv ( cn2tw_min, tw2cn_min, cn2tw, tw2cn )

https://www.npmjs.com/package/cjk-conv

## install

```
npm install -g cjk-conv-cli
```

## cli

allow use glob pattern

```
npx cjk-conv-cli xxxx.txt *.txt
npx cjk-conv-cli xxxx.txt */file*.txt **/doc*.txt --deep
npx cjk-conv-cli xxxx.txt */file*.txt **/doc*.txt --deep 2
```

```
npx cjk-conv-cli xxxx.txt */file*.txt **/doc*.txt

Options:
  --help              Show help                                        [boolean]
  --version           Show version number                              [boolean]
  --tw2cn             use tw2cn mode                                   [boolean]
  --cwd               The current working directory in which to search. [string]
  --deep              The deep option can be set to true to traverse the entire
                      directory structure, or it can be set to a number to only
                      traverse that many levels deep.
  --file, -f                                               [array] [default: []]
  --createBackup, -b  create a .old backup                             [boolean]
  --createPatch, -p   create a diff .patch file                        [boolean]
  --notMin, -m                                                         [boolean]
  --unSafe, -s                                                         [boolean]
```
