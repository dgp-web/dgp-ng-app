import { createGuid } from "./create-guid.function";
import { BroadcastParticipant } from "../models";

export function createBroadcastParticipant(canBeLeader: boolean): BroadcastParticipant {
    return {
        participantId: createGuid(),
        participantCreationDate: new Date(),
        canBeLeader
    };
}
