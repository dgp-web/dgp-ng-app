import { Many } from "data-modeling";
import { RootComponent } from "../../components/root.component";

export function getAllContentItems(payload: RootComponent): Many<any> {
    const allContentItems = new Array<any>();

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
