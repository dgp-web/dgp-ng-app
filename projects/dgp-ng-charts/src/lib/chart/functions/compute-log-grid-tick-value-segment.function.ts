import { Many } from "data-modeling";

export function computeLogGridTickValueSegment(value: number, base: number): Many<number> {

    const result = [];

    for (let i = 1; i < base; i++) result.push(i * value);

    return result;

}
