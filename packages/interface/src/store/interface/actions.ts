import { TypedAction } from "redoodle";
import { IRouteOption } from "../../utils/typings";

export const SET_ROUTE = TypedAction.define("interface/set-route")<
  IRouteOption
>();
