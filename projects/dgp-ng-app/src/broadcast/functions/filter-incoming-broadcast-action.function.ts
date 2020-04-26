import { isNullOrUndefined } from "util";
import * as _ from "lodash";
import { leaderActionTypePrefix, peonActionTypePrefix } from "../actions";
import { BroadcastAction, BroadcastRole } from "../models";

export interface FilterIncomingBroadcastActionPayload {
    readonly action: BroadcastAction;
    readonly dataId?: any;
    readonly ownBroadcastRole: BroadcastRole;
}

export function filterIncomingBroadcastAction(
    payload: FilterIncomingBroadcastActionPayload): boolean {

    const doDataIdsExist = !isNullOrUndefined(payload.action.dataId)
        && !isNullOrUndefined(payload.dataId);

    if (!doDataIdsExist) {
        return false;
    }

    const areDataIdsEqual = _.isEqual(payload.action.dataId, payload.dataId);

    if (!areDataIdsEqual) {
        return false;
    }

    const peonActionArrivesAtLeader = payload.action.type.startsWith(peonActionTypePrefix)
        && payload.ownBroadcastRole === BroadcastRole.Leader;

    if (peonActionArrivesAtLeader) {
        return true;
    }

    const leaderActionArrivesAtPeon = payload.action.type.startsWith(leaderActionTypePrefix)
        && payload.ownBroadcastRole === BroadcastRole.Peon;

    return leaderActionArrivesAtPeon;

}
