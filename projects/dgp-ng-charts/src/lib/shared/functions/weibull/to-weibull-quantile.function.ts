import { getWeibullQuantile } from "./get-weibull-quantile.function";
import { WeibullParameters } from "../../models";

export function toWeibullQuantile(payload?: Partial<WeibullParameters>) {
    return (p: number) => getWeibullQuantile({p, scale: payload?.scale, shape: payload?.shape});
}
