import {Action} from "@ngrx/store";

export interface PrefixActionPayload {
    readonly prefix: string;
    readonly action: Readonly<Action>;
}

export function prefixAction<T extends Action>(payload: PrefixActionPayload): T {

    return Object.assign({}, payload.action, {
        type: payload.prefix + payload.action.type
    }) as T;

}
