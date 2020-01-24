import { IconName, Intent } from "@blueprintjs/core";
import { ReactNode } from "react";

export interface IVerifyDialogProps {
  cancelText?: string;
  confirmButtonIntent?: Intent;
  confirmText?: string;
  description: string | ReactNode;
  icon?: IconName;
  onConfirm: () => void;
  title: string;
}
