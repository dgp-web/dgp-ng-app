export interface BroadcastParticipant {
    /**
     * Unique identifier of the window or tab that sends this
     * request
     */
    readonly participantId: string;
    readonly participantCreationDate: Date;
}
