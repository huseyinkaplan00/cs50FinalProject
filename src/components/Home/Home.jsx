import Marquee from 'react-marquee-slider';
import styled, { StyleSheetManager } from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';
//styled components:
const Container = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const WordBox = styled.div`
  border-radius: 5px;
  display: grid;
  place-items: center;
  width: 330px;
  margin: 0 10px;
  height: 370px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  color: black;
  h3 {
    font-size: 2em;
  }
`;
export default function Home({ wordMeanings, setWordMeanings }) {
  const filteredWordMeanings = wordMeanings.filter(
    wordMeaning => wordMeaning.meaning !== 'Definition not available' && wordMeaning.image
  );

  const getWordImage = async () => {
    if (filteredWordMeanings && filteredWordMeanings.length > 0) {
      try {
        const responses = await Promise.all(
          filteredWordMeanings.map(async wordMeaning => {
            const response = await axios.get(
              `https://pixabay.com/api/?key=41114972-550a8ff6a7b32dec7a2800aae&q=${encodeURIComponent(
                wordMeaning.word
              )}&image_type=photo`
            );
            const imageUrls = response.data.hits[0] ? response.data.hits[0].largeImageURL : null;
            return { ...wordMeaning, image: imageUrls };
          })
        );
        setWordMeanings(responses);
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    if (filteredWordMeanings && filteredWordMeanings.length > 0) {
      getWordImage();
    }
  }, [filteredWordMeanings]);

  console.log(filteredWordMeanings);

  return (
    <StyleSheetManager>
      <Container $paused={true}>
        <Marquee>
          {filteredWordMeanings.map(({ word, meaning }, index) => (
            <WordBox key={index} $paused={true}>
              <h3>{word}</h3>
              <p>{meaning}</p>
            </WordBox>
          ))}
        </Marquee>
      </Container>
    </StyleSheetManager>
  );
}

// // declaring prop types for type checking.
Home.propTypes = {
  wordMeanings: PropTypes.array.isRequired
};
