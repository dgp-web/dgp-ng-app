import { superscript } from "../constants";

export function formatPower(power: number): string {

    const absPower = Math.abs(power);
    let result = (absPower + "")
        .split("")
        .map(x => superscript[x])
        .join("");
    if (power < 0) result = "⁻" + result;
    return result;

}
