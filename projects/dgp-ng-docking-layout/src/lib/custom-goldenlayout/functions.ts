import { AbstractContentItemComponent } from "./components/abstract-content-item";
import { ItemContainerComponent } from "./components/item-container";
import { StackComponent } from "./components/stack";

export function addChildContentItemsToContainer(container: ItemContainerComponent, node: AbstractContentItemComponent) {
    if (node.type === "stack") {
        node.contentItems.forEach(function(item) {
            container.addChild(item);
            node.removeChild(item, true);
        });
    } else {
        node.contentItems.forEach(x => this.addChildContentItemsToContainer(container, x));
    }
}

export function findAllStackContainers(rootNode: AbstractContentItemComponent) {
    const stackContainers = [];
    findAllStackContainersRecursive(stackContainers, rootNode);

    return stackContainers;
}

export function findAllStackContainersRecursive(stackContainers: Array<StackComponent>, node: AbstractContentItemComponent) {
    node.contentItems.forEach(x => {
        if (x.type === "stack") {
            stackContainers.push(x as StackComponent);
        } else if (!x.isComponent) {
            this.findAllStackContainersRecursive(stackContainers, x);
        }
    });
}
