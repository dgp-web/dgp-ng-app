import { createGuid } from "./create-guid.function";
import { BroadcastParticipant } from "../models";

export function createBroadcastParticipant(): BroadcastParticipant {
    return {
        participantId: createGuid(),
        participantCreationDate: new Date()
    };
}
