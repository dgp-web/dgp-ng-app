import { getWeibullQuantile } from "./get-weibull-quantile.function";

export function toWeibullQuantile(payload?: {
    readonly scale?: number;
    readonly shape?: number;
}) {
    return (p: number) => getWeibullQuantile({p, scale: payload?.scale, shape: payload?.shape});
}
