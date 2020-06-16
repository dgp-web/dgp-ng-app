export class LayoutManagerUtilities {

    F() {
    }

    /**
     * This is based on Paul Irish's shim, but looks quite odd in comparison. Why?
     * Because
     * a) it shouldn't affect the global requestAnimationFrame function
     * b) it shouldn't pass on the time that has passed
     */
    animFrame(fn) {
        return (window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            // tslint:disable-next-line:only-arrow-functions
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
                // tslint:disable-next-line:only-arrow-functions
            })(function () {
            fn();
        });
    }

    indexOf(needle, haystack) {
        if (!(haystack instanceof Array)) {
            throw new Error("Haystack is not an Array");
        }

        if (haystack.indexOf) {
            return haystack.indexOf(needle);
        } else {
            for (let i = 0; i < haystack.length; i++) {
                if (haystack[i] === needle) {
                    return i;
                }
            }
            return -1;
        }
    }

    isFunction(x) {
        return typeof x === "function";
    }

}
