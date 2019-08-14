import React from "react";
import { InputBase, IconButton, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "auto",
    marginTop: 0,
    overflowX: "auto",
    border: "1px solid lightGrey",
    borderRadius: 5
  },
  input: {
    fontSize: 14,
    width: 250,
    marginLeft: 10
  }
});

const Search = ({ onChange }) => {
  const classes = useStyles();
  return (
    <Paper className={`search ${classes.root}`} elevation={0}>
      <InputBase
        placeholder="Search Sales Order or Part Number"
        onChange={onChange}
        className={classes.input}
      />
      <IconButton aria-label="search" className="icon">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
export default Search;
