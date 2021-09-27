import { createGuid } from "dgp-ng-app";

export function createIdPrefix(): () => string {
    return createGuid;
}
