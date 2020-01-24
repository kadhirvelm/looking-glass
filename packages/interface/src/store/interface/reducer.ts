import { TypedReducer, setWith } from "redoodle";
import { IRouteOption, IUrlOptions } from "../../utils/typings";
import { SET_ROUTE, CLOSE_VERIFY_DIALOG, OPEN_VERIFY_DIALOG } from "./actions";
import { IVerifyDialogProps } from "../../typings/store";

export interface IInterfaceState {
  route: IRouteOption;
  verifyDialogProps: IVerifyDialogProps | undefined;
}

export const EMPTY_INTERFACE_STATE: IInterfaceState = {
  route: { url: IUrlOptions.HOME },
  verifyDialogProps: undefined
};

export const interfaceReducer = TypedReducer.builder<IInterfaceState>()
  .withHandler(SET_ROUTE.TYPE, (state, route) => setWith(state, { route }))
  .withHandler(CLOSE_VERIFY_DIALOG.TYPE, state =>
    setWith(state, { verifyDialogProps: undefined })
  )
  .withHandler(OPEN_VERIFY_DIALOG.TYPE, (state, verifyDialogProps) =>
    setWith(state, { verifyDialogProps })
  )
  .build();
