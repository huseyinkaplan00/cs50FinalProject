import React from "react";
import axios from "axios";
import Container from "@mui/material/Container";

import Header from "./components/Header/Header";
import "./scss/style.scss";
function App() {
  const [meanings, setMeanings] = React.useState([]);
  const [words, setWords] = React.useState("");
  const apiCalling = async () => {
    try {
      const data = await axios.get(
        "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("meanings", meanings);

  React.useEffect(() => {
    apiCalling();
  }, []);

  return (
    <div className="app">
      <Container maxWidth="sm">
        <Header />
      </Container>
    </div>
  );
}
export default App;
