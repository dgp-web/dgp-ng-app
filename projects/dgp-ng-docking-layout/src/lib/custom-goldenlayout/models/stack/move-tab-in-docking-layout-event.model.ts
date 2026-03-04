import type { ContentAreaDimensions } from "../content-area-dimensions.model";
import { ComponentConfiguration, StackConfiguration } from "../../types";

export interface AddTabToDockingLayoutEvent {
    readonly addedTab: ComponentConfiguration;
    readonly targetStackConfig: StackConfiguration;
    readonly targetTabDropSegment: keyof ContentAreaDimensions;
    readonly targetTabHeaderDropIndex: number;
}


export interface RemoveTabFromDockingLayoutEvent {
    readonly removedTab: ComponentConfiguration;
}

