import { getWeibullYCoordinate } from "./get-weibull-y-coordinate.function";

export function toWeibullYCoordinate() {
    return (p: number) => getWeibullYCoordinate({p});
}
