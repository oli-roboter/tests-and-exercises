import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  nav: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    marginLeft: theme.spacing(2)
  },
  link: {
    margin: 10,
    color: "white",
    textDecoration: "none"
    // fontSize: 18
  }
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      style={{ opacity: 0.7, backgroundColor: "rgb(18,147,154)" }}
    >
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Yobota Exercise
        </Typography>
        <nav className={classes.nav}>
          <Button color="inherit">
            <Link className={classes.link} to="tables">
              Tables
            </Link>
          </Button>
          <Button color="inherit">
            <Link className={classes.link} to="graphs">
              Graphs
            </Link>
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
