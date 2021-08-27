import { Action } from "@ngrx/store";
import { ComposedEntityActions, EntityStateMap, EntityTypeMap } from "entity-store";
import { InjectionToken } from "@angular/core";

export interface BroadcastParticipant {
    /**
     * Unique identifier of the window or tab that sends this
     * request
     */
    readonly participantId: string;
    readonly participantCreationDate: Date;
    readonly canBeLeader: boolean;
}

export interface DataBroadcastChannel extends BroadcastParticipant {
    readonly dataId?: any;
}

export const heartbeatBroadcastChannelId = "HeartbeatBroadcastChannel";
export const actionBroadcastChannelId = "ActionBroadcastChannel";

export interface BroadcastAction extends DataBroadcastChannel, Action {

}

export interface BroadcastChannelLike {
    postMessage(message: any): void;

    addEventListener(type, listener, options?: boolean | AddEventListenerOptions): void;
}

export interface MessageEventLike {
    readonly data: any;
}

/**
 * @deprecated use BroadcastInitialEntityStoreContentRule instead
 */
export type SendInitialStateSignature<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> = (
    state: EntityStateMap<TEntityTypeMap>
) => ComposedEntityActions<TEntityTypeMap, TStoreFeature>;

export type BroadcastInitialStateActionRule<TAppState> = (state: TAppState) => Action;
export type BroadcastInitialEntityStoreContentRule<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> = SendInitialStateSignature<TEntityTypeMap, TStoreFeature>;

export type BroadcastInitialStateRule<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> =
    BroadcastInitialStateActionRule<TEntityTypeMap>
    | BroadcastInitialEntityStoreContentRule<TEntityTypeMap, TStoreFeature>;

export type BroadCastInitialStateRules<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> = ReadonlyArray<BroadcastInitialStateRule<TEntityTypeMap, TStoreFeature>>;

export interface BroadcastRoleDisplayConfig {
    readonly leaderBrowserTabTitleSuffix: string;
    readonly peonBrowserTabTitleSuffix: string;
}

export const defaultBroadcastRoleDisplayConfig: BroadcastRoleDisplayConfig = {
    leaderBrowserTabTitleSuffix: ": Leader",
    peonBrowserTabTitleSuffix: ": Peon"
};

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

export const defaultBroadcastConfig: BroadcastConfig = {
    heartbeartBroadcastInterval: 1000,
    incomingHeartbeatBufferInterval: 10000,
    heartbeatBroadcastChannelId,
    actionBroadcastChannelId,
    actionTypesToPrefixWithPeon: [],
    updateBrowserTabTitleConfig: defaultBroadcastRoleDisplayConfig,
    canBeLeader: true
};
export const BROADCAST_CONFIG = new InjectionToken<Readonly<BroadcastConfig>>(
    "DEFAULT_BROADCAST_CONFIG"
);

export interface BroadcastHeartbeat extends DataBroadcastChannel {
}

export enum BroadcastRole {
    None,
    Leader,
    Peon
}
