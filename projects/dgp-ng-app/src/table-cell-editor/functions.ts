import { DialogPosition } from "@angular/material/dialog";
import { TriggerElementSizes } from "./models";

export function computeTriggerElementSizes(payload: {
    readonly triggerElementBoundingRect: ClientRect;
    readonly window: Window;
    readonly triggerButtonElement: HTMLElement;
}): TriggerElementSizes {

    return {
        offsetTop: (payload.triggerElementBoundingRect.top + payload.triggerButtonElement.offsetHeight),
        offsetLeft: payload.triggerElementBoundingRect.left,
        offsetRight: payload.triggerElementBoundingRect.right,
        availableSpace: {
            left: payload.triggerElementBoundingRect.left,
            right: payload.window.innerWidth - (payload.triggerElementBoundingRect.left),
            bottom: payload.window.innerHeight - (payload.triggerElementBoundingRect.top + payload.triggerButtonElement.offsetHeight),
            top: payload.triggerElementBoundingRect.top
        }
    };

}

export function getDialogPositionFromTriggerElementSizes(payload: {
    readonly triggerElementSizes: TriggerElementSizes;
    readonly triggerButtonElement: HTMLElement;
    readonly configureDialogWidth: number;
}): DialogPosition {

    let result: DialogPosition = {
        top: payload.triggerElementSizes.offsetTop + "px",
        left: payload.triggerElementSizes.offsetLeft + "px",
        bottom: null,
        right: null
    };


    if (payload.triggerElementSizes.availableSpace.right < payload.configureDialogWidth
        && payload.triggerElementSizes.availableSpace.left >= payload.configureDialogWidth) {
        result = {
            ...result,
            left: (payload.triggerElementSizes.offsetRight - payload.configureDialogWidth) + "px"
        };
    }

    if (payload.triggerElementSizes.availableSpace.bottom < 240
        && payload.triggerElementSizes.availableSpace.top >= 240) {
        result = {
            ...result,
            top: null,
            bottom: null,
            left: null,
            right: null
        };
    }

    return result;
}
