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
        base = mergeWith_1.default(...(arr.map(o => {
            return fixOptions(o);
            // @ts-ignore
        })), customizer);
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
    if (removeEmptyOn && options.onCore) {
        if (!options.onCore.length) {
            delete options.onCore;
        }
    }
    // @ts-ignore
    return options;
}
exports.fixOptions = fixOptions;
exports.default = mergeOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyZ2VPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7QUFFSCxpRUFBeUM7QUFDekMsNkRBQXFDO0FBRXJDLDJEQUE0RDtBQUk1RCxTQUFnQixVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVE7SUFFNUMsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxFQUNyQjtRQUNDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqQztBQUNGLENBQUM7QUFORCxnQ0FNQztBQVVELFNBQWdCLGlCQUFpQixDQUFnRCxHQUFNLEVBQUUsUUFBZ0MsSUFBSSxFQUFFLFVBQWtDLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFFM0ssSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFDOUM7UUFDQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFhLENBQUM7UUFDL0MsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQVcsQ0FBQztLQUMxQztJQUVELElBQUksT0FBTyxPQUFPLElBQUksUUFBUSxFQUM5QjtRQUNDLE9BQU8sR0FBRztZQUNULElBQUksRUFBRSxPQUFPO1NBQ0QsQ0FBQztLQUNkO0lBRUQsSUFBSSxPQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksUUFBUSxFQUNwQztRQUNDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQ3RCO0lBRUQsT0FBTztRQUNOLEdBQUc7UUFDSCxLQUFLLEVBQUUsS0FBZTtRQUN0QixPQUFPO1FBQ1AsSUFBSTtLQUNKLENBQUE7QUFDRixDQUFDO0FBMUJELDhDQTBCQztBQUVELFNBQWdCLFlBQVksQ0FBb0MsT0FBeUIsRUFBc0IsRUFDOUcsR0FBRyxJQUF3QjtJQUczQixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7U0FDcEIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNmO0lBRUQsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDbEI7UUFDQyxJQUFJLEdBQUcsbUJBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUVoQyxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixhQUFhO1FBQ2QsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNqQjtJQUVELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFuQkQsb0NBbUJDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsU0FBZ0IsVUFBVSxDQUFvQyxPQUEwQixFQUFFLGFBQXVCO0lBRWhILElBQUksT0FBTyxDQUFDLEVBQUUsRUFDZDtRQUNDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQzdCO1lBQ0MsMkNBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25DO2FBRUQ7WUFDQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksYUFBYSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQ3ZDO1lBQ0MsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ2xCO0tBQ0Q7SUFFRCxJQUFJLGFBQWEsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUNuQztRQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFDMUI7WUFDQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDdEI7S0FDRDtJQUVELGFBQWE7SUFDYixPQUFPLE9BQU8sQ0FBQTtBQUNmLENBQUM7QUEvQkQsZ0NBK0JDO0FBRUQsa0JBQWUsWUFBWSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS82LzE1LlxuICovXG5cbmltcG9ydCBtZXJnZVdpdGggZnJvbSAnbG9kYXNoL21lcmdlV2l0aCc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvaXNBcnJheSc7XG5pbXBvcnQgeyBJT3B0aW9ucywgSU9wdGlvbnNJbnB1dCwgSU9wdGlvbnNSdW50aW1lLCBJUmVnRXhwVXNlcklucHV0LCBTeW1EZWZhdWx0cyB9IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgeyBhcnJheV91bmlxdWVfb3ZlcndyaXRlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJztcbmltcG9ydCB7IElOb2RlSW5wdXQgfSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCB6aFJlZ0V4cCBmcm9tICcuLi9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSlcbntcblx0aWYgKGlzQXJyYXkob2JqVmFsdWUpKVxuXHR7XG5cdFx0cmV0dXJuIG9ialZhbHVlLmNvbmNhdChzcmNWYWx1ZSk7XG5cdH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJR2V0U2V0dGluZ09wdGlvbnM8UyBleHRlbmRzIElSZWdFeHBVc2VySW5wdXQgPSBJUmVnRXhwVXNlcklucHV0Plxue1xuXHRzdHI6IFM7XG5cdGZsYWdzOiBzdHJpbmc7XG5cdG9wdGlvbnM6IElPcHRpb25zSW5wdXQ7XG5cdGFyZ3Y6IGFueVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2V0dGluZ09wdGlvbnM8UyBleHRlbmRzIElSZWdFeHBVc2VySW5wdXQgPSBJUmVnRXhwVXNlcklucHV0PihzdHI6IFMsIGZsYWdzOiBJT3B0aW9uc0lucHV0IHwgc3RyaW5nID0gbnVsbCwgb3B0aW9uczogSU9wdGlvbnNJbnB1dCB8IHN0cmluZyA9IHt9LCAuLi5hcmd2KTogSUdldFNldHRpbmdPcHRpb25zPFM+XG57XG5cdGlmIChmbGFncyAhPT0gbnVsbCAmJiB0eXBlb2YgZmxhZ3MgPT0gJ29iamVjdCcpXG5cdHtcblx0XHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZmxhZ3MpIGFzIElPcHRpb25zO1xuXHRcdGZsYWdzID0gKG9wdGlvbnMuZmxhZ3MgfHwgbnVsbCkgYXMgc3RyaW5nO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBvcHRpb25zID09ICdzdHJpbmcnKVxuXHR7XG5cdFx0b3B0aW9ucyA9IHtcblx0XHRcdHNraXA6IG9wdGlvbnMsXG5cdFx0fSBhcyBJT3B0aW9ucztcblx0fVxuXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5mbGFncyA9PSAnc3RyaW5nJylcblx0e1xuXHRcdGZsYWdzID0gb3B0aW9ucy5mbGFncztcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RyLFxuXHRcdGZsYWdzOiBmbGFncyBhcyBzdHJpbmcsXG5cdFx0b3B0aW9ucyxcblx0XHRhcmd2LFxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9wdGlvbnM8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PihiYXNlOiBJT3B0aW9uc0lucHV0PFQ+ID0ge30gYXMgSU9wdGlvbnNJbnB1dDxUPixcblx0Li4ub3B0czogSU9wdGlvbnNJbnB1dDxUPltdXG4pOiBJT3B0aW9uc1J1bnRpbWU8VD5cbntcblx0bGV0IGFyciA9IFtiYXNlIHx8IHt9XVxuXHRcdC5jb25jYXQob3B0cylcblx0XHQuZmlsdGVyKG8gPT4gbylcblx0O1xuXG5cdGlmIChhcnIubGVuZ3RoID4gMSlcblx0e1xuXHRcdGJhc2UgPSBtZXJnZVdpdGgoLi4uKGFyci5tYXAobyA9PlxuXHRcdHtcblx0XHRcdHJldHVybiBmaXhPcHRpb25zKG8pO1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdH0pKSwgY3VzdG9taXplcik7XG5cdH1cblxuXHRyZXR1cm4gZml4T3B0aW9ucyhiYXNlKTtcbn1cblxuLypcbmV4cG9ydCBmdW5jdGlvbiBNZXJnZURlZmF1bHRPcHRpb25zKHRhcmdldDogdHlwZW9mIHpoUmVnRXhwKTogdHlwZW9mIHpoUmVnRXhwXG57XG5cdGNvbnN0IHpoUmVnRXhwTmV3ID0gY2xhc3MgemhSZWdFeHAgZXh0ZW5kcyB0YXJnZXRcblx0e1xuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3M6IFthbnksIC4uLmFueVtdXSlcblx0XHR7XG5cdFx0XHRsZXQgeyBzdHIsIGZsYWdzLCBvcHRpb25zLCBhcmd2IH0gPSBnZXRTZXR0aW5nT3B0aW9ucyguLi5hcmdzKTtcblxuXHRcdFx0b3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh7fSwgemhSZWdFeHBOZXdbU3ltRGVmYXVsdHNdLCBvcHRpb25zKTtcblxuXHRcdFx0c3VwZXIoc3RyLCBmbGFncywgb3B0aW9ucywgLi4uYXJndilcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIHpoUmVnRXhwTmV3XG59XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZpeE9wdGlvbnM8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PihvcHRpb25zPzogSU9wdGlvbnNJbnB1dDxUPiwgcmVtb3ZlRW1wdHlPbj86IGJvb2xlYW4pOiBJT3B0aW9uc1J1bnRpbWU8VD5cbntcblx0aWYgKG9wdGlvbnMub24pXG5cdHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLm9uKSlcblx0XHR7XG5cdFx0XHRhcnJheV91bmlxdWVfb3ZlcndyaXRlKG9wdGlvbnMub24pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5vbiA9IFtvcHRpb25zLm9uXTtcblx0XHR9XG5cblx0XHRvcHRpb25zLm9uID0gb3B0aW9ucy5vbi5maWx0ZXIodiA9PiB2KTtcblxuXHRcdGlmIChyZW1vdmVFbXB0eU9uICYmICFvcHRpb25zLm9uLmxlbmd0aClcblx0XHR7XG5cdFx0XHRkZWxldGUgb3B0aW9ucy5vbjtcblx0XHR9XG5cdH1cblxuXHRpZiAocmVtb3ZlRW1wdHlPbiAmJiBvcHRpb25zLm9uQ29yZSlcblx0e1xuXHRcdGlmICghb3B0aW9ucy5vbkNvcmUubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBvcHRpb25zLm9uQ29yZTtcblx0XHR9XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdHJldHVybiBvcHRpb25zXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlT3B0aW9uc1xuIl19