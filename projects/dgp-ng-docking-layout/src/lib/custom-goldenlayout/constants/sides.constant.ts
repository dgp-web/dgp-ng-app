import { Many } from "data-modeling";
import { Side } from "../models/side.model";

export const sides: Many<Side> = [
    Side.Right,
    Side.Left,
    Side.Bottom
];
