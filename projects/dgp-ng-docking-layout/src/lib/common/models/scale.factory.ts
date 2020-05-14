import { Factory } from "../types/factory";
import { Scale } from "./scale";

export const createScale = (payload?: Partial<Scale>): Scale => {

    let result: Scale = {
        max: null,
        min: 0,
        step: 1,
        value: null
    };

    if (payload) {
        result = Object.assign(payload);
    }

    return result;
};

export class ScaleFactory extends Factory<Scale> {

    createOne(payload?: Partial<Scale>): Scale {

        let result: Scale = {
            max: null,
            min: 0,
            step: 1,
            value: null
        };

        if (payload) {
            result = Object.assign(payload);
        }

        return result;
    }

}