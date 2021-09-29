import { formatPower } from "./format-power.function";

export function formatLogTick(value: number): string {

    if (value > Math.pow(10, 3)) {
        let power = Math.log(value) / Math.LN10;
        power = Math.round(power);
        return 10 + formatPower(power);
    } else {
        return value.toString();
    }

}
