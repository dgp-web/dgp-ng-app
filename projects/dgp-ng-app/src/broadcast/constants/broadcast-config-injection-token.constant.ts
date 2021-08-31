import { InjectionToken } from "@angular/core";
import { BroadcastConfig } from "../models/config/broadcast-config.model";

export const BROADCAST_CONFIG = new InjectionToken<Readonly<BroadcastConfig>>(
    "DEFAULT_BROADCAST_CONFIG"
);
