import { TypedReducer, setWith } from "redoodle";
import { IRouteOption, IUrlOptions } from "../../utils/typings";
import {
  SET_ROUTE,
  CLOSE_VERIFY_DIALOG,
  OPEN_VERIFY_DIALOG,
  OPEN_MERGE_DIALOG,
  CLOSE_MERGE_DIALOG
} from "./actions";
import { IVerifyDialogProps } from "../../typings/store";
import { DIALOGS } from "../../typings/constants";

export interface IInterfacePersistedState {
  route: IRouteOption;
}

export interface IInterfaceMemoryState {
  openDialog: DIALOGS | undefined;
  verifyDialogProps: IVerifyDialogProps | undefined;
}

export const EMPTY_PERSISTED_STATE: IInterfacePersistedState = {
  route: { url: IUrlOptions.HOME }
};

export const EMPTY_LOCAL_INTERFACE_STATE: IInterfaceMemoryState = {
  openDialog: undefined,
  verifyDialogProps: undefined
};

export interface IInterfaceState
  extends IInterfacePersistedState,
    IInterfaceMemoryState {}

export const EMPTY_INTERFACE_STATE: IInterfaceState = {
  ...EMPTY_PERSISTED_STATE,
  ...EMPTY_LOCAL_INTERFACE_STATE
};

export const interfaceReducer = TypedReducer.builder<IInterfaceState>()
  .withHandler(SET_ROUTE.TYPE, (state, route) => setWith(state, { route }))
  .withHandler(OPEN_MERGE_DIALOG.TYPE, state =>
    setWith(state, { openDialog: DIALOGS.MERGE_DIALOG })
  )
  .withHandler(CLOSE_MERGE_DIALOG.TYPE, state =>
    setWith(state, { openDialog: undefined })
  )
  .withHandler(CLOSE_VERIFY_DIALOG.TYPE, state =>
    setWith(state, { openDialog: undefined, verifyDialogProps: undefined })
  )
  .withHandler(OPEN_VERIFY_DIALOG.TYPE, (state, verifyDialogProps) =>
    setWith(state, { openDialog: DIALOGS.VERIFY_DIALOG, verifyDialogProps })
  )
  .build();
