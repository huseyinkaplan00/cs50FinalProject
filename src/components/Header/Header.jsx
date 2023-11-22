import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
const Header = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <div className="header">
      <h1 className="header__title">Your Dictionary</h1>
      <div className="header__inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            id="filled-multiline-flexible"
            label="Write Your Word"
            multiline
            maxRows={4}
            variant="filled"
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
