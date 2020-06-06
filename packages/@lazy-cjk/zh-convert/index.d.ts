import { IOptions } from './lib/types';
export * from './lib/types';
export declare function cn2tw(text: string, options?: IOptions, ...argv: any[]): string;
export declare function tw2cn(text: string, options?: IOptions, ...argv: any[]): string;
declare const _default: {
    cn2tw: typeof cn2tw;
    tw2cn: typeof tw2cn;
};
export default _default;
