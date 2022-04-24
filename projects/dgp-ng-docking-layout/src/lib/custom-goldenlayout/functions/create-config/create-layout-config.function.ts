import { LayoutConfiguration } from "../../types";
import * as _ from "lodash";
import { defaultLayoutConfig } from "../../models";
import { mutatify } from "data-modeling";
import { createItemConfig } from "./create-item-config.function";

export function createLayoutConfig(payload: LayoutConfiguration): LayoutConfiguration {

    const config = _.merge({}, defaultLayoutConfig, payload);

    createItemConfig(config);

    if (config.settings.hasHeaders === false) {
        mutatify(config.dimensions).headerHeight = 0;
    }

    return config;
}
