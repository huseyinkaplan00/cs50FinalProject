import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import languagesList from "../Data/languages";
const Header = ({ allCategories, setAllCategories }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const [languages, setLanguages] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setLanguages(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="header">
      <h1 className="header__title">Your Dictionary</h1>
      <div className="header__inputs">
        <ThemeProvider theme={darkTheme}>
          <FormControl>
            <InputLabel id="demo-controlled-open-select-label">
              Languages
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={languages}
              label="Languages"
              onChange={handleChange}
            >
              {languagesList.map((language) => (
                <MenuItem value={language.label} key={language.label}>
                  {language.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{
              width: 300,
              height: 50,
            }}
            fullWidth
            id="filled-multiline-flexible"
            label="Write Your Word"
            multiline
            maxRows={4}
            variant="filled"
            onChange={(event) => setAllCategories(event.target.value)}
          />

          {console.log(allCategories)}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
