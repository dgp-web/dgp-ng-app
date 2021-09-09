import { getHashCode } from "dgp-ng-app";

export function moveModelInList<TModel>(payload: {
    readonly itemToMove: TModel;
    readonly itemAtTargetPosition: TModel;
    readonly allItems: ReadonlyArray<TModel>;
}): Array<TModel> {

    const itemToMove = payload.itemToMove;
    const itemAtTargetPosition = payload.itemAtTargetPosition;
    const allItems = payload.allItems;

    if (itemAtTargetPosition === itemToMove) return;

    const referenceRecordIndex = allItems.indexOf(itemAtTargetPosition);
    const draggedEntry = allItems.find(x => getHashCode(x) === getHashCode(itemToMove));
    const oldDraggedRecordIndex = allItems.indexOf(draggedEntry);

    const isMovingDown = oldDraggedRecordIndex < referenceRecordIndex;

    const updatedModel = new Array<TModel>();

    allItems.forEach(record => {

        if (getHashCode(record) === getHashCode(itemToMove)) return;

        if (!isMovingDown && getHashCode(record) === getHashCode(itemAtTargetPosition)) updatedModel.push(itemToMove);
        updatedModel.push(record);
        if (isMovingDown && getHashCode(record) === getHashCode(itemAtTargetPosition)) updatedModel.push(itemToMove);
    });

    return updatedModel;
}
