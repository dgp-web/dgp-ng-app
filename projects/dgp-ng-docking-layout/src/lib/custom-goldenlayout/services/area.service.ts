import { Area } from "../models/area.model";
import { RootComponent } from "../components/root.component";
import { getAllContentItems } from "../functions/content-item/get-all-content-items.function";
import { createRootItemAreas } from "../functions/areas/create-content-root-item-areas.function";
import { findArea } from "../functions/areas/find-area.function";
import { Injectable } from "@angular/core";
import { StackComponent } from "../components/tabs/stack.component";
import { notNullOrUndefined } from "dgp-ng-app";
import { Mutable } from "data-modeling";

@Injectable({
    providedIn: "root"
})
export class AreaService {

    private itemAreas: Array<Area>;

    calculateItemAreas(root: RootComponent): void {
        const allContentItems = getAllContentItems(root);
        let itemAreas: Array<Area>;

        if (allContentItems.length === 1) {
            itemAreas = [root.getArea()];
        } else {

            itemAreas = createRootItemAreas(root);

            allContentItems
                .filter(x => x.isStack)
                .map(x => x as unknown as StackComponent)
                .map(x => x.getArea())
                .filter(notNullOrUndefined)
                .forEach(area => {

                    if (area instanceof Array) {
                        itemAreas = itemAreas.concat(area);
                    } else {
                        itemAreas.push(area);
                        const header: Partial<Mutable<Area>> = {};
                        Object.assign(header, area);
                        Object.assign(header, (area.contentItem as StackComponent).contentAreaDimensions.header.highlightArea);
                        header.surface = (+header.x2 - +header.x1) * (+header.y2 - +header.y1);
                        itemAreas.push(header as Area);
                    }
                });

        }


        this.itemAreas = itemAreas;
    }

    getArea(x: number, y: number): Area {
        return findArea(x, y, this.itemAreas);
    }

}
