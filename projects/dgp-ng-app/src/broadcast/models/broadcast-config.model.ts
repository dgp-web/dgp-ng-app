import { actionBroadcastChannelId, heartbeatBroadcastChannelId } from "./broadcast-channel.model";
import { InjectionToken } from "@angular/core";
import { BroadcastRoleDisplayConfig, defaultBroadcastRoleDisplayConfig } from "./broadcast-role-display-config.model";
import { CompositeEntityAction, EntityStateMap, EntityTypeMap } from "entity-store";

export type SendInitialStateSignature = <TEntityTypeMap extends EntityTypeMap>(
    state: EntityStateMap<TEntityTypeMap>
) => CompositeEntityAction<TEntityTypeMap>;

export interface BroadcastConfig {
    /**
     * The interval at which this participant sends
     * heartbeats
     *
     * default: 1000 ms
     */
    readonly heartbeartBroadcastInterval: number;
    /**
     * The interval at which this participant buffers
     * incoming heartbeats before checking the current
     * roles
     *
     * default: 3000 ms
     */
    readonly incomingHeartbeatBufferInterval: number;
    /**
     * Id of the channel the broadcasts this participant's heartbeats
     */
    readonly heartbeatBroadcastChannelId: string;
    /**
     * Id of the channel the broadcasts this participant's actions
     */
    readonly actionBroadcastChannelId: string;

    /**
     * Action types to prefix
     */
    readonly actionTypesToPrefixWithPeon: ReadonlyArray<string>;

    /**
     * Indicates whether and how browser-tab titles are used
     * to indicate status
     */
    readonly updateBrowserTabTitleConfig?: BroadcastRoleDisplayConfig;

    readonly sendInitialState?: SendInitialStateSignature;
}

export const defaultBroadcastConfig: BroadcastConfig = {
    heartbeartBroadcastInterval: 1000,
    incomingHeartbeatBufferInterval: 3000,
    heartbeatBroadcastChannelId,
    actionBroadcastChannelId,
    actionTypesToPrefixWithPeon: [],
    updateBrowserTabTitleConfig: defaultBroadcastRoleDisplayConfig
};

export const BROADCAST_CONFIG = new InjectionToken<Readonly<BroadcastConfig>>(
    "DEFAULT_BROADCAST_CONFIG"
);
