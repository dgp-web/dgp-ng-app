export class LayoutManagerUtilities {

    F() {
    }

    getHashValue(key) {
        const matches = location.hash.match(new RegExp(key + "=([^&]*)"));
        return matches ? matches[1] : null;
    }

    getQueryStringParam(param) {
        if (window.location.hash) {
            return this.getHashValue(param);
        } else if (!window.location.search) {
            return null;
        }

        const keyValuePairs = window.location.search.substr(1)
            .split("&");
        const params = {};
        let pair;
        let i;

        for (i = 0; i < keyValuePairs.length; i++) {
            pair = keyValuePairs[i].split("=");
            params[pair[0]] = pair[1];
        }

        return params[param] || null;
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
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
                // tslint:disable-next-line:only-arrow-functions
            })(function() {
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
