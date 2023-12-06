import React from 'react';
import axios from 'axios';
import Marquee from 'react-marquee-slider';
import times from 'lodash/times';
import styled from 'styled-components';

export default function Home({ wordMeanings }) {
  const filteredWordMeanings = wordMeanings.filter(wordMeaning => wordMeaning.meaning !== 'Definition not available');

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
  return (
    <Container>
      <Marquee>
        {filteredWordMeanings.map(({ word, meaning }, index) => (
          <WordBox key={index}>
            <h3>{word}</h3>
            <p>{meaning}</p>
          </WordBox>
        ))}
      </Marquee>
    </Container>
  );
}
