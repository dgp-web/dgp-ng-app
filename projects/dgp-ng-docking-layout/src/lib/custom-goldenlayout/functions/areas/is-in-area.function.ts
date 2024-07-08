import { AreaSides } from "../../models/area.model";
import { Point } from "dgp-ng-app";

export function isInArea(payload: { area: AreaSides; point: Point }): boolean {
    const area = payload.area;
    const point = payload.point;

    return area.x1 < point.x
        && area.x2 > point.x
        && area.y1 < point.y
        && area.y2 > point.y;
}
