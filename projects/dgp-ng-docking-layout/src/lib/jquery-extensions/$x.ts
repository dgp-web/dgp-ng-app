import { Vector2 } from "../common/models";

export class $x {

    static getPointerCoordinates(event: any): Vector2 {
        event = event.originalEvent && (event.originalEvent as TouchEvent).touches ? (event.originalEvent as TouchEvent).touches[0] as any : event;
        return {
            x: event.pageX,
            y: event.pageY
        };
    }

    static size(value: any, size: Vector2): any {
        value.width(size.x);
        value.height(size.y);

        return value;
    }

    static position(value: any, position: Vector2): any {
        value.css({left: position.x, top: position.y});
        return value;
    }
}
