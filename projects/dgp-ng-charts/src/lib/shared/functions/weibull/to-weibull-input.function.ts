import { Many } from "data-modeling";
import * as _ from "lodash";

export function toWeibullInput(payload: Many<number>): Many<number> {
    return _.sortBy(payload);
}
