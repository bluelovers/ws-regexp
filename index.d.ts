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
    execAll(inputRegExp: RegExp, input: string): (RegExpExecArray & string[] & {
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
};
export = _execAll;
