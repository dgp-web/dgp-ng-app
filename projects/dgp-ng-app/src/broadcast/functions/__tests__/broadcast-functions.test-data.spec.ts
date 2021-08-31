
import {createGuid} from "../create-guid.function";
import {createBroadcastParticipant} from "../create-broadcast-participant.function";
import {createBroadcastHeartbeat} from "../create-broadcast-heartbeat.function";
import { BroadcastHeartbeat, BroadcastParticipant } from "../../models";

export interface DataVersion {
    readonly dataId: string;
    readonly dataVersionNo: number;
}

export class BroadcastFunctionsTestData {

    static readonly participant01: BroadcastParticipant = createBroadcastParticipant(true);
    static readonly participant02: BroadcastParticipant = createBroadcastParticipant(true);
    static readonly participant03: BroadcastParticipant = createBroadcastParticipant(true);

    static readonly dataId01: DataVersion = {
        dataId: createGuid(),
        dataVersionNo: 1
    };
    static readonly dataId02: DataVersion = {
        dataId: createGuid(),
        dataVersionNo: 1
    };

    static readonly heartbeat01: BroadcastHeartbeat = createBroadcastHeartbeat({
        participant: BroadcastFunctionsTestData.participant01,
        dataId: BroadcastFunctionsTestData.dataId01
    });
    static readonly heartbeat02: BroadcastHeartbeat = createBroadcastHeartbeat({
        participant: BroadcastFunctionsTestData.participant02,
        dataId: BroadcastFunctionsTestData.dataId01
    });
    static readonly heartbeat03: BroadcastHeartbeat = createBroadcastHeartbeat({
        participant: BroadcastFunctionsTestData.participant02,
        dataId: BroadcastFunctionsTestData
    });
    static readonly heartbeat04: BroadcastHeartbeat = createBroadcastHeartbeat({
        participant: BroadcastFunctionsTestData.participant03,
        dataId: BroadcastFunctionsTestData.dataId02
    });

    static readonly heartbeats: BroadcastHeartbeat[] = [
        BroadcastFunctionsTestData.heartbeat01,
        BroadcastFunctionsTestData.heartbeat02,
        BroadcastFunctionsTestData.heartbeat03,
        BroadcastFunctionsTestData.heartbeat04
    ];

}
