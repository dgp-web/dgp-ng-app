import { Many } from "data-modeling";
import { ConnectedScatterGroup } from "../models";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";
import { Shape } from "../../shapes/models";

export function resolveConnectedScatterGroups(payload: Many<ConnectedScatterGroup>): Many<ConnectedScatterGroup> {
    if (isNullOrUndefined(payload)) return null;

    return payload.map(group => {
        return {
            ...group,
            series: group.series.map(series => {
                return {
                    ...series,
                    shape: notNullOrUndefined(series.shape)
                        ? series.shape
                        : notNullOrUndefined(group.shape)
                            ? group.shape
                            : Shape.Circle,
                    showVertices: notNullOrUndefined(series.showVertices)
                        ? series.showVertices
                        : notNullOrUndefined(group.showVertices)
                            ? group.showVertices
                            : true,
                    showEdges: notNullOrUndefined(series.showEdges)
                        ? series.showEdges
                        : notNullOrUndefined(group.showEdges)
                            ? group.showEdges
                            : true,
                    colorHex: notNullOrUndefined(series.colorHex)
                        ? series.colorHex
                        : notNullOrUndefined(group.colorHex)
                            ? group.colorHex
                            : null,
                };
            })
        };
    });
}
