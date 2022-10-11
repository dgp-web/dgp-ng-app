import { Box } from "./box.model";
import { BoxGroup } from "./box-group.model";

export interface OutlierHoverEvent {
    readonly outlierIndex: number;
    readonly box: Box;
    readonly boxGroup: BoxGroup;
    readonly absoluteDomXPx: number;
    readonly absoluteDomYPx: number;
}
