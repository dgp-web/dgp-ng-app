import { ContentAreaDimensionsItem } from "./content-area-dimensions-item.model";

export interface ContentAreaDimensions {
    readonly body: ContentAreaDimensionsItem;
    readonly left: ContentAreaDimensionsItem;
    readonly right: ContentAreaDimensionsItem;
    readonly top: ContentAreaDimensionsItem;
    readonly bottom: ContentAreaDimensionsItem;
    readonly header: ContentAreaDimensionsItem;
}
