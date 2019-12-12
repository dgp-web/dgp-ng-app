import { createGuid } from "./create-guid.function";
import { BroadcastParticipant } from "../models/broadcast-participant.model";

export function createBroadcastParticipant(): BroadcastParticipant {
    return {
        participantId: createGuid(),
        participantCreationDate: new Date()
    };
}
