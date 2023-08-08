import { canKeepLeadingZero } from "./can-keep-leading-zero.function";

export function roundDecimalPlaces(decimalPlaces: string, config = {
    sequenceLength: 2
}): string {

    const sequenceLength = config.sequenceLength;
    let result = "";

    let count = 0;

    for (const decimalPlace of decimalPlaces) {

        if (result === "" || canKeepLeadingZero({decimalPlace, result})) {
            result += decimalPlace;
            continue;
        }

        if (decimalPlace !== result[result.length - 1]) {
            result += decimalPlace;
            count = 1;
            continue;
        }

        if (count !== sequenceLength) {
            result += decimalPlace;
            count++;
            continue;
        }

        // take start item of sequence from string, and round it // 333 to 33 and 666 to 67
        let lastItemButOne = +result[result.length - sequenceLength];
        result = result.split("")
            .filter((x, i1) => i1 < result.length - sequenceLength)
            .join("");
        if (+decimalPlace >= 5) lastItemButOne++;
        result += lastItemButOne.toString();
        break;
    }

    return result;
}
