import {
  createStore,
  loggingMiddleware,
  reduceCompoundActions,
  StoreEnhancer
} from "redoodle";
import { applyMiddleware, Store } from "redux";
import { IStoreState, EMPTY_STATE } from "./state";
import { reducer } from "./reducer";
import { loadInterfaceKeyFromLocalStorage } from "../utils/localStorage";

export function configureStore(): Store<IStoreState> {
  const logging = applyMiddleware(loggingMiddleware()) as StoreEnhancer;
  const initialState: IStoreState = {
    ...EMPTY_STATE,
    interface: {
      ...EMPTY_STATE.interface,
      ...loadInterfaceKeyFromLocalStorage()
    }
  };

  return createStore(reduceCompoundActions(reducer), initialState, logging);
}
