export interface BroadcastChannelLike {
    postMessage(message: any): void;

    addEventListener(type, listener, options?: boolean | AddEventListenerOptions): void;
}
