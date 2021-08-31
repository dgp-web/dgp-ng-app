import { EntityTypeMap } from "entity-store";
import { BroadcastRoleDisplayConfig } from "./broadcast-role-display-config.model";
import { SendInitialStateSignature } from "../initial-state-rules/send-initial-state-signature.model";
import { BroadCastInitialStateRules } from "../initial-state-rules/broadcast-initial-state-rules.model";

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

    readonly sendInitialState?: SendInitialStateSignature<TEntityTypeMap, TStoreFeature> | BroadCastInitialStateRules<TEntityTypeMap, TStoreFeature>;

    readonly syncSelection?: boolean;

    /**
     * Indicates whether this window can be a leader
     * or is intended to support the main application.
     *
     * This can be used for scenarios where there is
     * a main application and sub-apps that have no process
     * control of their own.
     */
    readonly canBeLeader: boolean;
}
