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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyZ2VPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSCw4Q0FBK0M7QUFDL0MsMENBQTJDO0FBRTNDLDJEQUE0RDtBQUk1RCxTQUFnQixVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVE7SUFFNUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQ3JCO1FBQ0MsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0YsQ0FBQztBQU5ELGdDQU1DO0FBVUQsU0FBZ0IsaUJBQWlCLENBQWdELEdBQU0sRUFBRSxRQUFnQyxJQUFJLEVBQUUsVUFBa0MsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUUzSyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUM5QztRQUNDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQWEsQ0FBQztRQUMvQyxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBVyxDQUFDO0tBQzFDO0lBRUQsSUFBSSxPQUFPLE9BQU8sSUFBSSxRQUFRLEVBQzlCO1FBQ0MsT0FBTyxHQUFHO1lBQ1QsSUFBSSxFQUFFLE9BQU87U0FDRCxDQUFDO0tBQ2Q7SUFFRCxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQ3BDO1FBQ0MsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDdEI7SUFFRCxPQUFPO1FBQ04sR0FBRztRQUNILEtBQUssRUFBRSxLQUFlO1FBQ3RCLE9BQU87UUFDUCxJQUFJO0tBQ0osQ0FBQTtBQUNGLENBQUM7QUExQkQsOENBMEJDO0FBRUQsU0FBZ0IsWUFBWSxDQUFvQyxPQUF5QixFQUFzQixFQUM5RyxHQUFHLElBQXdCO0lBRzNCLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2Y7SUFFRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNsQjtRQUNDLElBQUksR0FBSSxTQUFzQixDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUU3QyxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUMxQjtJQUVELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFsQkQsb0NBa0JDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsU0FBZ0IsVUFBVSxDQUFvQyxPQUEwQixFQUFFLGFBQXVCO0lBRWhILElBQUksT0FBTyxDQUFDLEVBQUUsRUFDZDtRQUNDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQzdCO1lBQ0MsMkNBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25DO2FBRUQ7WUFDQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksYUFBYSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQ3ZDO1lBQ0MsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ2xCO0tBQ0Q7SUFFRCxhQUFhO0lBQ2IsT0FBTyxPQUFPLENBQUE7QUFDZixDQUFDO0FBdkJELGdDQXVCQztBQUVELGtCQUFlLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNi8xNS5cbiAqL1xuXG5pbXBvcnQgbWVyZ2VXaXRoID0gcmVxdWlyZSgnbG9kYXNoL21lcmdlV2l0aCcpO1xuaW1wb3J0IGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2gvaXNBcnJheScpO1xuaW1wb3J0IHsgSU9wdGlvbnMsIElPcHRpb25zSW5wdXQsIElPcHRpb25zUnVudGltZSwgSVJlZ0V4cFVzZXJJbnB1dCwgU3ltRGVmYXVsdHMgfSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgYXJyYXlfdW5pcXVlX292ZXJ3cml0ZSB9IGZyb20gJ2FycmF5LWh5cGVyLXVuaXF1ZSc7XG5pbXBvcnQgeyBJTm9kZUlucHV0IH0gZnJvbSAncmVnZXhwLXBhcnNlci1ldmVudCc7XG5pbXBvcnQgemhSZWdFeHAgZnJvbSAnLi4vaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUpXG57XG5cdGlmIChpc0FycmF5KG9ialZhbHVlKSlcblx0e1xuXHRcdHJldHVybiBvYmpWYWx1ZS5jb25jYXQoc3JjVmFsdWUpO1xuXHR9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldFNldHRpbmdPcHRpb25zPFMgZXh0ZW5kcyBJUmVnRXhwVXNlcklucHV0ID0gSVJlZ0V4cFVzZXJJbnB1dD5cbntcblx0c3RyOiBTO1xuXHRmbGFnczogc3RyaW5nO1xuXHRvcHRpb25zOiBJT3B0aW9uc0lucHV0O1xuXHRhcmd2OiBhbnlbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNldHRpbmdPcHRpb25zPFMgZXh0ZW5kcyBJUmVnRXhwVXNlcklucHV0ID0gSVJlZ0V4cFVzZXJJbnB1dD4oc3RyOiBTLCBmbGFnczogSU9wdGlvbnNJbnB1dCB8IHN0cmluZyA9IG51bGwsIG9wdGlvbnM6IElPcHRpb25zSW5wdXQgfCBzdHJpbmcgPSB7fSwgLi4uYXJndik6IElHZXRTZXR0aW5nT3B0aW9uczxTPlxue1xuXHRpZiAoZmxhZ3MgIT09IG51bGwgJiYgdHlwZW9mIGZsYWdzID09ICdvYmplY3QnKVxuXHR7XG5cdFx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGZsYWdzKSBhcyBJT3B0aW9ucztcblx0XHRmbGFncyA9IChvcHRpb25zLmZsYWdzIHx8IG51bGwpIGFzIHN0cmluZztcblx0fVxuXG5cdGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnc3RyaW5nJylcblx0e1xuXHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRza2lwOiBvcHRpb25zLFxuXHRcdH0gYXMgSU9wdGlvbnM7XG5cdH1cblxuXHRpZiAodHlwZW9mIG9wdGlvbnMuZmxhZ3MgPT0gJ3N0cmluZycpXG5cdHtcblx0XHRmbGFncyA9IG9wdGlvbnMuZmxhZ3M7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHN0cixcblx0XHRmbGFnczogZmxhZ3MgYXMgc3RyaW5nLFxuXHRcdG9wdGlvbnMsXG5cdFx0YXJndixcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPcHRpb25zPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4oYmFzZTogSU9wdGlvbnNJbnB1dDxUPiA9IHt9IGFzIElPcHRpb25zSW5wdXQ8VD4sXG5cdC4uLm9wdHM6IElPcHRpb25zSW5wdXQ8VD5bXVxuKTogSU9wdGlvbnNSdW50aW1lPFQ+XG57XG5cdGxldCBhcnIgPSBbYmFzZSB8fCB7fV1cblx0XHQuY29uY2F0KG9wdHMpXG5cdFx0LmZpbHRlcihvID0+IG8pXG5cdDtcblxuXHRpZiAoYXJyLmxlbmd0aCA+IDEpXG5cdHtcblx0XHRiYXNlID0gKG1lcmdlV2l0aCBhcyBGdW5jdGlvbikoLi4uYXJyLm1hcChvID0+XG5cdFx0e1xuXHRcdFx0cmV0dXJuIGZpeE9wdGlvbnMobyk7XG5cdFx0fSkgYXMgW1QsIFRdLCBjdXN0b21pemVyKTtcblx0fVxuXG5cdHJldHVybiBmaXhPcHRpb25zKGJhc2UpO1xufVxuXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIE1lcmdlRGVmYXVsdE9wdGlvbnModGFyZ2V0OiB0eXBlb2YgemhSZWdFeHApOiB0eXBlb2YgemhSZWdFeHBcbntcblx0Y29uc3QgemhSZWdFeHBOZXcgPSBjbGFzcyB6aFJlZ0V4cCBleHRlbmRzIHRhcmdldFxuXHR7XG5cdFx0Y29uc3RydWN0b3IoLi4uYXJnczogW2FueSwgLi4uYW55W11dKVxuXHRcdHtcblx0XHRcdGxldCB7IHN0ciwgZmxhZ3MsIG9wdGlvbnMsIGFyZ3YgfSA9IGdldFNldHRpbmdPcHRpb25zKC4uLmFyZ3MpO1xuXG5cdFx0XHRvcHRpb25zID0gbWVyZ2VPcHRpb25zKHt9LCB6aFJlZ0V4cE5ld1tTeW1EZWZhdWx0c10sIG9wdGlvbnMpO1xuXG5cdFx0XHRzdXBlcihzdHIsIGZsYWdzLCBvcHRpb25zLCAuLi5hcmd2KVxuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gemhSZWdFeHBOZXdcbn1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZml4T3B0aW9uczxUIGV4dGVuZHMgSU5vZGVJbnB1dCA9IElOb2RlSW5wdXQ+KG9wdGlvbnM/OiBJT3B0aW9uc0lucHV0PFQ+LCByZW1vdmVFbXB0eU9uPzogYm9vbGVhbik6IElPcHRpb25zUnVudGltZTxUPlxue1xuXHRpZiAob3B0aW9ucy5vbilcblx0e1xuXHRcdGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMub24pKVxuXHRcdHtcblx0XHRcdGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUob3B0aW9ucy5vbik7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRvcHRpb25zLm9uID0gW29wdGlvbnMub25dO1xuXHRcdH1cblxuXHRcdG9wdGlvbnMub24gPSBvcHRpb25zLm9uLmZpbHRlcih2ID0+IHYpO1xuXG5cdFx0aWYgKHJlbW92ZUVtcHR5T24gJiYgIW9wdGlvbnMub24ubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBvcHRpb25zLm9uO1xuXHRcdH1cblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIG9wdGlvbnNcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVyZ2VPcHRpb25zXG4iXX0=