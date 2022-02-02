import { formatPower } from "./format-power.function";

export function formatLogTick(value: number, base: number = 10): string {

    if (value > Math.pow(base, 3)) {
        let power = Math.log(value) / Math.log(base);
        power = Math.round(power);
        return base + formatPower(power);
    } else {
        return value.toString();
    }

}
