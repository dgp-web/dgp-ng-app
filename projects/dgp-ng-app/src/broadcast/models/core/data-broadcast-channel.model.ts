import { BroadcastParticipant } from "./broadcast-participant.model";

export interface DataBroadcastChannel extends BroadcastParticipant {
    readonly dataId?: any;
}
