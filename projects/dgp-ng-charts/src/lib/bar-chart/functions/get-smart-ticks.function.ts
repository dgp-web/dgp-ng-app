/**
 * Source: http://bl.ocks.org/tanykim/62462c396b37874ebd87
 */
export function getSmartTicks(value: number) {

    // base step between nearby two ticks
    let step = Math.pow(10, value.toString().length - 1);

    // modify steps either: 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000...
    if (value / step < 2) {
        step = step / 5;
    } else if (value / step < 5) {
        step = step / 2;
    }


    // add one more step if the last tick value is the same as the max value
    // if you don't want to add, remove "+1"
    const slicesCount = Math.ceil((value + 1) / step);

    return {
        endPoint: slicesCount * step,
        count: Math.min(10, Math.max(5, slicesCount)) // show max 10 and min 5 ticks
    };

}
