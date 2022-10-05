import { Transform } from "./transform.model";

export interface ImageConfig extends Transform {
    readonly stretch?: boolean;
}
