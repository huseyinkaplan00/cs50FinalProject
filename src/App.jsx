import React from "react";
import axios, { all } from "axios";
import Container from "@mui/material/Container";
import Defines from "./components/Header/Defines/Defines";
import Header from "./components/Header/Header";
import "./scss/style.scss";
function App() {
  const [meanings, setMeanings] = React.useState([]);
  const [allCategories, setAllCategories] = React.useState("en");
  const [words, setWords] = React.useState("");
  const apiCalling = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${allCategories}/${words}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    apiCalling();
  }, [words, allCategories]);

  return (
    <div className="app">
      <Container maxWidth="sm">
        <Header
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          words={words}
          setWords={setWords}
        />
        <Defines
          meanings={meanings}
          words={words}
          allCategories={allCategories}
        />
      </Container>
    </div>
  );
}
export default App;
