import { formatPower } from "./format-power.function";
import { getLowerLogTickNotationBoundary } from "./get-lower-log-tick-notation-boundary.function";

export function formatLogTick(value: number, base: number = 10): string {

    const upperLimit = Math.pow(base, 3);
    const lowerLimit = getLowerLogTickNotationBoundary(base);

    if (value > upperLimit || value < lowerLimit) {
        let power = Math.log(value) / Math.log(base);
        power = Math.round(power);
        return base + formatPower(power);
    } else {
        return value.toString();
    }

}
