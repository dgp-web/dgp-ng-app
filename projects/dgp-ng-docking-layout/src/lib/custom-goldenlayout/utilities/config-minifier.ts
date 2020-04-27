import { LayoutManagerUtilities } from "./layout-manager.utilities";

/**
 * Minifies and unminifies configs by replacing frequent keys
 * and values with one letter substitutes. Config options must
 * retain array position/index, add new options at the end.
 */
export class ConfigMinifier {

    private layoutManagerUtilities = new LayoutManagerUtilities();

    private keys = [
        "settings",
        "hasHeaders",
        "constrainDragToContainer",
        "selectionEnabled",
        "dimensions",
        "borderWidth",
        "minItemHeight",
        "minItemWidth",
        "headerHeight",
        "dragProxyWidth",
        "dragProxyHeight",
        "labels",
        "close",
        "maximise",
        "minimise",
        "popout",
        "content",
        "componentName",
        "componentState",
        "id",
        "width",
        "type",
        "height",
        "isClosable",
        "title",
        "popoutWholeStack",
        "openPopouts",
        "parentId",
        "activeItemIndex",
        "reorderEnabled",
        "borderGrabWidth",


        // Maximum 36 entries, do not cross this line!
    ];

    private values = [
        true,
        false,
        "row",
        "column",
        "stack",
        "component",
        "close",
        "maximise",
        "minimise",
        "open in new window"
    ];

    constructor() {
        if (this.keys.length > 36) {
            throw new Error("Too many keys in config minifier map");
        }
    }

    /**
     * Takes a GoldenLayout configuration object and
     * replaces its keys and values recursively with
     * one letter counterparts
     */
    minifyConfig(config) {
        const min = {};
        this._nextLevel(config, min, "_min");
        return min;
    }

    /**
     * Takes a configuration Object that was previously minified
     * using minifyConfig and returns its original version
     */
    unminifyConfig(minifiedConfig) {
        const orig = {};
        this._nextLevel(minifiedConfig, orig, "_max");
        return orig;
    }

    /**
     * Recursive function, called for every level of the config structure
     */
    _nextLevel(from, to, translationFn) {
        // tslint:disable-next-line:one-variable-per-declaration
        let key, minKey;

        // tslint:disable-next-line:forin
        for (key in from) {

            /**
             * For in returns array indices as keys, so let's cast them to numbers
             */
            if (from instanceof Array) key = parseInt(key, 10);

            /**
             * In case something has extended Object prototypes
             */
            if (!from.hasOwnProperty(key)) continue;

            /**
             * Translate the key to a one letter substitute
             */
            minKey = this[translationFn](key, this.keys);

            /**
             * For Arrays and Objects, create a new Array/Object
             * on the minified object and recurse into it
             */
            if (typeof from[key] === "object") {
                to[minKey] = from[key] instanceof Array ? [] : {};
                this._nextLevel(from[key], to[minKey], translationFn);

                /**
                 * For primitive values (Strings, Numbers, Boolean etc.)
                 * minify the value
                 */
            } else {
                to[minKey] = this[translationFn](from[key], this.values);
            }
        }
    }

    /**
     * Minifies value based on a dictionary
     */
    _min(value, dictionary) {
        /**
         * If a value actually is a single character, prefix it
         * with ___ to avoid mistaking it for a minification code
         */
        if (typeof value === "string" && value.length === 1) {
            return "___" + value;
        }

        const index = this.layoutManagerUtilities.indexOf(value, dictionary);

        /**
         * value not found in the dictionary, return it unmodified
         */
        if (index === -1) {
            return value;

            /**
             * value found in dictionary, return its base36 counterpart
             */
        } else {
            return index.toString(36);
        }
    }

    _max(value, dictionary) {
        /**
         * value is a single character. Assume that it's a translation
         * and return the original value from the dictionary
         */
        if (typeof value === "string" && value.length === 1) {
            return dictionary[parseInt(value, 36)];
        }

        /**
         * value originally was a single character and was prefixed with ___
         * to avoid mistaking it for a translation. Remove the prefix
         * and return the original character
         */
        if (typeof value === "string" && value.substr(0, 3) === "___") {
            return value[3];
        }
        /**
         * value was not minified
         */
        return value;
    }

}
