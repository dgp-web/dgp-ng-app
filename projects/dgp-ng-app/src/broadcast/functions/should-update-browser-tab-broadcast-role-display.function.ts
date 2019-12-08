import {isNullOrUndefined} from "util";
import {BroadcastRole} from "../models";

export interface ShouldUpdateBrowserTabBroadcastRoleDisplayPayload {
    readonly currentBrowserTabTitle: Readonly<string>;
    readonly currentBroadcastRole: BroadcastRole;
}

export interface ShouldUpdateBrowserTabBroadcastRoleDisplayResult {
    shouldUpdateRoleDisplay: boolean;
    updatedBrowserTabTitle?: Readonly<string>;
}

export interface ShouldUpdateBrowserTabBroadcastRoleDisplayConfig {
    readonly leaderBrowserTabTitleSuffix: string;
    readonly peonBrowserTabTitleSuffix: string;
}

export const defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig: ShouldUpdateBrowserTabBroadcastRoleDisplayConfig = {
  leaderBrowserTabTitleSuffix: ": Leader",
    peonBrowserTabTitleSuffix: ": Peon"
};

export function shouldUpdateBrowserTabBroadcastRoleDisplay(
    payload: ShouldUpdateBrowserTabBroadcastRoleDisplayPayload,
    config = defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig
): ShouldUpdateBrowserTabBroadcastRoleDisplayResult {

    let updatedTabTitle: string;
    let broadcastRoleLabel: string;

    const result: ShouldUpdateBrowserTabBroadcastRoleDisplayResult = {
        shouldUpdateRoleDisplay: null,
        updatedBrowserTabTitle: null
    };

    switch (payload.currentBroadcastRole) {
        case BroadcastRole.None:
            break;
        case BroadcastRole.Leader:
            broadcastRoleLabel = config.leaderBrowserTabTitleSuffix;
            break;
        case BroadcastRole.Peon:
            broadcastRoleLabel = config.peonBrowserTabTitleSuffix;
            break;
    }

    if (!isNullOrUndefined(broadcastRoleLabel)) {
        updatedTabTitle = payload.currentBrowserTabTitle;

        if (updatedTabTitle.endsWith(config.leaderBrowserTabTitleSuffix)) {
            updatedTabTitle = updatedTabTitle.replace(config.leaderBrowserTabTitleSuffix, "");
        } else if (updatedTabTitle.endsWith(config.peonBrowserTabTitleSuffix)) {
            updatedTabTitle = updatedTabTitle.replace(config.peonBrowserTabTitleSuffix, "");
        }

        updatedTabTitle += broadcastRoleLabel;

    } else {
        updatedTabTitle = payload.currentBrowserTabTitle;

        if (updatedTabTitle.endsWith(config.leaderBrowserTabTitleSuffix)) {
            updatedTabTitle = updatedTabTitle.replace(config.leaderBrowserTabTitleSuffix, "");
        } else if (updatedTabTitle.endsWith(config.peonBrowserTabTitleSuffix)) {
            updatedTabTitle = updatedTabTitle.replace(config.peonBrowserTabTitleSuffix, "");
        }

    }

    if (updatedTabTitle !== payload.currentBrowserTabTitle) { result.updatedBrowserTabTitle = updatedTabTitle; }
    result.shouldUpdateRoleDisplay = !isNullOrUndefined(result.updatedBrowserTabTitle);

    return result;

}
