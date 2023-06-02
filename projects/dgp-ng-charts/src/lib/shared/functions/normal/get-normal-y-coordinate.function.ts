import { defaultNormalParameters } from "../../constants";
import { getNormalQuantile } from "./get-normal-quantile.function";

export function getNormalYCoordinate(payload: {
    readonly p: number;
}) {
    const normalParameters = defaultNormalParameters;

    const p = payload.p;

    return getNormalQuantile({p, ...normalParameters});
}
