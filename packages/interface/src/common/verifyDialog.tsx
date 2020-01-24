import * as React from "react";
import { Dialog, Button, Classes } from "@blueprintjs/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IStoreState, CLOSE_VERIFY_DIALOG } from "../store";
import { IVerifyDialogProps } from "../typings/store";

interface IStateProps {
  verifyDialogProps: IVerifyDialogProps | undefined;
}

interface IDispatchProps {
  closeVerifyDialog: () => void;
}

type IProps = IStateProps & IDispatchProps;

class UnconnectedVerifyDialog extends React.PureComponent<IProps> {
  public render() {
    const { closeVerifyDialog, verifyDialogProps } = this.props;

    return (
      <Dialog
        canOutsideClickClose={false}
        icon={verifyDialogProps?.icon}
        isOpen={verifyDialogProps !== undefined}
        onClose={closeVerifyDialog}
        title={verifyDialogProps?.title}
      >
        <div className={Classes.DIALOG_BODY}>
          {verifyDialogProps?.description}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              onClick={closeVerifyDialog}
              text={verifyDialogProps?.cancelText || "Cancel"}
            />
            <Button
              intent={verifyDialogProps?.confirmButtonIntent}
              onClick={this.onConfirm}
              text={verifyDialogProps?.confirmText || "Yes"}
            />
          </div>
        </div>
      </Dialog>
    );
  }

  private onConfirm = () => {
    const { verifyDialogProps } = this.props;
    verifyDialogProps?.onConfirm();
    CLOSE_VERIFY_DIALOG();
  };
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    verifyDialogProps: state.interface.verifyDialogProps
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    closeVerifyDialog: () => dispatch(CLOSE_VERIFY_DIALOG.create())
  };
}

export const VerifyDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedVerifyDialog);
