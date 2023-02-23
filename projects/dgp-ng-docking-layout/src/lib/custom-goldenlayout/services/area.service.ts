import { Area } from "../models/area.model";
import { RootComponent } from "../components/root.component";
import { getAllContentItems } from "../functions/content-item/get-all-content-items.function";
import { createRootItemAreas } from "../functions/areas/create-content-root-item-areas.function";
import { findArea } from "../functions/areas/find-area.function";
import { Injectable } from "@angular/core";
import { StackComponent } from "../components/stack.component";

@Injectable({
    providedIn: "root"
})
export class AreaService {

    private itemAreas: Array<Area>;

    calculateItemAreas(root: RootComponent): void {
        let i: number;
        let area: Area;
        const allContentItems = getAllContentItems(root);
        this.itemAreas = [];

        /**
         * If the last item is dragged out, highlight the entire container size to
         * allow to re-drop it. allContentItems[ 0 ] === this.root at this point
         *
         * Don't include root into the possible drop areas though otherwise since it
         * will used for every gap in the layout, e.g. splitters
         */
        if (allContentItems.length === 1) {
            this.itemAreas.push(root.getArea());
            return;
        }
        this.itemAreas = createRootItemAreas(root);

        for (i = 0; i < allContentItems.length; i++) {

            if (!(allContentItems[i].isStack)) continue;

            area = allContentItems[i].getArea();

            if (area === null) {
            } else if (area instanceof Array) {
                this.itemAreas = this.itemAreas.concat(area);
            } else {
                this.itemAreas.push(area);
                const header: any = {};
                Object.assign(header, area);
                Object.assign(header, (area.contentItem as StackComponent).contentAreaDimensions.header.highlightArea);
                header.surface = (header.x2 - header.x1) * (header.y2 - header.y1);
                this.itemAreas.push(header);
            }
        }
    }

    getArea(x: number, y: number): Area {
        return findArea(x, y, this.itemAreas);
    }

}
