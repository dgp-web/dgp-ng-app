import { ComponentConfiguration, StackConfiguration } from "../types";
import { createGuid } from "dgp-ng-app";

export function wrapInStack(payload: ComponentConfiguration): StackConfiguration {
    return {
        id: createGuid(),
        type: "stack",
        width: payload.width,
        height: payload.height,
        content: [payload]
    };
}
