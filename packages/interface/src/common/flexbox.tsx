import * as React from "react";
import "./flexbox.scss";
import {
  FlexDirectionProperty,
  FlexProperty,
  AlignItemsProperty,
  JustifyContentProperty,
  FlexWrapProperty
} from "csstype";
import classNames from "classnames";

interface IProps {
  alignItems?: AlignItemsProperty;
  className?: string;
  flexDirection?: FlexDirectionProperty;
  flex?: FlexProperty<string>;
  flexWrap?: FlexWrapProperty;
  justifyContent?: JustifyContentProperty;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export class Flexbox extends React.PureComponent<IProps> {
  public render() {
    const { children, className, onClick } = this.props;
    return (
      <div
        className={classNames("flexbox", className)}
        onClick={onClick}
        style={{ ...this.props }}
      >
        {children}
      </div>
    );
  }
}
