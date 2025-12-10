import { Many } from "data-modeling";

export function getListItemNeighbor<T>(payload: {
    readonly collection: Many<T>;
    readonly item: T;
    readonly neighbor: "previous" | "next";
}): T {
    const collection = payload.collection;
    const item = payload.item;
    const neighbor = payload.neighbor;

    const index = collection.indexOf(item);

    let neighborIndex: number;

    switch (neighbor) {
        case "previous":
            neighborIndex = index - 1;
            break;
        case "next":
            neighborIndex = index + 1;
            break;
    }

    return collection[neighborIndex];
}
