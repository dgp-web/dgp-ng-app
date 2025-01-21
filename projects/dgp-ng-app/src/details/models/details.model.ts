import { ExpansionTogglePosition } from "./expansion-toggle-position.model";
import { Observable } from "rxjs";

export interface Details {
    readonly summary: string;
    readonly expanded: boolean;
    readonly expandedChange: Observable<boolean>;
    readonly expandable: boolean;
    readonly togglePosition: ExpansionTogglePosition;
}
