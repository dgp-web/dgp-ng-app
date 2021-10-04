
/**
 * Source: http://bl.ocks.org/tanykim/62462c396b37874ebd87
 */
export function getSmartTicks(val: number) {

    // base step between nearby two ticks
    let step = Math.pow(10, val.toString().length - 1);

    // modify steps either: 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000...
    if (val / step < 2) {
        step = step / 5;
    } else if (val / step < 5) {
        step = step / 2;
    }

    // add one more step if the last tick value is the same as the max value
    // if you don't want to add, remove "+1"
    const slicesCount = Math.ceil((val + 1) / step);

    return {
        endPoint: slicesCount * step,
        count: Math.min(10, slicesCount) // show max 10 ticks
    };

}
