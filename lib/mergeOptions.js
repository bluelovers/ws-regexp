"use strict";
/**
 * Created by user on 2019/6/15.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mergeWith_1 = __importDefault(require("lodash/mergeWith"));
const isArray_1 = __importDefault(require("lodash/isArray"));
const array_hyper_unique_1 = require("array-hyper-unique");
function customizer(objValue, srcValue) {
    if (isArray_1.default(objValue)) {
        return objValue.concat(srcValue);
    }
}
exports.customizer = customizer;
function getSettingOptions(str, flags = null, options = {}, ...argv) {
    if (flags !== null && typeof flags == 'object') {
        options = Object.assign({}, flags);
        flags = (options.flags || null);
    }
    if (typeof options == 'string') {
        options = {
            skip: options,
        };
    }
    if (typeof options.flags == 'string') {
        flags = options.flags;
    }
    return {
        str,
        flags: flags,
        options,
        argv,
    };
}
exports.getSettingOptions = getSettingOptions;
function mergeOptions(base = {}, ...opts) {
    let arr = [base || {}]
        .concat(opts)
        .filter(o => o);
    if (arr.length > 1) {
        base = mergeWith_1.default(...arr.map(o => {
            return fixOptions(o);
        }), customizer);
    }
    return fixOptions(base);
}
exports.mergeOptions = mergeOptions;
/*
export function MergeDefaultOptions(target: typeof zhRegExp): typeof zhRegExp
{
    const zhRegExpNew = class zhRegExp extends target
    {
        constructor(...args: [any, ...any[]])
        {
            let { str, flags, options, argv } = getSettingOptions(...args);

            options = mergeOptions({}, zhRegExpNew[SymDefaults], options);

            super(str, flags, options, ...argv)
        }
    };

    return zhRegExpNew
}
 */
function fixOptions(options, removeEmptyOn) {
    if (options.on) {
        if (Array.isArray(options.on)) {
            array_hyper_unique_1.array_unique_overwrite(options.on);
        }
        else {
            options.on = [options.on];
        }
        options.on = options.on.filter(v => v);
        if (removeEmptyOn && !options.on.length) {
            delete options.on;
        }
    }
    // @ts-ignore
    return options;
}
exports.fixOptions = fixOptions;
exports.default = mergeOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyZ2VPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7QUFFSCxpRUFBeUM7QUFDekMsNkRBQXFDO0FBRXJDLDJEQUE0RDtBQUk1RCxTQUFnQixVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVE7SUFFNUMsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxFQUNyQjtRQUNDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqQztBQUNGLENBQUM7QUFORCxnQ0FNQztBQVVELFNBQWdCLGlCQUFpQixDQUFnRCxHQUFNLEVBQUUsUUFBZ0MsSUFBSSxFQUFFLFVBQWtDLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFFM0ssSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFDOUM7UUFDQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFhLENBQUM7UUFDL0MsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQVcsQ0FBQztLQUMxQztJQUVELElBQUksT0FBTyxPQUFPLElBQUksUUFBUSxFQUM5QjtRQUNDLE9BQU8sR0FBRztZQUNULElBQUksRUFBRSxPQUFPO1NBQ0QsQ0FBQztLQUNkO0lBRUQsSUFBSSxPQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksUUFBUSxFQUNwQztRQUNDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQ3RCO0lBRUQsT0FBTztRQUNOLEdBQUc7UUFDSCxLQUFLLEVBQUUsS0FBZTtRQUN0QixPQUFPO1FBQ1AsSUFBSTtLQUNKLENBQUE7QUFDRixDQUFDO0FBMUJELDhDQTBCQztBQUVELFNBQWdCLFlBQVksQ0FBb0MsT0FBeUIsRUFBc0IsRUFDOUcsR0FBRyxJQUF3QjtJQUczQixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7U0FDcEIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNmO0lBRUQsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDbEI7UUFDQyxJQUFJLEdBQUksbUJBQXNCLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBRTdDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzFCO0lBRUQsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQWxCRCxvQ0FrQkM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxTQUFnQixVQUFVLENBQW9DLE9BQTBCLEVBQUUsYUFBdUI7SUFFaEgsSUFBSSxPQUFPLENBQUMsRUFBRSxFQUNkO1FBQ0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFDN0I7WUFDQywyQ0FBc0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkM7YUFFRDtZQUNDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDMUI7UUFFRCxPQUFPLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBSSxhQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFDdkM7WUFDQyxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDbEI7S0FDRDtJQUVELGFBQWE7SUFDYixPQUFPLE9BQU8sQ0FBQTtBQUNmLENBQUM7QUF2QkQsZ0NBdUJDO0FBRUQsa0JBQWUsWUFBWSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS82LzE1LlxuICovXG5cbmltcG9ydCBtZXJnZVdpdGggZnJvbSAnbG9kYXNoL21lcmdlV2l0aCc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvaXNBcnJheSc7XG5pbXBvcnQgeyBJT3B0aW9ucywgSU9wdGlvbnNJbnB1dCwgSU9wdGlvbnNSdW50aW1lLCBJUmVnRXhwVXNlcklucHV0LCBTeW1EZWZhdWx0cyB9IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgeyBhcnJheV91bmlxdWVfb3ZlcndyaXRlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJztcbmltcG9ydCB7IElOb2RlSW5wdXQgfSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCB6aFJlZ0V4cCBmcm9tICcuLi9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSlcbntcblx0aWYgKGlzQXJyYXkob2JqVmFsdWUpKVxuXHR7XG5cdFx0cmV0dXJuIG9ialZhbHVlLmNvbmNhdChzcmNWYWx1ZSk7XG5cdH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJR2V0U2V0dGluZ09wdGlvbnM8UyBleHRlbmRzIElSZWdFeHBVc2VySW5wdXQgPSBJUmVnRXhwVXNlcklucHV0Plxue1xuXHRzdHI6IFM7XG5cdGZsYWdzOiBzdHJpbmc7XG5cdG9wdGlvbnM6IElPcHRpb25zSW5wdXQ7XG5cdGFyZ3Y6IGFueVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2V0dGluZ09wdGlvbnM8UyBleHRlbmRzIElSZWdFeHBVc2VySW5wdXQgPSBJUmVnRXhwVXNlcklucHV0PihzdHI6IFMsIGZsYWdzOiBJT3B0aW9uc0lucHV0IHwgc3RyaW5nID0gbnVsbCwgb3B0aW9uczogSU9wdGlvbnNJbnB1dCB8IHN0cmluZyA9IHt9LCAuLi5hcmd2KTogSUdldFNldHRpbmdPcHRpb25zPFM+XG57XG5cdGlmIChmbGFncyAhPT0gbnVsbCAmJiB0eXBlb2YgZmxhZ3MgPT0gJ29iamVjdCcpXG5cdHtcblx0XHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZmxhZ3MpIGFzIElPcHRpb25zO1xuXHRcdGZsYWdzID0gKG9wdGlvbnMuZmxhZ3MgfHwgbnVsbCkgYXMgc3RyaW5nO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBvcHRpb25zID09ICdzdHJpbmcnKVxuXHR7XG5cdFx0b3B0aW9ucyA9IHtcblx0XHRcdHNraXA6IG9wdGlvbnMsXG5cdFx0fSBhcyBJT3B0aW9ucztcblx0fVxuXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5mbGFncyA9PSAnc3RyaW5nJylcblx0e1xuXHRcdGZsYWdzID0gb3B0aW9ucy5mbGFncztcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RyLFxuXHRcdGZsYWdzOiBmbGFncyBhcyBzdHJpbmcsXG5cdFx0b3B0aW9ucyxcblx0XHRhcmd2LFxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9wdGlvbnM8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PihiYXNlOiBJT3B0aW9uc0lucHV0PFQ+ID0ge30gYXMgSU9wdGlvbnNJbnB1dDxUPixcblx0Li4ub3B0czogSU9wdGlvbnNJbnB1dDxUPltdXG4pOiBJT3B0aW9uc1J1bnRpbWU8VD5cbntcblx0bGV0IGFyciA9IFtiYXNlIHx8IHt9XVxuXHRcdC5jb25jYXQob3B0cylcblx0XHQuZmlsdGVyKG8gPT4gbylcblx0O1xuXG5cdGlmIChhcnIubGVuZ3RoID4gMSlcblx0e1xuXHRcdGJhc2UgPSAobWVyZ2VXaXRoIGFzIEZ1bmN0aW9uKSguLi5hcnIubWFwKG8gPT5cblx0XHR7XG5cdFx0XHRyZXR1cm4gZml4T3B0aW9ucyhvKTtcblx0XHR9KSBhcyBbVCwgVF0sIGN1c3RvbWl6ZXIpO1xuXHR9XG5cblx0cmV0dXJuIGZpeE9wdGlvbnMoYmFzZSk7XG59XG5cbi8qXG5leHBvcnQgZnVuY3Rpb24gTWVyZ2VEZWZhdWx0T3B0aW9ucyh0YXJnZXQ6IHR5cGVvZiB6aFJlZ0V4cCk6IHR5cGVvZiB6aFJlZ0V4cFxue1xuXHRjb25zdCB6aFJlZ0V4cE5ldyA9IGNsYXNzIHpoUmVnRXhwIGV4dGVuZHMgdGFyZ2V0XG5cdHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzOiBbYW55LCAuLi5hbnlbXV0pXG5cdFx0e1xuXHRcdFx0bGV0IHsgc3RyLCBmbGFncywgb3B0aW9ucywgYXJndiB9ID0gZ2V0U2V0dGluZ09wdGlvbnMoLi4uYXJncyk7XG5cblx0XHRcdG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoe30sIHpoUmVnRXhwTmV3W1N5bURlZmF1bHRzXSwgb3B0aW9ucyk7XG5cblx0XHRcdHN1cGVyKHN0ciwgZmxhZ3MsIG9wdGlvbnMsIC4uLmFyZ3YpXG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiB6aFJlZ0V4cE5ld1xufVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmaXhPcHRpb25zPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4ob3B0aW9ucz86IElPcHRpb25zSW5wdXQ8VD4sIHJlbW92ZUVtcHR5T24/OiBib29sZWFuKTogSU9wdGlvbnNSdW50aW1lPFQ+XG57XG5cdGlmIChvcHRpb25zLm9uKVxuXHR7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5vbikpXG5cdFx0e1xuXHRcdFx0YXJyYXlfdW5pcXVlX292ZXJ3cml0ZShvcHRpb25zLm9uKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG9wdGlvbnMub24gPSBbb3B0aW9ucy5vbl07XG5cdFx0fVxuXG5cdFx0b3B0aW9ucy5vbiA9IG9wdGlvbnMub24uZmlsdGVyKHYgPT4gdik7XG5cblx0XHRpZiAocmVtb3ZlRW1wdHlPbiAmJiAhb3B0aW9ucy5vbi5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0ZGVsZXRlIG9wdGlvbnMub247XG5cdFx0fVxuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRyZXR1cm4gb3B0aW9uc1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZXJnZU9wdGlvbnNcbiJdfQ==