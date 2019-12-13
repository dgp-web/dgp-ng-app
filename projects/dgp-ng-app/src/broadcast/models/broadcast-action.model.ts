import { Action } from "@ngrx/store";
import { DataBroadcastChannel } from "./broadcast-channel.model";

export interface BroadcastAction extends DataBroadcastChannel, Action {

}
