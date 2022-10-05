import { ModelMetadata } from "data-modeling";
import { ImageConfig } from "../models";

export const imageConfigMetadata: ModelMetadata<ImageConfig> = {
    attributes: {
        stretch: {
            label: "Stretch image",
            icon: "open_in_full"
        },
        offsetX: {
            label: "Offset X",
            type: "number",
            icon: "arrow_downward"
        },
        offsetY: {
            label: "Offset Y",
            type: "number",
            icon: "arrow_forward"
        },
        scaleX: {
            label: "Scale X",
            type: "number",
            icon: "space_bar"
        },
        scaleY: {
            label: "Scale Y",
            type: "number",
            icon: "height"
        },
        rotationAngle: {
            label: "Rotation angle",
            icon: "rotate_right",
            type: "number"
        }
    }
};
