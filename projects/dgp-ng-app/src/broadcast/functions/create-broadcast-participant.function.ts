import {BroadcastParticipant} from "../models";
import {createGuid} from "./create-guid.function";

export function createBroadcastParticipant(): BroadcastParticipant {
    return {
        participantId: createGuid(),
        participantCreationDate: new Date()
    };
}
