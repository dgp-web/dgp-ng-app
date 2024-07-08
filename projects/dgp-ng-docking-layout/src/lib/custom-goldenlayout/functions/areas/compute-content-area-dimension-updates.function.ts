import { Area } from "../../models/area.model";
import { ContentAreaDimensions } from "../../models/content-area-dimensions.model";
import { Mutable } from "data-modeling";

export function computeContentAreaDimensionUpdates(payload: {
    readonly contentArea: Area;
    readonly contentWidth: number;
    readonly contentHeight: number;
}): Partial<ContentAreaDimensions> {

    const contentArea = payload.contentArea;
    const contentWidth = payload.contentWidth;
    const contentHeight = payload.contentHeight;

    const result: Mutable<Partial<ContentAreaDimensions>> = {};

    result.left = {
        hoverArea: {
            ...contentArea,
            x2: contentArea.x1 + contentWidth * 0.25
        },
        highlightArea: {
            ...contentArea,
            x2: contentArea.x1 + contentWidth * 0.5
        }
    };

    result.top = {
        hoverArea: {
            ...contentArea,
            x1: contentArea.x1 + contentWidth * 0.25,
            x2: contentArea.x1 + contentWidth * 0.75,
            y2: contentArea.y1 + contentHeight * 0.5
        },
        highlightArea: {
            ...contentArea,
            y2: contentArea.y1 + contentHeight * 0.5
        }
    };

    result.right = {
        hoverArea: {
            ...contentArea,
            x1: contentArea.x1 + contentWidth * 0.75
        },
        highlightArea: {
            ...contentArea,
            x1: contentArea.x1 + contentWidth * 0.5
        }
    };

    result.bottom = {
        hoverArea: {
            ...contentArea,
            x1: contentArea.x1 + contentWidth * 0.25,
            y1: contentArea.y1 + contentHeight * 0.5,
            x2: contentArea.x1 + contentWidth * 0.75
        },
        highlightArea: {
            ...contentArea,
            y1: contentArea.y1 + contentHeight * 0.5
        }
    };

    return result as Partial<ContentAreaDimensions>;
}
