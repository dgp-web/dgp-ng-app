export interface AttributeMetadata<T = number, TScale = number> {
    readonly label?: string;
    readonly defaultValue?: T;
    readonly min?: TScale;
    readonly max?: TScale;
    readonly step?: TScale;
}
