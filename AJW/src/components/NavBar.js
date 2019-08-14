import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    marginLeft: theme.spacing(2)
  }
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          AJW Exercise
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
