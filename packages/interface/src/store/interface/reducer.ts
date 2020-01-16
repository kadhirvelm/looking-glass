import { TypedReducer, setWith } from "redoodle";
import { IRouteOption, IUrlOptions } from "../../utils/typings";
import { SET_ROUTE } from "./actions";

export interface IInterfaceState {
  route: IRouteOption;
}

export const EMPTY_INTERFACE_STATE: IInterfaceState = {
  route: { url: IUrlOptions.HOME }
};

export const interfaceReducer = TypedReducer.builder<IInterfaceState>()
  .withHandler(SET_ROUTE.TYPE, (state, route) => setWith(state, { route }))
  .build();
