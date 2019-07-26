"use strict";
/**
 * Created by user on 2019/6/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const array_hyper_unique_1 = require("array-hyper-unique");
function customizer(objValue, srcValue) {
    if (lodash_1.isArray(objValue)) {
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
        base = lodash_1.mergeWith(...(arr.map(o => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyZ2VPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSCxtQ0FBNEM7QUFFNUMsMkRBQTREO0FBSTVELFNBQWdCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUTtJQUU1QyxJQUFJLGdCQUFPLENBQUMsUUFBUSxDQUFDLEVBQ3JCO1FBQ0MsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0YsQ0FBQztBQU5ELGdDQU1DO0FBVUQsU0FBZ0IsaUJBQWlCLENBQWdELEdBQU0sRUFBRSxRQUFnQyxJQUFJLEVBQUUsVUFBa0MsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUUzSyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUM5QztRQUNDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQWEsQ0FBQztRQUMvQyxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBVyxDQUFDO0tBQzFDO0lBRUQsSUFBSSxPQUFPLE9BQU8sSUFBSSxRQUFRLEVBQzlCO1FBQ0MsT0FBTyxHQUFHO1lBQ1QsSUFBSSxFQUFFLE9BQU87U0FDRCxDQUFDO0tBQ2Q7SUFFRCxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQ3BDO1FBQ0MsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDdEI7SUFFRCxPQUFPO1FBQ04sR0FBRztRQUNILEtBQUssRUFBRSxLQUFlO1FBQ3RCLE9BQU87UUFDUCxJQUFJO0tBQ0osQ0FBQTtBQUNGLENBQUM7QUExQkQsOENBMEJDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixhQUFhLENBQW9DLE9BQXlCLEVBQXNCLEVBQy9HLEdBQUcsSUFBd0I7SUFHM0IsSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRXRDLElBQUksT0FBTyxHQUFHLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDakM7UUFDQyxHQUFHLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDN0IsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO0tBQ2pCO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBYkQsc0NBYUM7QUFFRCxTQUFnQixZQUFZLENBQW9DLE9BQXlCLEVBQXNCLEVBQzlHLEdBQUcsSUFBd0I7SUFHM0IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDWixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDZjtJQUVELElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ2xCO1FBQ0MsSUFBSSxHQUFHLGtCQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFFaEMsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsYUFBYTtRQUNkLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDakI7SUFFRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBbkJELG9DQW1CQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILFNBQWdCLFVBQVUsQ0FBb0MsT0FBMEIsRUFBRSxhQUF1QjtJQUVoSCxJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQ2Q7UUFDQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUM3QjtZQUNDLDJDQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuQzthQUVEO1lBQ0MsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU8sQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2QyxJQUFJLGFBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUN2QztZQUNDLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNsQjtLQUNEO0lBRUQsSUFBSSxhQUFhLElBQUksT0FBTyxDQUFDLE1BQU0sRUFDbkM7UUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQzFCO1lBQ0MsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQ3RCO0tBQ0Q7SUFFRCxhQUFhO0lBQ2IsT0FBTyxPQUFPLENBQUE7QUFDZixDQUFDO0FBL0JELGdDQStCQztBQUVELGtCQUFlLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNi8xNS5cbiAqL1xuXG5pbXBvcnQgeyBtZXJnZVdpdGgsIGlzQXJyYXkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgSU9wdGlvbnMsIElPcHRpb25zSW5wdXQsIElPcHRpb25zUnVudGltZSwgSVJlZ0V4cFVzZXJJbnB1dCwgU3ltRGVmYXVsdHMgfSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgYXJyYXlfdW5pcXVlX292ZXJ3cml0ZSB9IGZyb20gJ2FycmF5LWh5cGVyLXVuaXF1ZSc7XG5pbXBvcnQgeyBJTm9kZUlucHV0IH0gZnJvbSAncmVnZXhwLXBhcnNlci1ldmVudCc7XG5pbXBvcnQgemhSZWdFeHAgZnJvbSAnLi4vaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUpXG57XG5cdGlmIChpc0FycmF5KG9ialZhbHVlKSlcblx0e1xuXHRcdHJldHVybiBvYmpWYWx1ZS5jb25jYXQoc3JjVmFsdWUpO1xuXHR9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldFNldHRpbmdPcHRpb25zPFMgZXh0ZW5kcyBJUmVnRXhwVXNlcklucHV0ID0gSVJlZ0V4cFVzZXJJbnB1dD5cbntcblx0c3RyOiBTO1xuXHRmbGFnczogc3RyaW5nO1xuXHRvcHRpb25zOiBJT3B0aW9uc0lucHV0O1xuXHRhcmd2OiBhbnlbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNldHRpbmdPcHRpb25zPFMgZXh0ZW5kcyBJUmVnRXhwVXNlcklucHV0ID0gSVJlZ0V4cFVzZXJJbnB1dD4oc3RyOiBTLCBmbGFnczogSU9wdGlvbnNJbnB1dCB8IHN0cmluZyA9IG51bGwsIG9wdGlvbnM6IElPcHRpb25zSW5wdXQgfCBzdHJpbmcgPSB7fSwgLi4uYXJndik6IElHZXRTZXR0aW5nT3B0aW9uczxTPlxue1xuXHRpZiAoZmxhZ3MgIT09IG51bGwgJiYgdHlwZW9mIGZsYWdzID09ICdvYmplY3QnKVxuXHR7XG5cdFx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGZsYWdzKSBhcyBJT3B0aW9ucztcblx0XHRmbGFncyA9IChvcHRpb25zLmZsYWdzIHx8IG51bGwpIGFzIHN0cmluZztcblx0fVxuXG5cdGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnc3RyaW5nJylcblx0e1xuXHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRza2lwOiBvcHRpb25zLFxuXHRcdH0gYXMgSU9wdGlvbnM7XG5cdH1cblxuXHRpZiAodHlwZW9mIG9wdGlvbnMuZmxhZ3MgPT0gJ3N0cmluZycpXG5cdHtcblx0XHRmbGFncyA9IG9wdGlvbnMuZmxhZ3M7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHN0cixcblx0XHRmbGFnczogZmxhZ3MgYXMgc3RyaW5nLFxuXHRcdG9wdGlvbnMsXG5cdFx0YXJndixcblx0fVxufVxuXG4vKipcbiAqIGZvciBgemhSZWdFeHAudXNlYCBvbmx5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9wdGlvbnMyPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4oYmFzZTogSU9wdGlvbnNJbnB1dDxUPiA9IHt9IGFzIElPcHRpb25zSW5wdXQ8VD4sXG5cdC4uLm9wdHM6IElPcHRpb25zSW5wdXQ8VD5bXVxuKTogSU9wdGlvbnNSdW50aW1lPFQ+XG57XG5cdGxldCByZXQgPSBtZXJnZU9wdGlvbnMoYmFzZSwgLi4ub3B0cyk7XG5cblx0aWYgKHR5cGVvZiByZXQuZmxhZ3MgPT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0cmV0LmRlZmF1bHRGbGFncyA9IHJldC5mbGFncztcblx0XHRkZWxldGUgcmV0LmZsYWdzO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT3B0aW9uczxUIGV4dGVuZHMgSU5vZGVJbnB1dCA9IElOb2RlSW5wdXQ+KGJhc2U6IElPcHRpb25zSW5wdXQ8VD4gPSB7fSBhcyBJT3B0aW9uc0lucHV0PFQ+LFxuXHQuLi5vcHRzOiBJT3B0aW9uc0lucHV0PFQ+W11cbik6IElPcHRpb25zUnVudGltZTxUPlxue1xuXHRsZXQgYXJyID0gW2Jhc2UgfHwge31dXG5cdFx0LmNvbmNhdChvcHRzKVxuXHRcdC5maWx0ZXIobyA9PiBvKVxuXHQ7XG5cblx0aWYgKGFyci5sZW5ndGggPiAxKVxuXHR7XG5cdFx0YmFzZSA9IG1lcmdlV2l0aCguLi4oYXJyLm1hcChvID0+XG5cdFx0e1xuXHRcdFx0cmV0dXJuIGZpeE9wdGlvbnMobyk7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0fSkpLCBjdXN0b21pemVyKTtcblx0fVxuXG5cdHJldHVybiBmaXhPcHRpb25zKGJhc2UpO1xufVxuXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIE1lcmdlRGVmYXVsdE9wdGlvbnModGFyZ2V0OiB0eXBlb2YgemhSZWdFeHApOiB0eXBlb2YgemhSZWdFeHBcbntcblx0Y29uc3QgemhSZWdFeHBOZXcgPSBjbGFzcyB6aFJlZ0V4cCBleHRlbmRzIHRhcmdldFxuXHR7XG5cdFx0Y29uc3RydWN0b3IoLi4uYXJnczogW2FueSwgLi4uYW55W11dKVxuXHRcdHtcblx0XHRcdGxldCB7IHN0ciwgZmxhZ3MsIG9wdGlvbnMsIGFyZ3YgfSA9IGdldFNldHRpbmdPcHRpb25zKC4uLmFyZ3MpO1xuXG5cdFx0XHRvcHRpb25zID0gbWVyZ2VPcHRpb25zKHt9LCB6aFJlZ0V4cE5ld1tTeW1EZWZhdWx0c10sIG9wdGlvbnMpO1xuXG5cdFx0XHRzdXBlcihzdHIsIGZsYWdzLCBvcHRpb25zLCAuLi5hcmd2KVxuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gemhSZWdFeHBOZXdcbn1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZml4T3B0aW9uczxUIGV4dGVuZHMgSU5vZGVJbnB1dCA9IElOb2RlSW5wdXQ+KG9wdGlvbnM/OiBJT3B0aW9uc0lucHV0PFQ+LCByZW1vdmVFbXB0eU9uPzogYm9vbGVhbik6IElPcHRpb25zUnVudGltZTxUPlxue1xuXHRpZiAob3B0aW9ucy5vbilcblx0e1xuXHRcdGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMub24pKVxuXHRcdHtcblx0XHRcdGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUob3B0aW9ucy5vbik7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRvcHRpb25zLm9uID0gW29wdGlvbnMub25dO1xuXHRcdH1cblxuXHRcdG9wdGlvbnMub24gPSBvcHRpb25zLm9uLmZpbHRlcih2ID0+IHYpO1xuXG5cdFx0aWYgKHJlbW92ZUVtcHR5T24gJiYgIW9wdGlvbnMub24ubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBvcHRpb25zLm9uO1xuXHRcdH1cblx0fVxuXG5cdGlmIChyZW1vdmVFbXB0eU9uICYmIG9wdGlvbnMub25Db3JlKVxuXHR7XG5cdFx0aWYgKCFvcHRpb25zLm9uQ29yZS5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0ZGVsZXRlIG9wdGlvbnMub25Db3JlO1xuXHRcdH1cblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIG9wdGlvbnNcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVyZ2VPcHRpb25zXG4iXX0=