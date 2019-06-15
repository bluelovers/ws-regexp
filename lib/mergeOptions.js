"use strict";
/**
 * Created by user on 2019/6/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mergeWith = require("lodash/mergeWith");
const isArray = require("lodash/isArray");
const array_hyper_unique_1 = require("array-hyper-unique");
function customizer(objValue, srcValue) {
    if (isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}
exports.customizer = customizer;
function getSettingOptions(str, flags = null, options = {}, ...argv) {
    if (flags !== null && typeof flags == 'object') {
        options = Object.assign({}, flags);
        flags = options.flags || null;
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
        flags,
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
        base = mergeWith(...arr.map(o => {
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
function fixOptions(options) {
    if (options.on) {
        if (Array.isArray(options.on)) {
            array_hyper_unique_1.array_unique_overwrite(options.on);
        }
        else {
            options.on = [options.on];
        }
        options.on = options.on.filter(v => v);
    }
    // @ts-ignore
    return options;
}
exports.fixOptions = fixOptions;
exports.default = mergeOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyZ2VPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSCw4Q0FBK0M7QUFDL0MsMENBQTJDO0FBRTNDLDJEQUE0RDtBQUk1RCxTQUFnQixVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVE7SUFFNUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQ3JCO1FBQ0MsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0YsQ0FBQztBQU5ELGdDQU1DO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsVUFBa0MsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUVqRyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUM5QztRQUNDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQWEsQ0FBQztRQUMvQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7S0FDOUI7SUFFRCxJQUFJLE9BQU8sT0FBTyxJQUFJLFFBQVEsRUFDOUI7UUFDQyxPQUFPLEdBQUc7WUFDVCxJQUFJLEVBQUUsT0FBTztTQUNELENBQUM7S0FDZDtJQUVELElBQUksT0FBTyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFDcEM7UUFDQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUN0QjtJQUVELE9BQU87UUFDTixHQUFHO1FBQ0gsS0FBSztRQUNMLE9BQU87UUFDUCxJQUFJO0tBQ0osQ0FBQTtBQUNGLENBQUM7QUExQkQsOENBMEJDO0FBRUQsU0FBZ0IsWUFBWSxDQUFvQyxPQUF5QixFQUFzQixFQUM5RyxHQUFHLElBQXdCO0lBRzNCLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2Y7SUFFRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNsQjtRQUNDLElBQUksR0FBSSxTQUFzQixDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUU3QyxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUMxQjtJQUVELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFsQkQsb0NBa0JDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsU0FBZ0IsVUFBVSxDQUFvQyxPQUEwQjtJQUV2RixJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQ2Q7UUFDQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUM3QjtZQUNDLDJDQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuQzthQUVEO1lBQ0MsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU8sQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN2QztJQUVELGFBQWE7SUFDYixPQUFPLE9BQU8sQ0FBQTtBQUNmLENBQUM7QUFsQkQsZ0NBa0JDO0FBRUQsa0JBQWUsWUFBWSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS82LzE1LlxuICovXG5cbmltcG9ydCBtZXJnZVdpdGggPSByZXF1aXJlKCdsb2Rhc2gvbWVyZ2VXaXRoJyk7XG5pbXBvcnQgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC9pc0FycmF5Jyk7XG5pbXBvcnQgeyBJT3B0aW9ucywgSU9wdGlvbnNJbnB1dCwgSU9wdGlvbnNSdW50aW1lLCBTeW1EZWZhdWx0cyB9IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgeyBhcnJheV91bmlxdWVfb3ZlcndyaXRlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJztcbmltcG9ydCB7IElOb2RlSW5wdXQgfSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCB6aFJlZ0V4cCBmcm9tICcuLi9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSlcbntcblx0aWYgKGlzQXJyYXkob2JqVmFsdWUpKVxuXHR7XG5cdFx0cmV0dXJuIG9ialZhbHVlLmNvbmNhdChzcmNWYWx1ZSk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNldHRpbmdPcHRpb25zKHN0ciwgZmxhZ3MgPSBudWxsLCBvcHRpb25zOiBJT3B0aW9uc0lucHV0IHwgc3RyaW5nID0ge30sIC4uLmFyZ3YpXG57XG5cdGlmIChmbGFncyAhPT0gbnVsbCAmJiB0eXBlb2YgZmxhZ3MgPT0gJ29iamVjdCcpXG5cdHtcblx0XHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZmxhZ3MpIGFzIElPcHRpb25zO1xuXHRcdGZsYWdzID0gb3B0aW9ucy5mbGFncyB8fCBudWxsO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBvcHRpb25zID09ICdzdHJpbmcnKVxuXHR7XG5cdFx0b3B0aW9ucyA9IHtcblx0XHRcdHNraXA6IG9wdGlvbnMsXG5cdFx0fSBhcyBJT3B0aW9ucztcblx0fVxuXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5mbGFncyA9PSAnc3RyaW5nJylcblx0e1xuXHRcdGZsYWdzID0gb3B0aW9ucy5mbGFncztcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RyLFxuXHRcdGZsYWdzLFxuXHRcdG9wdGlvbnMsXG5cdFx0YXJndixcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPcHRpb25zPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4oYmFzZTogSU9wdGlvbnNJbnB1dDxUPiA9IHt9IGFzIElPcHRpb25zSW5wdXQ8VD4sXG5cdC4uLm9wdHM6IElPcHRpb25zSW5wdXQ8VD5bXVxuKTogSU9wdGlvbnNSdW50aW1lPFQ+XG57XG5cdGxldCBhcnIgPSBbYmFzZSB8fCB7fV1cblx0XHQuY29uY2F0KG9wdHMpXG5cdFx0LmZpbHRlcihvID0+IG8pXG5cdDtcblxuXHRpZiAoYXJyLmxlbmd0aCA+IDEpXG5cdHtcblx0XHRiYXNlID0gKG1lcmdlV2l0aCBhcyBGdW5jdGlvbikoLi4uYXJyLm1hcChvID0+XG5cdFx0e1xuXHRcdFx0cmV0dXJuIGZpeE9wdGlvbnMobyk7XG5cdFx0fSkgYXMgW1QsIFRdLCBjdXN0b21pemVyKTtcblx0fVxuXG5cdHJldHVybiBmaXhPcHRpb25zKGJhc2UpO1xufVxuXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIE1lcmdlRGVmYXVsdE9wdGlvbnModGFyZ2V0OiB0eXBlb2YgemhSZWdFeHApOiB0eXBlb2YgemhSZWdFeHBcbntcblx0Y29uc3QgemhSZWdFeHBOZXcgPSBjbGFzcyB6aFJlZ0V4cCBleHRlbmRzIHRhcmdldFxuXHR7XG5cdFx0Y29uc3RydWN0b3IoLi4uYXJnczogW2FueSwgLi4uYW55W11dKVxuXHRcdHtcblx0XHRcdGxldCB7IHN0ciwgZmxhZ3MsIG9wdGlvbnMsIGFyZ3YgfSA9IGdldFNldHRpbmdPcHRpb25zKC4uLmFyZ3MpO1xuXG5cdFx0XHRvcHRpb25zID0gbWVyZ2VPcHRpb25zKHt9LCB6aFJlZ0V4cE5ld1tTeW1EZWZhdWx0c10sIG9wdGlvbnMpO1xuXG5cdFx0XHRzdXBlcihzdHIsIGZsYWdzLCBvcHRpb25zLCAuLi5hcmd2KVxuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gemhSZWdFeHBOZXdcbn1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZml4T3B0aW9uczxUIGV4dGVuZHMgSU5vZGVJbnB1dCA9IElOb2RlSW5wdXQ+KG9wdGlvbnM/OiBJT3B0aW9uc0lucHV0PFQ+KTogSU9wdGlvbnNSdW50aW1lPFQ+XG57XG5cdGlmIChvcHRpb25zLm9uKVxuXHR7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5vbikpXG5cdFx0e1xuXHRcdFx0YXJyYXlfdW5pcXVlX292ZXJ3cml0ZShvcHRpb25zLm9uKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG9wdGlvbnMub24gPSBbb3B0aW9ucy5vbl07XG5cdFx0fVxuXG5cdFx0b3B0aW9ucy5vbiA9IG9wdGlvbnMub24uZmlsdGVyKHYgPT4gdik7XG5cdH1cblxuXHQvLyBAdHMtaWdub3JlXG5cdHJldHVybiBvcHRpb25zXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlT3B0aW9uc1xuIl19