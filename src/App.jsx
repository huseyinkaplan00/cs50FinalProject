import React from "react";
import axios from "axios";
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
  console.log("words", words);

  React.useEffect(() => {
    apiCalling();
  }, []);

  return <div>Dictionary APP</div>;
}
export default App;
