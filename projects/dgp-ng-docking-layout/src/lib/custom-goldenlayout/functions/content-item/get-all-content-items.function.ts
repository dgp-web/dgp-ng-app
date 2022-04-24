import { AbstractContentItemComponent } from "../../components/abstract-content-item.component";
import { Many } from "data-modeling";

export function getAllContentItems(payload: AbstractContentItemComponent): Many<AbstractContentItemComponent> {
    const allContentItems = new Array<AbstractContentItemComponent>();

    const addChildren = function (contentItem) {
        allContentItems.push(contentItem);

        if (contentItem.contentItems instanceof Array) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < contentItem.contentItems.length; i++) {
                addChildren(contentItem.contentItems[i]);
            }
        }
    };

    addChildren(payload);

    return allContentItems;
}
