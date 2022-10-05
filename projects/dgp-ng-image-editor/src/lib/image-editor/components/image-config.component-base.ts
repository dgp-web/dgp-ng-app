import { Directive, Input } from "@angular/core";
import { AngleType, ImageConfig, ImageRegion } from "../../models";
import { Many } from "data-modeling";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class ImageConfigComponentBase implements ImageConfig {

    @Input()
    stretch: boolean;

    @Input()
    offsetX: number;

    @Input()
    offsetY: number;

    @Input()
    rotationAngle: number;

    @Input()
    rotationAngleType: AngleType;

    @Input()
    scaleX: number;

    @Input()
    scaleY: number;

    @Input()
    regions: Many<ImageRegion>;

    @Input()
    disabled: boolean;

}
