import React, { FC } from "react";
import classes from "./{{pascalCase}}.module.scss";
import { {{pascalCase}}Props } from "./{{pascalCase}}.types";
import cx from "classnames";

export const {{pascalCase}}: FC<{{pascalCase}}Props> = ({ className }) => {
  return (
    <div className={cx(className, classes.wrapper)}>Component created!</div>
  );
};