import { DataBroadcastChannel } from "./data-broadcast-channel.model";
import { Action } from "@ngrx/store";

export interface BroadcastAction extends DataBroadcastChannel, Action {

}
