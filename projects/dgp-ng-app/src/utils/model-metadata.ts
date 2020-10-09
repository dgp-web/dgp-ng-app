import { AttributeMetadata } from "./attribute-metadata";

export type ModelMetadata<T> = {
    readonly [K in keyof T]?: AttributeMetadata<T[K]>;
};
