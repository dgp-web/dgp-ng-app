import { actionBroadcastChannelId, heartbeatBroadcastChannelId } from "./broadcast-channel.model";
import { InjectionToken } from "@angular/core";
import { BroadcastRoleDisplayConfig, defaultBroadcastRoleDisplayConfig } from "./broadcast-role-display-config.model";
import { ComposedEntityActions, EntityStateMap, EntityTypeMap } from "entity-store";

export type SendInitialStateSignature<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> = (
    state: EntityStateMap<TEntityTypeMap>
) => ComposedEntityActions<TEntityTypeMap, TStoreFeature>;

export interface BroadcastConfig<TEntityTypeMap extends EntityTypeMap = { [key: string]: any; }, TStoreFeature = string> {
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

    readonly sendInitialState?: SendInitialStateSignature<TEntityTypeMap, TStoreFeature>;
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
