import { formatPower } from "./format-power.function";

export function formatLogTick(value: number, base: number = 10): string {

    const upperLimit = Math.pow(base, 3);
    const lowerLimit = Math.pow(base, -3);

    if (value > upperLimit || value < lowerLimit) {
        let power = Math.log(value) / Math.log(base);
        power = Math.round(power);
        return base + formatPower(power);
    } else {
        return value.toString();
    }

}
