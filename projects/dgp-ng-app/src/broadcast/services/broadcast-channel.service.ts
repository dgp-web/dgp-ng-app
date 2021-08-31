import { fromEventPattern, Observable } from "rxjs";
import { ClassProvider, Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BroadcastChannelLocalStorageFallbackService } from "./broadcast-channel-local-storage-fallback.service";
import { getBroadcastHeartbeatFromMessageEvent } from "../functions/get-broadcast-heartbeat-from-message-event.function";
import {
    BroadcastAction,
    BroadcastChannelLike,
    BroadcastConfig,
    BroadcastHeartbeat,
    MessageEventLike
} from "../models";
import { BROADCAST_CONFIG } from "../constants/broadcast-config-injection-token.constant";

export abstract class BroadcastChannelService {

    abstract postHeartbeat(heartbeat: BroadcastHeartbeat): void;

    abstract postAction(action: BroadcastAction): void;

    abstract getHeartbeat$(): Observable<BroadcastHeartbeat>;

    abstract getAction$(): Observable<BroadcastAction>;

}

@Injectable()
export class BroadcastChannelServiceImpl extends BroadcastChannelService {

    private readonly heartbeatBroadcastChannel: BroadcastChannelLike;
    private readonly actionBroadcastChannel: BroadcastChannelLike;

    constructor(
        @Inject(BROADCAST_CONFIG)
        private readonly config: BroadcastConfig
    ) {
        super();

        if ("BroadcastChannel" in self) {

            this.heartbeatBroadcastChannel = new BroadcastChannel(
                this.config.heartbeatBroadcastChannelId
            );
            this.actionBroadcastChannel = new BroadcastChannel(
                this.config.actionBroadcastChannelId
            );

        } else {
            this.heartbeatBroadcastChannel = new BroadcastChannelLocalStorageFallbackService(
                this.config.heartbeatBroadcastChannelId
            );
            this.actionBroadcastChannel = new BroadcastChannelLocalStorageFallbackService(
                this.config.actionBroadcastChannelId
            );
        }
    }

    private addBroadcastListenerForHeartbeat = (handler) => {
        this.heartbeatBroadcastChannel.addEventListener("message", handler);
    }

    private addBroadcastListenerForAction = (handler) => {
        this.actionBroadcastChannel.addEventListener("message", handler);
    }


    getAction$(): Observable<BroadcastAction> {
        return fromEventPattern(
            this.addBroadcastListenerForAction
        ).pipe(
            map((messageEvent: MessageEventLike) => messageEvent.data as BroadcastAction)
        );
    }

    getHeartbeat$(): Observable<BroadcastHeartbeat> {
        return fromEventPattern(
            this.addBroadcastListenerForHeartbeat
        ).pipe(
            map(x => getBroadcastHeartbeatFromMessageEvent(x as any, this.config.canBeLeader))
        );
    }

    postAction(action: BroadcastAction): void {
        this.actionBroadcastChannel.postMessage(action);
    }

    postHeartbeat(heartbeat: BroadcastHeartbeat): void {
        this.heartbeatBroadcastChannel.postMessage(heartbeat);
    }

}

export const broadcastChannelServiceProvider: ClassProvider = {
    provide: BroadcastChannelService,
    useClass: BroadcastChannelServiceImpl
};
