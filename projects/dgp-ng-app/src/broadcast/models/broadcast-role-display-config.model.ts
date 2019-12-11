export interface BroadcastRoleDisplayConfig {
    readonly leaderBrowserTabTitleSuffix: string;
    readonly peonBrowserTabTitleSuffix: string;
}

export const defaultBroadcastRoleDisplayConfig: BroadcastRoleDisplayConfig = {
    leaderBrowserTabTitleSuffix: ": Leader",
    peonBrowserTabTitleSuffix: ": Peon"
};
