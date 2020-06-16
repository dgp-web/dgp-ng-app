export interface Scale<T = number> {
    min: T;
    max: T;
    step: T;
    value: T;
}