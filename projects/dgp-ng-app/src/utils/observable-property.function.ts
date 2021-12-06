import { observeProperty } from "./observe-property.function";

export function ObservableProperty<T>(
    propertyKey: keyof T
    // tslint:disable-next-line:ban-types
): Function {

    return (decoratedClass: T, foo, bar) => {
        return observeProperty(decoratedClass, propertyKey);
    };

}
