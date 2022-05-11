import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function TextBar(props) {
  const [query, setQuery] = useState("");
  const IconProp = props.IconProp

  const sendRequest = (e) => {
    e.preventDefault();
    if (query) {
      props.onSubmit(query);
      setQuery('')
    } else {
      return;
    }
  };

  return (
    <Paper
      component="form"
      elevation={props.elevation}
      id="paper"
      onSubmit={(e) => sendRequest(e)}
      sx={props.sx}
    >
      <InputBase
        id="searchField"
        placeholder={props.placeholder}
        inputProps={{ "aria-label": "search posts" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          width: 0.85,
          pl : 2
        }}
      />
      <IconButton type="submit" aria-label="search" sx={{width:0.1, mr : 1}}>
        <IconProp />
      </IconButton>
    </Paper>
  );
}
