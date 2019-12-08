describe("shouldBroadcastParticipantChangeRole", () => {

    xit(`should suggest a change of the passed participantId into the 'Leader' role
    if currentBroadcastRole ist not leader, if there are two or more participants on the participant's channel
    and if the participant is the oldest existing participant.`, () => {

        expect(true)
            .toBe(true);

    });

    xit(`should suggest a change of the passed participantId into the 'Peon' role
    if currentBroadcastRole ist not leader, if there are two or more participants on the participant's channel
    and if the participant is NOT the oldest existing participant.`, () => {

        expect(true)
            .toBe(true);

    });

    xit(`should suggest a change of the passed participantId into the 'None' role
    if the participant has another role but there are less than 2 participants on the channel or there is no channel
    at all.`, () => {

        expect(true)
            .toBe(true);

    });

});
