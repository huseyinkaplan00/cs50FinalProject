import React from "react";
import axios from "axios";
import Marquee from "react-marquee-slider";
import times from "lodash/times";
import styled from "styled-components";

export default function Home({ words }) {
  const [randomWords, setRandomWords] = React.useState([]);
  const apiCall = async () => {
    try {
      const data = await axios.get(
        `https://random-word-api.herokuapp.com/word?number=10`
      );
      setRandomWords(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(randomWords);

  React.useEffect(() => {
    apiCall();
  }, []);

  const Container = styled.div`
    width: 100%;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: row;
  `;
  const WordBox = styled.div`
    display: grid;
    place-items: center;
    width: 130px;
    height: 70px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: black;
    h3 {
      font-size: 12px;
    }
  `;
  return (
    <Container>
      <Marquee>
        {randomWords.map((word, index) => (
          <WordBox key={index}>
            <h3>{word}</h3>
          </WordBox>
        ))}
      </Marquee>
    </Container>
  );
}
