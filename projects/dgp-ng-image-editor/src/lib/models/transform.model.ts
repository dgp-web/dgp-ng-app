import { Rotate } from "./rotate.model";
import { Offset } from "./offset.model";
import { Scale } from "./scale.model";

export interface Transform extends Offset, Rotate, Scale {
}

