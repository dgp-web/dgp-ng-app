import { ModelMetadata } from "data-modeling";
import { notNullOrUndefined } from "./null-checking.functions";

export function getDefaultValue<TModel extends object>(payload: ModelMetadata<TModel, any>): TModel {
    const result = {};

    Object.keys(payload.attributes).forEach(attributeKey => {
        if (notNullOrUndefined(payload.attributes[attributeKey].defaultValue)) {
            result[attributeKey] = payload.attributes[attributeKey].defaultValue;
        }
    });

    return result as TModel;
}
