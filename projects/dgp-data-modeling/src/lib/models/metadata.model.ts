import { AttributeMetadata } from "./attribute-metadata.model";

export type Metadata<T> = {
    readonly [K in keyof T]?: AttributeMetadata<T[K]>;
};
