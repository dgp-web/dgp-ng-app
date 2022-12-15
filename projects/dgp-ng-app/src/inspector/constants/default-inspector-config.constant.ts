import { InjectionToken } from "@angular/core";
import { InspectorConfig } from "../models/inspector-config.model";

export const DEFAULT_INSPECTOR_CONFIG = new InjectionToken<InspectorConfig>("defaultInspectorConfig");
