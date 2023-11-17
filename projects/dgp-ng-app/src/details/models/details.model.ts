import { ExpansionTogglePosition } from "./expansion-toggle-position.model";

export interface Details {
    readonly summary: string;
    readonly expanded: boolean;
    readonly expandable: boolean;
    readonly togglePosition: ExpansionTogglePosition;
}
