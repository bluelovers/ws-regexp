"use strict";
/**
 * Created by user on 2018/1/31/031.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.parseRegularExpressionString = exports.isRegExp = exports.create = exports.zhRegExp = exports.defaultOptions = exports.ParserEventEmitter = exports.ParserEventEmitterEvent = void 0;
const regexp_parser_event_1 = require("regexp-parser-event");
Object.defineProperty(exports, "ParserEventEmitter", { enumerable: true, get: function () { return regexp_parser_event_1.ParserEventEmitter; } });
const core_1 = require("./lib/core");
const regexp_helper_1 = require("regexp-helper");
Object.defineProperty(exports, "isRegExp", { enumerable: true, get: function () { return regexp_helper_1.isRegExp; } });
const RegexpHelper = __importStar(require("regexp-helper"));
const mergeOptions_1 = __importStar(require("./lib/mergeOptions"));
const getSource_1 = require("./lib/getSource");
Object.defineProperty(exports, "parseRegularExpressionString", { enumerable: true, get: function () { return getSource_1.parseRegularExpressionString; } });
/**
 * @deprecated
 */
exports.defaultOptions = {};
class zhRegExp extends RegExp {
    constructor(str, ...argv) {
        let { source, flags } = core_1.coreHandler(str, ...argv);
        super(source, flags);
    }
    /**
     * create a new zhRegExp class with default value
     * @example `zhRegExp.use(defaultOptions)`
     */
    static use(defaultOptions) {
        defaultOptions = mergeOptions_1.mergeOptions2({}, this[core_1.SymDefaults], defaultOptions);
        const zhRegExpNew = new Proxy(zhRegExp, {
            // @ts-ignore
            construct(target, argArray, newTarget) {
                let { str, flags, options, argv } = mergeOptions_1.getSettingOptions(...argArray);
                options = mergeOptions_1.default({}, defaultOptions, options);
                return new zhRegExp(str, flags, options, ...argv);
            },
            // @ts-ignore
            get(target, key) {
                if (key === core_1.SymDefaults) {
                    return defaultOptions;
                }
                return target[key];
            },
        });
        return zhRegExpNew;
    }
    static create(str, flags = null, skip, ...argv) {
        return new this(str, flags, skip, ...argv);
    }
    getStatic() {
        return Object.getPrototypeOf(this);
    }
    /**
     * @todo
     */
    toRegularExpressionString() {
        return this.toString();
        //return `/${this.source}/${this.flags}`;
    }
    static parseRegularExpressionString(str) {
        return getSource_1.parseRegularExpressionString(str);
    }
    static get support() {
        return require('regexp-support').default;
    }
    static get version() {
        return require('./package.json').version;
    }
}
exports.zhRegExp = zhRegExp;
(function (zhRegExp) {
    zhRegExp.isRegExp = RegexpHelper.isRegExp;
})(zhRegExp = exports.zhRegExp || (exports.zhRegExp = {}));
exports.create = zhRegExp.create.bind(zhRegExp);
Object.defineProperty(exports, "version", {
    get() {
        return require('./package.json').version;
    }
});
exports.default = zhRegExp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSCw2REFLNkI7QUFrQkssbUdBcEJqQyx3Q0FBa0IsT0FvQmlDO0FBaEJwRCxxQ0FTb0I7QUFDcEIsaURBQXlDO0FBOEpoQyx5RkE5SkEsd0JBQVEsT0E4SkE7QUE1SmpCLDREQUE4QztBQUM5QyxtRUFBb0Y7QUFDcEYsK0NBQStEO0FBMEo1Qyw2R0ExSlYsd0NBQTRCLE9BMEpVO0FBbEovQzs7R0FFRztBQUNVLFFBQUEsY0FBYyxHQUFhLEVBQUUsQ0FBQztBQUUzQyxNQUFhLFFBQVMsU0FBUSxNQUFNO0lBMEZuQyxZQUFZLEdBQUcsRUFBRSxHQUFHLElBQUk7UUFFdkIsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxrQkFBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRWxELEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQTVDRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQTZCO1FBRXZDLGNBQWMsR0FBRyw0QkFBYSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsa0JBQVcsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXRFLE1BQU0sV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUN2QyxhQUFhO1lBQ2IsU0FBUyxDQUFDLE1BQXVCLEVBQUUsUUFBaUIsRUFBRSxTQUFlO2dCQUVwRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsZ0NBQWlCLENBQUMsR0FBRyxRQUFtQyxDQUFDLENBQUM7Z0JBRTlGLE9BQU8sR0FBRyxzQkFBWSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRXBELE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBRUQsYUFBYTtZQUNiLEdBQUcsQ0FBQyxNQUFzQixFQUFFLEdBQXVDO2dCQUVsRSxJQUFJLEdBQUcsS0FBSyxrQkFBVyxFQUN2QjtvQkFDQyxPQUFPLGNBQWMsQ0FBQTtpQkFDckI7Z0JBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsQ0FBQztTQUVELENBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFBO0lBQ25CLENBQUM7SUFlRCxNQUFNLENBQUMsTUFBTSxDQUFlLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLElBQUssRUFBRSxHQUFHLElBQUk7UUFFNUQsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxTQUFTO1FBRVIsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNILHlCQUF5QjtRQUV4QixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2Qix5Q0FBeUM7SUFDMUMsQ0FBQztJQUVELE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxHQUFXO1FBRTlDLE9BQU8sd0NBQTRCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU0sS0FBSyxPQUFPO1FBRWpCLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBa0QsQ0FBQztJQUNyRixDQUFDO0lBRUQsTUFBTSxLQUFLLE9BQU87UUFFakIsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUE7SUFDekMsQ0FBQztDQUNEO0FBcElELDRCQW9JQztBQUVELFdBQWlCLFFBQVE7SUFFVixpQkFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7QUFDaEQsQ0FBQyxFQUhnQixRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUd4QjtBQUVZLFFBQUEsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBMkIsQ0FBQztBQWEvRSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7SUFDekMsR0FBRztRQUVGLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFBO0lBQ3pDLENBQUM7Q0FDRCxDQUFDLENBQUM7QUFFSCxrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzEvMzEvMDMxLlxuICovXG5cbmltcG9ydCB7IElBc3RUb1N0cmluZ09wdGlvbnMgfSBmcm9tICdyZWdleHAtcGFyc2VyLWxpdGVyYWwnO1xuaW1wb3J0IHtcblx0SU5vZGVJbnB1dCxcblx0SVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyLFxuXHRQYXJzZXJFdmVudEVtaXR0ZXIsXG5cdFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LFxufSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCBfc3VwcG9ydCBmcm9tICdyZWdleHAtc3VwcG9ydCc7XG5pbXBvcnQge1xuXHRjb3JlSGFuZGxlcixcblx0SUNvcmVIYW5kbGVyUmV0dXJuLFxuXHRJT3B0aW9ucyxcblx0SU9wdGlvbnNDb3JlLFxuXHRJT3B0aW9uc0lucHV0LFxuXHRJT3B0aW9uc09uLFxuXHRJT3B0aW9uc1J1bnRpbWUsIElSZWdFeHBVc2VySW5wdXQsXG5cdFN5bURlZmF1bHRzLFxufSBmcm9tICcuL2xpYi9jb3JlJztcbmltcG9ydCB7IGlzUmVnRXhwIH0gZnJvbSAncmVnZXhwLWhlbHBlcic7XG5pbXBvcnQgeyBJT3B0aW9ucyBhcyBJT3B0aW9uc1poVGFibGUgfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnO1xuaW1wb3J0ICogYXMgUmVnZXhwSGVscGVyIGZyb20gJ3JlZ2V4cC1oZWxwZXInO1xuaW1wb3J0IG1lcmdlT3B0aW9ucywgeyBnZXRTZXR0aW5nT3B0aW9ucywgbWVyZ2VPcHRpb25zMiB9IGZyb20gJy4vbGliL21lcmdlT3B0aW9ucyc7XG5pbXBvcnQgeyBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nIH0gZnJvbSAnLi9saWIvZ2V0U291cmNlJztcblxuZXhwb3J0IHsgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsIFBhcnNlckV2ZW50RW1pdHRlciwgSU5vZGVJbnB1dCwgSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyLCBJQXN0VG9TdHJpbmdPcHRpb25zIH1cblxuZXhwb3J0IHsgSU9wdGlvbnMsIElPcHRpb25zUnVudGltZSwgSU9wdGlvbnNJbnB1dCwgSUNvcmVIYW5kbGVyUmV0dXJuLCBJT3B0aW9uc09uLCBJT3B0aW9uc0NvcmUgfVxuXG5leHBvcnQgeyBJT3B0aW9uc1poVGFibGUgfVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMgPSB7fTtcblxuZXhwb3J0IGNsYXNzIHpoUmVnRXhwIGV4dGVuZHMgUmVnRXhwXG57XG5cdHB1YmxpYyBzb3VyY2U6IHN0cmluZztcblx0cHVibGljIGZsYWdzOiBzdHJpbmc7XG5cblx0cHVibGljIGRvdEFsbDogYm9vbGVhbjtcblxuXHRwdWJsaWMgaWdub3JlQ2FzZTogYm9vbGVhbjtcblx0cHVibGljIGdsb2JhbDogYm9vbGVhbjtcblx0cHVibGljIG11bHRpbGluZTogYm9vbGVhbjtcblx0cHVibGljIHN0aWNreTogYm9vbGVhbjtcblx0cHVibGljIHVuaWNvZGU6IGJvb2xlYW47XG5cblx0cHVibGljIGxhc3RJbmRleDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbm9uLXN0YW5kYXJkIGxlZnRDb250ZXh0IHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBzdWJzdHJpbmcgcHJlY2VkaW5nIHRoZSBtb3N0IHJlY2VudCBtYXRjaC4gUmVnRXhwLiRgIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJGBcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGVmdENvbnRleHQ6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgcmlnaHRDb250ZXh0IHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBzdWJzdHJpbmcgZm9sbG93aW5nIHRoZSBtb3N0IHJlY2VudCBtYXRjaC4gUmVnRXhwLiQnIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJCdcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgcmlnaHRDb250ZXh0OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgbm9uLXN0YW5kYXJkIGxhc3RQYXJlbiBwcm9wZXJ0eSBpcyBhIHN0YXRpYyBhbmQgcmVhZC1vbmx5IHByb3BlcnR5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCBjb250YWlucyB0aGUgbGFzdCBwYXJlbnRoZXNpemVkIHN1YnN0cmluZyBtYXRjaCwgaWYgYW55LiBSZWdFeHAuJCsgaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkK1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSBsYXN0UGFyZW46IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgbGFzdE1hdGNoIHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBsYXN0IG1hdGNoZWQgY2hhcmFjdGVycy4gUmVnRXhwLiQmIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJCZcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGFzdE1hdGNoOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgbm9uLXN0YW5kYXJkIGlucHV0IHByb3BlcnR5IGlzIGEgc3RhdGljIHByb3BlcnR5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCBjb250YWlucyB0aGUgc3RyaW5nIGFnYWluc3Qgd2hpY2ggYSByZWd1bGFyIGV4cHJlc3Npb24gaXMgbWF0Y2hlZC4gUmVnRXhwLiRfIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJF9cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5wdXQ6IHN0cmluZztcblxuXHQvKipcblx0ICogZGVmYXVsdCB2YWx1ZSBvbmx5IGV4aXN0cyBhbmQgd29yayB3aGVuIHVzZSBgemhSZWdFeHAudXNlKGRlZmF1bHRPcHRpb25zKWBcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgW1N5bURlZmF1bHRzXTogSU9wdGlvbnNJbnB1dDtcblxuXHQvKipcblx0ICogY3JlYXRlIGEgbmV3IHpoUmVnRXhwIGNsYXNzIHdpdGggZGVmYXVsdCB2YWx1ZVxuXHQgKiBAZXhhbXBsZSBgemhSZWdFeHAudXNlKGRlZmF1bHRPcHRpb25zKWBcblx0ICovXG5cdHN0YXRpYyB1c2UoZGVmYXVsdE9wdGlvbnM6IElPcHRpb25zSW5wdXQpOiB0eXBlb2YgemhSZWdFeHBcblx0e1xuXHRcdGRlZmF1bHRPcHRpb25zID0gbWVyZ2VPcHRpb25zMih7fSwgdGhpc1tTeW1EZWZhdWx0c10sIGRlZmF1bHRPcHRpb25zKTtcblxuXHRcdGNvbnN0IHpoUmVnRXhwTmV3ID0gbmV3IFByb3h5KHpoUmVnRXhwLCB7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRjb25zdHJ1Y3QodGFyZ2V0OiB0eXBlb2YgemhSZWdFeHAsIGFyZ0FycmF5OiB1bmtub3duLCBuZXdUYXJnZXQ/OiBhbnkpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCB7IHN0ciwgZmxhZ3MsIG9wdGlvbnMsIGFyZ3YgfSA9IGdldFNldHRpbmdPcHRpb25zKC4uLmFyZ0FycmF5IGFzIFtJUmVnRXhwVXNlcklucHV0LCBhbnldKTtcblxuXHRcdFx0XHRvcHRpb25zID0gbWVyZ2VPcHRpb25zKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG5cblx0XHRcdFx0cmV0dXJuIG5ldyB6aFJlZ0V4cChzdHIsIGZsYWdzLCBvcHRpb25zLCAuLi5hcmd2KTtcblx0XHRcdH0sXG5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGdldCh0YXJnZXQ6IGtleW9mIHpoUmVnRXhwLCBrZXk6IGtleW9mIHpoUmVnRXhwIHx0eXBlb2YgU3ltRGVmYXVsdHMpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChrZXkgPT09IFN5bURlZmF1bHRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0W2tleV07XG5cdFx0XHR9LFxuXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gemhSZWdFeHBOZXdcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHN0cjogSVJlZ0V4cFVzZXJJbnB1dCwgb3B0aW9ucz86IElPcHRpb25zSW5wdXQsIC4uLmFyZ3YpXG5cdGNvbnN0cnVjdG9yKHN0cjogSVJlZ0V4cFVzZXJJbnB1dCwgZmxhZ3M/OiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9uc0lucHV0LCAuLi5hcmd2KVxuXHRjb25zdHJ1Y3RvcihzdHI6IElSZWdFeHBVc2VySW5wdXQsIGZsYWdzOiBzdHJpbmcsIHNraXA6IHN0cmluZywgLi4uYXJndilcblx0Y29uc3RydWN0b3Ioc3RyOiBJUmVnRXhwVXNlcklucHV0LCBmbGFnczogc3RyaW5nLCBvcHRpb25zPzogSU9wdGlvbnNJbnB1dCB8IHN0cmluZywgLi4uYXJndilcblx0Y29uc3RydWN0b3Ioc3RyLCAuLi5hcmd2KVxuXHR7XG5cdFx0bGV0IHsgc291cmNlLCBmbGFncyB9ID0gY29yZUhhbmRsZXIoc3RyLCAuLi5hcmd2KTtcblxuXHRcdHN1cGVyKHNvdXJjZSwgZmxhZ3MpO1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZTxUID0gemhSZWdFeHA+KHN0cjogSVJlZ0V4cFVzZXJJbnB1dCwgZmxhZ3M/OiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9uc0lucHV0IHwgc3RyaW5nKTogVFxuXHRzdGF0aWMgY3JlYXRlPFQgPSB6aFJlZ0V4cD4oc3RyOiBJUmVnRXhwVXNlcklucHV0LCBvcHRpb25zPzogSU9wdGlvbnNJbnB1dCk6IFRcblx0c3RhdGljIGNyZWF0ZTxUID0gemhSZWdFeHA+KHN0ciwgZmxhZ3MgPSBudWxsLCBza2lwPywgLi4uYXJndilcblx0e1xuXHRcdHJldHVybiBuZXcgdGhpcyhzdHIsIGZsYWdzLCBza2lwLCAuLi5hcmd2KTtcblx0fVxuXG5cdGdldFN0YXRpYzxUID0gdHlwZW9mIHpoUmVnRXhwPigpOiBUXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEB0b2RvXG5cdCAqL1xuXHR0b1JlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG5cdFx0Ly9yZXR1cm4gYC8ke3RoaXMuc291cmNlfS8ke3RoaXMuZmxhZ3N9YDtcblx0fVxuXG5cdHN0YXRpYyBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cjogc3RyaW5nKVxuXHR7XG5cdFx0cmV0dXJuIHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgc3VwcG9ydCgpXG5cdHtcblx0XHRyZXR1cm4gcmVxdWlyZSgncmVnZXhwLXN1cHBvcnQnKS5kZWZhdWx0IGFzIHR5cGVvZiBpbXBvcnQoJ3JlZ2V4cC1zdXBwb3J0JykuZGVmYXVsdDtcblx0fVxuXG5cdHN0YXRpYyBnZXQgdmVyc2lvbigpOiBzdHJpbmdcblx0e1xuXHRcdHJldHVybiByZXF1aXJlKCcuL3BhY2thZ2UuanNvbicpLnZlcnNpb25cblx0fVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIHpoUmVnRXhwXG57XG5cdGV4cG9ydCBpbXBvcnQgaXNSZWdFeHAgPSBSZWdleHBIZWxwZXIuaXNSZWdFeHA7XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSB6aFJlZ0V4cC5jcmVhdGUuYmluZCh6aFJlZ0V4cCkgYXMgdHlwZW9mIHpoUmVnRXhwLmNyZWF0ZTtcblxuZXhwb3J0IHsgaXNSZWdFeHAsIHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgfVxuXG5leHBvcnQgaW50ZXJmYWNlIElBcGk8VCA9IHpoUmVnRXhwPlxue1xuXHQoc3RyOiBzdHJpbmcgfCBSZWdFeHAsIGZsYWdzPzogc3RyaW5nLCBvcHRpb25zPzogSU9wdGlvbnMgfCBzdHJpbmcpOiBULFxuXHQoc3RyOiBzdHJpbmcgfCBSZWdFeHAsIG9wdGlvbnM/OiBJT3B0aW9ucyk6IFQsXG59XG5cbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCBjb25zdCB2ZXJzaW9uOiBzdHJpbmc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZlcnNpb25cIiwge1xuXHRnZXQoKVxuXHR7XG5cdFx0cmV0dXJuIHJlcXVpcmUoJy4vcGFja2FnZS5qc29uJykudmVyc2lvblxuXHR9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgemhSZWdFeHA7XG4iXX0=