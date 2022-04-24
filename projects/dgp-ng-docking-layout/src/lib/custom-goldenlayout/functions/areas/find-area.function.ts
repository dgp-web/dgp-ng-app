import { Many } from "data-modeling";
import { Area } from "../../models/area.model";

export function findArea(x: number, y: number, itemAreas: Many<Area>): Area {
    let i: number;
    let area: Area;
    let smallestSurface = Infinity;
    let mathingArea: Area = null;

    for (i = 0; i < itemAreas.length; i++) {
        area = itemAreas[i];

        if (
            x > area.x1 &&
            x < area.x2 &&
            y > area.y1 &&
            y < area.y2 &&
            smallestSurface > area.surface
        ) {
            smallestSurface = area.surface;
            mathingArea = area;
        }
    }

    return mathingArea;
}
