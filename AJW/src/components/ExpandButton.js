import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    color: "grey"
  },
  iconHover: {
    margin: theme.spacing(1),
    "&:hover": {
      color: green[800]
    }
  }
}));

const ExpandButton = ({ onClick, showDetail }) => {
  const classes = useStyles();

  return (
    <Icon
      className={`${classes.iconHover} ${classes.icon}`}
      // color="primary"
      onClick={onClick}
    >
      {showDetail ? "remove_circle" : "add_circle}"}
    </Icon>
  );
};

export default ExpandButton;
