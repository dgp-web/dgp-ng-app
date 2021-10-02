import { superscript } from "../constants";

export function formatPower(power: number): string {

    return (power + "").split("")
        .map(x => superscript[x])
        .join("");
}
