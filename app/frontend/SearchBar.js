import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function SearchBar(props) {
  const [query, setQuery] = useState("");

  const sendRequest = (e) => {
    e.preventDefault();
    if (query) {
      props.onSearch(query);
    } else {
      return;
    }
  };

  return (
    <Paper
      component="form"
      elevation={1}
      id="paper"
      onSubmit={(e) => sendRequest(e)}
      sx={{
        ml : 2,
        mr : 0,
        pl : 1,
        width:"100%"
      }}
    >
      <InputBase
        id="searchField"
        placeholder="Search posts..."
        inputProps={{ "aria-label": "search posts" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          width: 0.85
        }}
      />
      <IconButton type="submit" aria-label="search" sx={{width:0.1, mr : 1}}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
