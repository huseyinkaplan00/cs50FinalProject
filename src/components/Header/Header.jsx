import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import languagesList from "../Data/languages";

const Header = ({ allCategories, setAllCategories, words, setWords }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeCategory = (chosenLanguage) => {
    setAllCategories(chosenLanguage);
    setWords("");
  };
  return (
    <div className="header">
      <h1 className="header__title"> {words ? words : "Your Dictionary"} </h1>
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
              value={allCategories}
              label="Languages"
              onChange={(event) => handleChangeCategory(event.target.value)}
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
            value={words}
            variant="filled"
            onChange={(event) => setWords(event.target.value)}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
