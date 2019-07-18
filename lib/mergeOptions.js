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
/**
 * for `zhRegExp.use` only
 */
function mergeOptions2(base = {}, ...opts) {
    let ret = mergeOptions(base, ...opts);
    if (typeof ret.flags === 'string') {
        ret.defaultFlags = ret.flags;
        delete ret.flags;
    }
    return ret;
}
exports.mergeOptions2 = mergeOptions2;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyZ2VPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7QUFFSCxpRUFBeUM7QUFDekMsNkRBQXFDO0FBRXJDLDJEQUE0RDtBQUk1RCxTQUFnQixVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVE7SUFFNUMsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxFQUNyQjtRQUNDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqQztBQUNGLENBQUM7QUFORCxnQ0FNQztBQVVELFNBQWdCLGlCQUFpQixDQUFnRCxHQUFNLEVBQUUsUUFBZ0MsSUFBSSxFQUFFLFVBQWtDLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFFM0ssSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFDOUM7UUFDQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFhLENBQUM7UUFDL0MsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQVcsQ0FBQztLQUMxQztJQUVELElBQUksT0FBTyxPQUFPLElBQUksUUFBUSxFQUM5QjtRQUNDLE9BQU8sR0FBRztZQUNULElBQUksRUFBRSxPQUFPO1NBQ0QsQ0FBQztLQUNkO0lBRUQsSUFBSSxPQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksUUFBUSxFQUNwQztRQUNDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQ3RCO0lBRUQsT0FBTztRQUNOLEdBQUc7UUFDSCxLQUFLLEVBQUUsS0FBZTtRQUN0QixPQUFPO1FBQ1AsSUFBSTtLQUNKLENBQUE7QUFDRixDQUFDO0FBMUJELDhDQTBCQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsYUFBYSxDQUFvQyxPQUF5QixFQUFzQixFQUMvRyxHQUFHLElBQXdCO0lBRzNCLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUV0QyxJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQ2pDO1FBQ0MsR0FBRyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzdCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztLQUNqQjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ1osQ0FBQztBQWJELHNDQWFDO0FBRUQsU0FBZ0IsWUFBWSxDQUFvQyxPQUF5QixFQUFzQixFQUM5RyxHQUFHLElBQXdCO0lBRzNCLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2Y7SUFFRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNsQjtRQUNDLElBQUksR0FBRyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBRWhDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLGFBQWE7UUFDZCxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ2pCO0lBRUQsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQW5CRCxvQ0FtQkM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxTQUFnQixVQUFVLENBQW9DLE9BQTBCLEVBQUUsYUFBdUI7SUFFaEgsSUFBSSxPQUFPLENBQUMsRUFBRSxFQUNkO1FBQ0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFDN0I7WUFDQywyQ0FBc0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkM7YUFFRDtZQUNDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDMUI7UUFFRCxPQUFPLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBSSxhQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFDdkM7WUFDQyxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDbEI7S0FDRDtJQUVELElBQUksYUFBYSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQ25DO1FBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUMxQjtZQUNDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUN0QjtLQUNEO0lBRUQsYUFBYTtJQUNiLE9BQU8sT0FBTyxDQUFBO0FBQ2YsQ0FBQztBQS9CRCxnQ0ErQkM7QUFFRCxrQkFBZSxZQUFZLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzYvMTUuXG4gKi9cblxuaW1wb3J0IG1lcmdlV2l0aCBmcm9tICdsb2Rhc2gvbWVyZ2VXaXRoJztcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC9pc0FycmF5JztcbmltcG9ydCB7IElPcHRpb25zLCBJT3B0aW9uc0lucHV0LCBJT3B0aW9uc1J1bnRpbWUsIElSZWdFeHBVc2VySW5wdXQsIFN5bURlZmF1bHRzIH0gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnO1xuaW1wb3J0IHsgSU5vZGVJbnB1dCB9IGZyb20gJ3JlZ2V4cC1wYXJzZXItZXZlbnQnO1xuaW1wb3J0IHpoUmVnRXhwIGZyb20gJy4uL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlKVxue1xuXHRpZiAoaXNBcnJheShvYmpWYWx1ZSkpXG5cdHtcblx0XHRyZXR1cm4gb2JqVmFsdWUuY29uY2F0KHNyY1ZhbHVlKTtcblx0fVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRTZXR0aW5nT3B0aW9uczxTIGV4dGVuZHMgSVJlZ0V4cFVzZXJJbnB1dCA9IElSZWdFeHBVc2VySW5wdXQ+XG57XG5cdHN0cjogUztcblx0ZmxhZ3M6IHN0cmluZztcblx0b3B0aW9uczogSU9wdGlvbnNJbnB1dDtcblx0YXJndjogYW55W107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXR0aW5nT3B0aW9uczxTIGV4dGVuZHMgSVJlZ0V4cFVzZXJJbnB1dCA9IElSZWdFeHBVc2VySW5wdXQ+KHN0cjogUywgZmxhZ3M6IElPcHRpb25zSW5wdXQgfCBzdHJpbmcgPSBudWxsLCBvcHRpb25zOiBJT3B0aW9uc0lucHV0IHwgc3RyaW5nID0ge30sIC4uLmFyZ3YpOiBJR2V0U2V0dGluZ09wdGlvbnM8Uz5cbntcblx0aWYgKGZsYWdzICE9PSBudWxsICYmIHR5cGVvZiBmbGFncyA9PSAnb2JqZWN0Jylcblx0e1xuXHRcdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBmbGFncykgYXMgSU9wdGlvbnM7XG5cdFx0ZmxhZ3MgPSAob3B0aW9ucy5mbGFncyB8fCBudWxsKSBhcyBzdHJpbmc7XG5cdH1cblxuXHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycpXG5cdHtcblx0XHRvcHRpb25zID0ge1xuXHRcdFx0c2tpcDogb3B0aW9ucyxcblx0XHR9IGFzIElPcHRpb25zO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBvcHRpb25zLmZsYWdzID09ICdzdHJpbmcnKVxuXHR7XG5cdFx0ZmxhZ3MgPSBvcHRpb25zLmZsYWdzO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzdHIsXG5cdFx0ZmxhZ3M6IGZsYWdzIGFzIHN0cmluZyxcblx0XHRvcHRpb25zLFxuXHRcdGFyZ3YsXG5cdH1cbn1cblxuLyoqXG4gKiBmb3IgYHpoUmVnRXhwLnVzZWAgb25seVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPcHRpb25zMjxUIGV4dGVuZHMgSU5vZGVJbnB1dCA9IElOb2RlSW5wdXQ+KGJhc2U6IElPcHRpb25zSW5wdXQ8VD4gPSB7fSBhcyBJT3B0aW9uc0lucHV0PFQ+LFxuXHQuLi5vcHRzOiBJT3B0aW9uc0lucHV0PFQ+W11cbik6IElPcHRpb25zUnVudGltZTxUPlxue1xuXHRsZXQgcmV0ID0gbWVyZ2VPcHRpb25zKGJhc2UsIC4uLm9wdHMpO1xuXG5cdGlmICh0eXBlb2YgcmV0LmZsYWdzID09PSAnc3RyaW5nJylcblx0e1xuXHRcdHJldC5kZWZhdWx0RmxhZ3MgPSByZXQuZmxhZ3M7XG5cdFx0ZGVsZXRlIHJldC5mbGFncztcblx0fVxuXG5cdHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9wdGlvbnM8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PihiYXNlOiBJT3B0aW9uc0lucHV0PFQ+ID0ge30gYXMgSU9wdGlvbnNJbnB1dDxUPixcblx0Li4ub3B0czogSU9wdGlvbnNJbnB1dDxUPltdXG4pOiBJT3B0aW9uc1J1bnRpbWU8VD5cbntcblx0bGV0IGFyciA9IFtiYXNlIHx8IHt9XVxuXHRcdC5jb25jYXQob3B0cylcblx0XHQuZmlsdGVyKG8gPT4gbylcblx0O1xuXG5cdGlmIChhcnIubGVuZ3RoID4gMSlcblx0e1xuXHRcdGJhc2UgPSBtZXJnZVdpdGgoLi4uKGFyci5tYXAobyA9PlxuXHRcdHtcblx0XHRcdHJldHVybiBmaXhPcHRpb25zKG8pO1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdH0pKSwgY3VzdG9taXplcik7XG5cdH1cblxuXHRyZXR1cm4gZml4T3B0aW9ucyhiYXNlKTtcbn1cblxuLypcbmV4cG9ydCBmdW5jdGlvbiBNZXJnZURlZmF1bHRPcHRpb25zKHRhcmdldDogdHlwZW9mIHpoUmVnRXhwKTogdHlwZW9mIHpoUmVnRXhwXG57XG5cdGNvbnN0IHpoUmVnRXhwTmV3ID0gY2xhc3MgemhSZWdFeHAgZXh0ZW5kcyB0YXJnZXRcblx0e1xuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3M6IFthbnksIC4uLmFueVtdXSlcblx0XHR7XG5cdFx0XHRsZXQgeyBzdHIsIGZsYWdzLCBvcHRpb25zLCBhcmd2IH0gPSBnZXRTZXR0aW5nT3B0aW9ucyguLi5hcmdzKTtcblxuXHRcdFx0b3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh7fSwgemhSZWdFeHBOZXdbU3ltRGVmYXVsdHNdLCBvcHRpb25zKTtcblxuXHRcdFx0c3VwZXIoc3RyLCBmbGFncywgb3B0aW9ucywgLi4uYXJndilcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIHpoUmVnRXhwTmV3XG59XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZpeE9wdGlvbnM8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PihvcHRpb25zPzogSU9wdGlvbnNJbnB1dDxUPiwgcmVtb3ZlRW1wdHlPbj86IGJvb2xlYW4pOiBJT3B0aW9uc1J1bnRpbWU8VD5cbntcblx0aWYgKG9wdGlvbnMub24pXG5cdHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLm9uKSlcblx0XHR7XG5cdFx0XHRhcnJheV91bmlxdWVfb3ZlcndyaXRlKG9wdGlvbnMub24pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5vbiA9IFtvcHRpb25zLm9uXTtcblx0XHR9XG5cblx0XHRvcHRpb25zLm9uID0gb3B0aW9ucy5vbi5maWx0ZXIodiA9PiB2KTtcblxuXHRcdGlmIChyZW1vdmVFbXB0eU9uICYmICFvcHRpb25zLm9uLmxlbmd0aClcblx0XHR7XG5cdFx0XHRkZWxldGUgb3B0aW9ucy5vbjtcblx0XHR9XG5cdH1cblxuXHRpZiAocmVtb3ZlRW1wdHlPbiAmJiBvcHRpb25zLm9uQ29yZSlcblx0e1xuXHRcdGlmICghb3B0aW9ucy5vbkNvcmUubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBvcHRpb25zLm9uQ29yZTtcblx0XHR9XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdHJldHVybiBvcHRpb25zXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlT3B0aW9uc1xuIl19