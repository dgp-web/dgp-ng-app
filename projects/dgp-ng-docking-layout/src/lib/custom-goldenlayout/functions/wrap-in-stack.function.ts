import { ItemConfiguration, StackConfiguration } from "../types";

export function wrapInStack(payload: ItemConfiguration): StackConfiguration {
    return {
        type: "stack",
        width: payload.width,
        height: payload.height,
        content: [payload]
    };
}
