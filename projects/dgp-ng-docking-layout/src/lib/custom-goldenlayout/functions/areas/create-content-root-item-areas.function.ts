import { Root } from "../../components/root.component";
import { Area, AreaSides } from "../../models/area.model";
import { mutatify } from "data-modeling";

export function createRootItemAreas(payload: Root): Array<Area> {
    const areaSize = 50;
    const sides: AreaSides = {y2: 0, x2: 0, y1: "y2", x1: "x2"};
    return Object.keys(sides).map(side => {
        const area = mutatify(payload._$getArea());
        area.side = side as keyof AreaSides;
        if (sides [side]) {
            area[side] = area[sides [side]] - areaSize;
        } else {
            area[side] = areaSize;
        }
        area.surface = (area.x2 as number - (area.x1 as number)) * (area.y2 as number - (area.y1 as number));
        return area as any; // TODO: typing issue
    });
}
