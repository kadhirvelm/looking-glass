import { Toaster, IToaster, IToastProps } from "@blueprintjs/core";

const LookingGlassToaster: IToaster = Toaster.create();

export function showToast(options: IToastProps) {
  LookingGlassToaster?.show(options);
}
