import { AttributeMetadata } from "./attribute-metadata.model";

export type ModelMetadata<T> = {
    readonly [K in keyof T]?: AttributeMetadata<T[K]>;
};
