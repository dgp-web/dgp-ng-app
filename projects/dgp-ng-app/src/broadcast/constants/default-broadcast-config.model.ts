import { BroadcastConfig } from "../models/config/broadcast-config.model";
import { heartbeatBroadcastChannelId } from "./heartbeat-broadcast-channel-id.constant";
import { actionBroadcastChannelId } from "./action-broadcast-channel-id.constant";
import { defaultBroadcastRoleDisplayConfig } from "./default-broadcast-role-display-config.constant";

export const defaultBroadcastConfig: BroadcastConfig = {
    heartbeartBroadcastInterval: 1000,
    incomingHeartbeatBufferInterval: 10000,
    heartbeatBroadcastChannelId,
    actionBroadcastChannelId,
    actionTypesToPrefixWithPeon: [],
    updateBrowserTabTitleConfig: defaultBroadcastRoleDisplayConfig,
    canBeLeader: true
};
