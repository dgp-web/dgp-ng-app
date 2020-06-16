import {Action} from "@ngrx/store";
import { BroadcastAction, BroadcastParticipant } from "../models";

export interface CreateBroadcastActionPayload {
    readonly participant: Readonly<BroadcastParticipant>;
    readonly dataId: any;
    readonly action: Readonly<Action>;
}

export function createBroadcastAction(
    payload: CreateBroadcastActionPayload
): BroadcastAction {

    return Object.assign({}, payload.action, {
        type: payload.action.type,
        participantId: payload.participant.participantId,
        participantCreationDate: payload.participant.participantCreationDate,
        dataId: payload.dataId,
    } as Partial<BroadcastAction>) as BroadcastAction;

}
