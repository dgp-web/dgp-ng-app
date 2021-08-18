import {map} from "rxjs/operators";
import {negate} from "./negate.function";

export function negateMap<TModel>() {
    return map<TModel, boolean>(negate);
}
