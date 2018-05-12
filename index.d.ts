declare let _execAll: ((inputRegExp: RegExp, input: string) => (RegExpExecArray & string[] & {
    index: number;
    groups?: {
        [k: string]: string;
    };
} & {
    match: string;
    sub: string[];
})[] & {
    readonly re: RegExp;
    readonly input: string;
}) & {
    execall(inputRegExp: RegExp, input: string): (RegExpExecArray & string[] & {
        index: number;
        groups?: {
            [k: string]: string;
        };
    } & {
        match: string;
        sub: string[];
    })[] & {
        readonly re: RegExp;
        readonly input: string;
    };
    default(inputRegExp: RegExp, input: string): (RegExpExecArray & string[] & {
        index: number;
        groups?: {
            [k: string]: string;
        };
    } & {
        match: string;
        sub: string[];
    })[] & {
        readonly re: RegExp;
        readonly input: string;
    };
    SYMBOL: symbol;
};
export = _execAll;
