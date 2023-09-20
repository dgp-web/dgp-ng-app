import { InjectionToken, Provider } from "@angular/core";

export type TriggerEvent = "click";

export interface ActionShortcutConfig {
    readonly requireAlt: boolean;
    readonly requireCtrl: boolean;
    readonly requireShift: boolean;
    readonly triggerEvent?: TriggerEvent;
}

export const defaultActionShortcutConfig: ActionShortcutConfig = {
    requireAlt: true,
    requireCtrl: true,
    requireShift: false,
    triggerEvent: "click"
};

export interface ShortcutConfig {
    readonly action: ActionShortcutConfig;
}

export const defaultShortcutConfig: ShortcutConfig = {
    action: defaultActionShortcutConfig
};

export const SHORTCUT_CONFIG = new InjectionToken<ShortcutConfig>("dgpShortcutConfig");

export function provideShortcutConfig(payload: ShortcutConfig = defaultShortcutConfig): Provider {
    return {
        provide: SHORTCUT_CONFIG,
        useValue: payload
    };
}
