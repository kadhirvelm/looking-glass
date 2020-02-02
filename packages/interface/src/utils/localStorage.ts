import { IStoreState } from "../store/state";
import {
  EMPTY_PERSISTED_STATE,
  IInterfacePersistedState,
  IInterfaceState
} from "../store/interface/reducer";

const INTERFACE_KEY = `@looking-glass/persisted-interface-redux-${process.env.npm_package_version}`;

function createPersistedInterfaceStoreString(interfaceStore: IInterfaceState) {
  const persistedKeys: Array<keyof IInterfaceState> = Object.keys(
    EMPTY_PERSISTED_STATE
  ) as Array<keyof IInterfaceState>;
  const savedState: Partial<IInterfacePersistedState> = persistedKeys
    .map(key => ({ [key]: interfaceStore[key] }))
    .reduce((previous, next) => ({ ...previous, ...next }), {});

  return JSON.stringify(savedState);
}

export function saveInterfaceKeyToLocalStorage(state: IStoreState) {
  try {
    const persistedState = createPersistedInterfaceStoreString(state.interface);
    localStorage.setItem(INTERFACE_KEY, persistedState);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      "There was an error when trying to store the persisted state to local storage",
      state,
      error
    );
  }
}

export function loadInterfaceKeyFromLocalStorage(): IInterfacePersistedState {
  try {
    const persistedState = localStorage.getItem(INTERFACE_KEY);
    return { ...EMPTY_PERSISTED_STATE, ...JSON.parse(persistedState ?? "") };
  } catch {
    return EMPTY_PERSISTED_STATE;
  }
}
