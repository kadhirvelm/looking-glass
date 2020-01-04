import { listenSampleAction, listenPing } from "./actions";

export function instantiateListeners() {
  listenPing();
  listenSampleAction();
}
