import { ComponentConfiguration, StackConfiguration } from "../types";

export function wrapInStack(payload: ComponentConfiguration): StackConfiguration {
    return {
        type: "stack",
        width: payload.width,
        height: payload.height,
        content: [payload]
    };
}
