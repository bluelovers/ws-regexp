interface IPropertyData {
    readonly $LONE: Set<string>;
    readonly General_Category: Set<string>;
    readonly Script: Set<string>;
    readonly gc: IPropertyData["General_Category"];
    readonly sc: IPropertyData["Script"];
    readonly Script_Extensions: IPropertyData["Script"];
    readonly scx: IPropertyData["Script"];
}
export declare const PropertyData: IPropertyData;
export default PropertyData;
