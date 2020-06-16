export interface Vector2 {
    x: number;
    y: number;
}

export class Vector2Utils {

    static subtract(minuend: Vector2, subtrahend: Vector2): Vector2 {
        return {
            x: minuend.x - subtrahend.x,
            y: minuend.y - subtrahend.y
        };
    }

    static isWithinRectangle(value: Vector2, min: Vector2, max: Vector2): boolean {
        return  value.x > min.x && value.x < max.x && value.y > min.y && value.y < max.y;
    }

}