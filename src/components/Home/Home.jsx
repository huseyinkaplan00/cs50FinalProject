// import Marquee from 'react-marquee-slider';
// import styled, { StyleSheetManager, createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';
// import { MdArrowBack, MdArrowForward } from 'react-ionicons';

//css

//styled components: Global styles
// const GlobalStyles = createGlobalStyle`
// *
// {
//   margin: 0;
// padding: 0;
// box-sizing: border-box;
// }

// body{
//   height: 100vh;
//   display:grid;
//   place-items: center;
//   overflow:hidden;
// }

// `;

// //styled components: Div styles
// const Container = styled.main`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
// `;
// const SliderContainer = styled.ul``;

// const Item = styled.li`
//   width: 200px;
//   height: 300px;
//   list-style-type: none;
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   z-index: 1;
//   background-position: center;
//   background-size: cover;
//   border-radius: 20px;
//   box-shadow: 0 20px 30px rgba(255, 255, 255, 0.3) inset;
//   transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;

//   &:nth-child(1),
//   &:nth-child(2) {
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     transform: none;
//     border-radius: 0;
//     box-shadow: none;
//     opacity: 1;
//   }

//   &:nth-child(3) {
//     left: 50%;
//   }
//   &:nth-child(4) {
//     left: calc(50% + 220px);
//   }
//   &:nth-child(5) {
//     left: calc(50% + 440px);
//   }
//   &:nth-child(6) {
//     left: calc(50% + 660px);
//     opacity: 0;
//   }

//   &:nth-of-type(2) {
//     display: block;
//     animation: show 0.75s ease-in-out 0.3s forwards;
//   }
// `;

// const Content = styled.content`
//   width: min(30vw, 400px);
//   position: absolute;
//   top: 50%;
//   left: 3rem;
//   transform: translateY(-50%);
//   font: 400 0.85rem helvetica, sans-serif;
//   color: white;
//   text-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
//   opacity: 0;
//   display: none;

//   & .title {
//     font-family: 'arial-black';
//     text-transform: uppercase;
//   }

//   & .description {
//     line-height: 1.7;
//     margin: 1rem 0 1.5rem;
//     font-size: 0.8rem;
//   }

//   & button {
//     width: fit-content;
//     background-color: rgba(0, 0, 0, 0.1);
//     color: white;
//     border: 2px solid white;
//     border-radius: 0.25rem;
//     padding: 0.75rem;
//     cursor: pointer;
//   }
// `;

// const WordBox = styled.div`
//   border-radius: 5px;
//   display: grid;
//   place-items: center;
//   width: 330px;
//   margin: 0 10px;
//   height: 370px;
//   background-color: #fff;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//   background-image: url(${props => props.backgroundImage});
//   color: black;
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   h3 {
//     font-size: 2em;
//   }
// `;

export default function Home({ wordMeanings, setWordMeanings, setWords }) {
  const activate = e => {
    const slider = document.querySelector('.slider');
    const items = slider.querySelectorAll('.item');

    if (e.target.matches('.next')) {
      slider.append(items[0]);
    } else if (e.target.matches('.prev')) {
      slider.prepend(items[items.length - 1]);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', activate);

    // Component kaldırıldığında event listener'ı temizle
    return () => {
      document.removeEventListener('click', activate);
    };
  }, []);

  const filteredWordMeanings = wordMeanings.filter(
    wordMeaning => wordMeaning.meaning !== 'Definition not available' && wordMeaning.image !== null
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

  return (
    <>
      {filteredWordMeanings.length > 0 && (
        <main>
          <ul className="slider">
            {filteredWordMeanings.map(({ word, meaning, image }, index) => (
              <li key={index} className="item" style={{ backgroundImage: `url(${image})` }}>
                <div className="content">
                  <h2 className="title">{word}</h2>
                  <p className="description">{meaning}</p>
                  <button onClick={() => setWords(word)}>Read More</button>
                </div>
              </li>
            ))}
          </ul>
          <nav className="nav">
            <div className="btn prev" />
            <div className="btn next" />
          </nav>
        </main>
      )}
    </>
  );
}

// // declaring prop types for type checking.
Home.propTypes = {
  wordMeanings: PropTypes.array.isRequired,
  setWordMeanings: PropTypes.func.isRequired,
  setWords: PropTypes.func.isRequired
};
