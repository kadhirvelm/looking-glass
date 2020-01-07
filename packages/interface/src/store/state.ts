import { IInterfaceState } from "./interface/reducer";
import { IApplicationState } from "./application/reducer";

export interface IStoreState {
  interface: IInterfaceState;
  application: IApplicationState;
}

export const EMPTY_STATE: IStoreState = {
  interface: {},
  application: {}
};
