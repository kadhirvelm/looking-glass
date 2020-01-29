import { TypedAction } from "redoodle";
import { IVerifyDialogProps } from "../../typings/store";
import { IRouteOption } from "../../utils/typings";

export const SET_ROUTE = TypedAction.define("interface/set-route")<
  IRouteOption
>();

export const OPEN_MERGE_DIALOG = TypedAction.defineWithoutPayload(
  "interface/open-merge-dialog"
)();

export const CLOSE_MERGE_DIALOG = TypedAction.defineWithoutPayload(
  "interface/close-merge-dialog"
)();

export const OPEN_VERIFY_DIALOG = TypedAction.define(
  "interface/open-verify-dialog"
)<IVerifyDialogProps>();

export const CLOSE_VERIFY_DIALOG = TypedAction.defineWithoutPayload(
  "interface/close-verify-dialog"
)();
