import { TypedAction } from "redoodle";
import { IRouteOption } from "../../utils/typings";
import { IVerifyDialogProps } from "../../typings/store";

export const SET_ROUTE = TypedAction.define("interface/set-route")<
  IRouteOption
>();

export const OPEN_VERIFY_DIALOG = TypedAction.define(
  "interface/open-verify-dialog"
)<IVerifyDialogProps>();

export const CLOSE_VERIFY_DIALOG = TypedAction.defineWithoutPayload(
  "interface/close-verify-dialog"
)();
