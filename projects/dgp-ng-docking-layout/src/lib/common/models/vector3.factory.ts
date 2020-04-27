import { Factory } from "../types";
import { Vector3 } from "./vector3";

export class Vector3Factory extends Factory<Vector3> {

    createOne(payload: Vector3): Vector3 {
        return {
            x: payload.x,
            y: payload.y,
            z: payload.z
        };
    }

}