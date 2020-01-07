import { isNullOrUndefined } from "util";
import { BroadcastChannelLike } from "../models/broadcast-channel-like.model";

export class BroadcastChannelLocalStorageFallbackService implements BroadcastChannelLike {

    constructor(private readonly channelId: string) {
    }

    addEventListener(type, listener, options?: boolean | AddEventListenerOptions): void {
        window.addEventListener("storage", (ev: StorageEvent) => {
            if (ev.key !== this.channelId) { return; }
            if (isNullOrUndefined(ev.newValue)) { return; }

            const message = JSON.parse(ev.newValue);
            listener({
                data: message
            });
        });
    }

    postMessage(message: any): void {
        const messageJson = JSON.stringify(message);
        window.localStorage.setItem(this.channelId, messageJson);
    }

}
