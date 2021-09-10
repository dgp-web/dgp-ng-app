import { Box } from "./box.model";
import { BoxValues } from "./box-values.model";

export interface BoxGroup<TValue = string | number> {
    readonly boxGroupId?: string;
    readonly label: string;
    readonly value?: TValue;
    readonly boxes: ReadonlyArray<Box>;
    readonly boxValues?: ReadonlyArray<BoxValues>;
}
